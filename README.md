### WARNING
This module is deprecated. module provider, seraphinush-gaming will not be responsible or liable in any way for use of this module. no liability or responsibility is accepted by the module provider. user discretion is advised.

---

# opcode-scanner
Heuristic opcode scanner module for Tera Proxy.

Outputs a protocol.version.map file in the directory it's located in.

Original work by pinkipi (tera-mods)

# Usage
- Requires modular heuristic files in `patterns` folder
- Generates protocol.version.map file in `maps` folder

# Pattern
`patterns` folder contains modular heuristic js files used to scan incoming and outgoing packets.

Packets are of the following key-values :
- `code` : opcode specified to packet
- `data` : raw data
- `fromServer` : boolean, `true` for incoming server packets
- `version` : client protocol version
- `map` : object array of currently mapped opcodes
- `mapped` : object array of currently mapped patterns
- `history` : indexed array of all previous Packets prior to current Packet
- `index` : index of current packet
- `order` : index of current packet relative to either client packets or server packets, depending on `fromServer`
- `triedParse` : boolean, whether packet has been parsed
- `parsed` : parsed data based on packet definition
- `parsedLength` : parsed length
- `time` : time of packet

## Example
C_CHAT :
```js
module.exports = packet => {
  // packet order check
  if (!packet.mapped['S_CHAT'] ||
    packet.parsed.channel >>> 0 >= 300) {
    return false;
  }

  // retrospectively check on subsequent packets
  for (let i = packet.index + 1; i < packet.history.length; i++) {
    let next = packet.history[i];

    if (next.name() === 'S_CHAT' &&
      next.time - packet.time < 500 &&
      packet.parsed.channel === next.parsed.channel &&
      packet.parsed.message === next.parsed.message) {
      return true;
    }
  }

  return false;
}
```
S_CHAT :
```js
module.exports = packet => { // 3
  // packet order check
  let prev = packet.prev('S_LOGIN');

  // returns whether packet is a heuristic match
  return prev &&
    packet.parsed.channel >>> 0 < 300 &&
    packet.parsed.gameId === prev.parsed.gameId &&
    packet.parsed.name == prev.parsed.name &&
    packet.parsed.message.startsWith('<FONT');
}
```

# Minimum opcode list for Shinrameter
<details>

  - C_CHECK_VERSION
  - C_PLAYER_LOCATION
  - S_ABNORMALITY_BEGIN
  - S_ABNORMALITY_END
  - S_ABNORMALITY_REFRESH
  - S_ACTION_END
  - S_ACTION_STAGE
  - S_AVAILABLE_EVENT_MATCHING_LIST
  - S_BAN_PARTY
  - S_BAN_PARTY_MEMBER
  - S_BATTLE_FIELD_ENTRANCE_INFO
  - S_BOSS_GAGE_INFO
  - S_CHANGE_DESTPOS_PROJECTILE
  - S_CHAT
  - S_CHECK_TO_READY_PARTY
  - S_CREATURE_CHANGE_HP
  - S_CREATURE_LIFE
  - S_CREATURE_ROTATE
  - S_CREST_INFO
  - S_CREST_MESSAGE
  - S_DESPAWN_NPC
  - S_DESPAWN_USER
  - S_EACH_SKILL_RESULT
  - S_FIN_INTER_PARTY_MATCH
  - S_GET_USER_GUILD_LOGO
  - S_GET_USER_LIST
  - S_INSTANT_DASH
  - S_INSTANT_MOVE
  - S_LEAVE_PARTY
  - S_LEAVE_PARTY_MEMBER
  - S_LOAD_TOPO
  - S_LOGIN
  - S_MOUNT_VEHICLE_EX
  - S_NPC_LOCATION
  - S_NPC_OCCUPIER_INFO
  - S_NPC_STATUS
  - S_OTHER_USER_APPLY_PARTY
  - S_PARTY_MEMBER_CHANGE_HP
  - S_PARTY_MEMBER_LIST
  - S_PARTY_MEMBER_STAT_UPDATE
  - S_PLAYER_CHANGE_MP
  - S_PLAYER_STAT_UPDATE
  - S_PRIVATE_CHAT
  - S_REQUEST_CONTRACT
  - S_RETURN_TO_LOBBY
  - S_SPAWN_ME
  - S_SPAWN_NPC
  - S_SPAWN_PROJECTILE
  - S_SPAWN_USER
  - S_START_COOLTIME_SKILL
  - S_START_USER_PROJECTILE
  - S_SYSTEM_MESSAGE
  - S_TRADE_BROKER_DEAL_SUGGESTED
  - S_UPDATE_NPCGUILD
  - S_USER_LOCATION
  - S_USER_STATUS
  - S_WEAK_POINT
  - S_WHISPER
  
</details>