// Original code by Pinkie Pie (pinkipi, teramods)
// Updated and reuploaded by seraphinush (seraphinush-gaming)

const fs = require('fs');
const path = require('path');
const Packet = require('./packet.js');

const PASSIVE_SCAN_INTERVAL = 5000;
const PASSIVE_SCAN_TIMEOUT = 100;
const PASSIVE_SCAN_HOLDOFF = 100;

class Scanner {

  constructor(mod) {

    this.mod = mod;

    // TODO
    if (this.mod.manager.isLoaded('command')) {

      this.cmd = mod.command;

      this.cmd.add('scan', {
        '$default': () => {
          console.log('test');
        }
      });
    }

    this.history = [];
    this.index = 0;
    this.loggedMatch = {};
    this.map = {};
    this.mapped = {};
    this.patterns = {};
    this.version = 0;

    this.packetOrder = 0;
    this.clientOrder = 0;
    this.serverOrder = 0;

    if (!this.version) {
      this.version = this.mod.protocolVersion;

      try {
        let lines = fs.readFileSync(path.join(__dirname, 'maps', 'protocol.' + this.version + '.map'), 'utf8').split('\n');

        for (let line of lines) {
          line = line.split(' = ');
          this.map[Number(line[1])] = line[0];
          this.mapped[line[0]] = true;
        }
      } catch (e) { // improper protocol file
        console.log(e.message);
      }

      let patterns = fs.readdirSync(path.join(__dirname, 'patterns')).filter(name => name.endsWith('js'));

      for (let pattern of patterns) {
        pattern = pattern.slice(0, pattern.indexOf('.')) || pattern;

        if (!this.mapped[pattern]) {
          this.patterns[pattern] = require('./patterns/' + pattern);
          console.log('Missing opcode : ' + pattern);
        }
      }

      console.log('Opcode scanner initialized, loaded ' + Object.keys(this.patterns).length + '/' + patterns.length + ' patterns.');
    }

    this.passiveScan();

    this.mod.hook('*', 'raw', { order: -99999999 }, (code, data, fromServer) => {

      let packet = new Packet({
        code,
        data: Buffer.from(data),
        fromServer,
        version: this.version,
        map: this.map,
        mapped: this.mapped,
        history: this.history,
        index: this.index++,
        packetOrder: this.packetOrder++,
        order: fromServer ? this.serverOrder++ : this.clientOrder++,
        triedParse: false,
        parsed: null,
        parsedLength: 0,
        parsedName: null,
        time: Date.now()
      });

      if (this.map[code]) {
        this.parse(packet);
      } else {
        this.scan(packet);
      }

      this.history.push(packet);
    });
  }

  // TODO
  parse(packet) {
    return new Promise((resolve, reject) => {
      packet.triedParse = true;

      try {
        let name = this.mod.dispatch.protocolMap.code.get(code) || packet.name();

        packet.parsed = this.mod.dispatch.fromRaw(name, '*', packet.data);
        packet.parsedLength = this.mod.dispatch.toRaw(name, '*', packet.data);
      } catch {
        //
      }

      if (packet.parsed && (packet.parsedLength === packet.data.length)) {
        resolve();
      }

      packet.parsed = null;
      packet.parsedLength = 0;
      resolve();
    });
  }

  async scan(packet) {
    let prefix = packet.fromServer ? 'S_' : 'C_';

    for (let pattern in this.patterns) {
      if (pattern.startsWith(prefix)) {
        packet.parseName = pattern;

        try {
          packet.setHistory(this.history);
          await this.parse(packet);

          if (this.patterns[pattern](packet)) {
            if (packet.parsedLength === packet.data.length) {
              console.log('Opcode found: ' + pattern + ' = ' + packet.code);
              this.map[packet.code] = pattern;
              this.mapped[pattern] = true;

              // TODO
              for (let item in this.history) {
                if (item.code === packet.code && item.index !== packet.index) {
                  this.parse(item);
                }
              }

              this.writeMap();
              delete this.patterns[pattern];
              delete this.loggedMatch[pattern];
              break;
            } else if (!(this.loggedMatch[pattern] || (this.loggedMatch[pattern] = []))[packet.code]) {
              this.loggedMatch[pattern][packet.code] = true;
              console.log('Possible match: ' + pattern + ' = ' + packet.code + ' # length ' + packet.parsedLength + ' (expected ' + packet.data.length + ')');
            }
          } else {
            delete packet.parsed;

            delete packet.parseName;
            delete packet.triedParse;
          }
        } catch (e) {
          console.log('Misinformed heuristic for : ' + pattern);
          console.log(e);
          delete this.patterns[pattern];
          delete this.loggedMatch[pattern];
        }
      }
    }
  }

  writeMap() {
    let mapDir = path.join(__dirname, 'maps'),
      res = [];

    for (let code in this.map) {
      res.push(this.map[code] + ' = ' + code);
      res.sort();
    }

    if (!fs.existsSync(mapDir)) {
      fs.mkdirSync(mapDir);
    }

    fs.writeFileSync(path.join(mapDir, 'protocol.' + this.version + '.map'), res.join('\n'));
  }

  // async
  async passiveScan() {
    let connected = true;

    while (connected) {
      await this.sleep(PASSIVE_SCAN_INTERVAL);

      // Set connected state before scanning so that the final pass will definitely happen after disconnect
      connected = this.mod.connection.state !== 3;

      let sleepTime = Date.now();

      for (let i = this.history.length - 30; i >= 0 && i < this.history.length; i++) {
        let packet = this.history[i];

        if (!packet.parsed) {
          if (Date.now() - sleepTime > PASSIVE_SCAN_TIMEOUT && connected) {
            await this.sleep(PASSIVE_SCAN_HOLDOFF);
            sleepTime = Date.now();
          }

          this.scan(packet);
        }
      }
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

module.exports = Scanner;