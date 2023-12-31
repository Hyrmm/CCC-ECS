export interface S2C_Login {
  uuid: string;
}

export function encodeS2C_Login(message: S2C_Login): Uint8Array {
  let bb = popByteBuffer();
  _encodeS2C_Login(message, bb);
  return toUint8Array(bb);
}

function _encodeS2C_Login(message: S2C_Login, bb: ByteBuffer): void {
  // required string uuid = 1;
  let $uuid = message.uuid;
  if ($uuid !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $uuid);
  }
}

export function decodeS2C_Login(binary: Uint8Array): S2C_Login {
  return _decodeS2C_Login(wrapByteBuffer(binary));
}

function _decodeS2C_Login(bb: ByteBuffer): S2C_Login {
  let message: S2C_Login = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required string uuid = 1;
      case 1: {
        message.uuid = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uuid === undefined)
    throw new Error("Missing required field: uuid");

  return message;
}

export interface C2S_Login {
}

export function encodeC2S_Login(message: C2S_Login): Uint8Array {
  let bb = popByteBuffer();
  _encodeC2S_Login(message, bb);
  return toUint8Array(bb);
}

function _encodeC2S_Login(message: C2S_Login, bb: ByteBuffer): void {
}

export function decodeC2S_Login(binary: Uint8Array): C2S_Login {
  return _decodeC2S_Login(wrapByteBuffer(binary));
}

function _decodeC2S_Login(bb: ByteBuffer): C2S_Login {
  let message: C2S_Login = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface S2C_Frames {
  frames?: number;
  timePast?: number;
  playerMove?: PlayerMove[];
  playerJoin?: PlayerJoin[];
  playerLeave?: PlayerLeave[];
}

export function encodeS2C_Frames(message: S2C_Frames): Uint8Array {
  let bb = popByteBuffer();
  _encodeS2C_Frames(message, bb);
  return toUint8Array(bb);
}

function _encodeS2C_Frames(message: S2C_Frames, bb: ByteBuffer): void {
  // optional int32 frames = 1;
  let $frames = message.frames;
  if ($frames !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($frames));
  }

  // optional int32 timePast = 2;
  let $timePast = message.timePast;
  if ($timePast !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($timePast));
  }

  // repeated PlayerMove playerMove = 3;
  let array$playerMove = message.playerMove;
  if (array$playerMove !== undefined) {
    for (let value of array$playerMove) {
      writeVarint32(bb, 26);
      let nested = popByteBuffer();
      _encodePlayerMove(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated PlayerJoin playerJoin = 4;
  let array$playerJoin = message.playerJoin;
  if (array$playerJoin !== undefined) {
    for (let value of array$playerJoin) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodePlayerJoin(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated PlayerLeave playerLeave = 5;
  let array$playerLeave = message.playerLeave;
  if (array$playerLeave !== undefined) {
    for (let value of array$playerLeave) {
      writeVarint32(bb, 42);
      let nested = popByteBuffer();
      _encodePlayerLeave(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeS2C_Frames(binary: Uint8Array): S2C_Frames {
  return _decodeS2C_Frames(wrapByteBuffer(binary));
}

function _decodeS2C_Frames(bb: ByteBuffer): S2C_Frames {
  let message: S2C_Frames = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 frames = 1;
      case 1: {
        message.frames = readVarint32(bb);
        break;
      }

      // optional int32 timePast = 2;
      case 2: {
        message.timePast = readVarint32(bb);
        break;
      }

      // repeated PlayerMove playerMove = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        let values = message.playerMove || (message.playerMove = []);
        values.push(_decodePlayerMove(bb));
        bb.limit = limit;
        break;
      }

      // repeated PlayerJoin playerJoin = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.playerJoin || (message.playerJoin = []);
        values.push(_decodePlayerJoin(bb));
        bb.limit = limit;
        break;
      }

      // repeated PlayerLeave playerLeave = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        let values = message.playerLeave || (message.playerLeave = []);
        values.push(_decodePlayerLeave(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface C2S_Frames {
  playerMove?: PlayerMove;
}

export function encodeC2S_Frames(message: C2S_Frames): Uint8Array {
  let bb = popByteBuffer();
  _encodeC2S_Frames(message, bb);
  return toUint8Array(bb);
}

function _encodeC2S_Frames(message: C2S_Frames, bb: ByteBuffer): void {
  // optional PlayerMove playerMove = 1;
  let $playerMove = message.playerMove;
  if ($playerMove !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodePlayerMove($playerMove, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeC2S_Frames(binary: Uint8Array): C2S_Frames {
  return _decodeC2S_Frames(wrapByteBuffer(binary));
}

function _decodeC2S_Frames(bb: ByteBuffer): C2S_Frames {
  let message: C2S_Frames = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional PlayerMove playerMove = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.playerMove = _decodePlayerMove(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface C2S_PlayerJoin {
}

export function encodeC2S_PlayerJoin(message: C2S_PlayerJoin): Uint8Array {
  let bb = popByteBuffer();
  _encodeC2S_PlayerJoin(message, bb);
  return toUint8Array(bb);
}

function _encodeC2S_PlayerJoin(message: C2S_PlayerJoin, bb: ByteBuffer): void {
}

export function decodeC2S_PlayerJoin(binary: Uint8Array): C2S_PlayerJoin {
  return _decodeC2S_PlayerJoin(wrapByteBuffer(binary));
}

function _decodeC2S_PlayerJoin(bb: ByteBuffer): C2S_PlayerJoin {
  let message: C2S_PlayerJoin = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface C2S_PlayerLeave {
}

export function encodeC2S_PlayerLeave(message: C2S_PlayerLeave): Uint8Array {
  let bb = popByteBuffer();
  _encodeC2S_PlayerLeave(message, bb);
  return toUint8Array(bb);
}

function _encodeC2S_PlayerLeave(message: C2S_PlayerLeave, bb: ByteBuffer): void {
}

export function decodeC2S_PlayerLeave(binary: Uint8Array): C2S_PlayerLeave {
  return _decodeC2S_PlayerLeave(wrapByteBuffer(binary));
}

function _decodeC2S_PlayerLeave(bb: ByteBuffer): C2S_PlayerLeave {
  let message: C2S_PlayerLeave = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface S2C_HeartBeat {
  serverTime?: number;
}

export function encodeS2C_HeartBeat(message: S2C_HeartBeat): Uint8Array {
  let bb = popByteBuffer();
  _encodeS2C_HeartBeat(message, bb);
  return toUint8Array(bb);
}

function _encodeS2C_HeartBeat(message: S2C_HeartBeat, bb: ByteBuffer): void {
  // optional int32 serverTime = 1;
  let $serverTime = message.serverTime;
  if ($serverTime !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($serverTime));
  }
}

export function decodeS2C_HeartBeat(binary: Uint8Array): S2C_HeartBeat {
  return _decodeS2C_HeartBeat(wrapByteBuffer(binary));
}

function _decodeS2C_HeartBeat(bb: ByteBuffer): S2C_HeartBeat {
  let message: S2C_HeartBeat = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 serverTime = 1;
      case 1: {
        message.serverTime = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface C2S_HeartBeat {
  serverTime?: number;
}

export function encodeC2S_HeartBeat(message: C2S_HeartBeat): Uint8Array {
  let bb = popByteBuffer();
  _encodeC2S_HeartBeat(message, bb);
  return toUint8Array(bb);
}

function _encodeC2S_HeartBeat(message: C2S_HeartBeat, bb: ByteBuffer): void {
  // optional int32 serverTime = 1;
  let $serverTime = message.serverTime;
  if ($serverTime !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($serverTime));
  }
}

export function decodeC2S_HeartBeat(binary: Uint8Array): C2S_HeartBeat {
  return _decodeC2S_HeartBeat(wrapByteBuffer(binary));
}

function _decodeC2S_HeartBeat(bb: ByteBuffer): C2S_HeartBeat {
  let message: C2S_HeartBeat = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 serverTime = 1;
      case 1: {
        message.serverTime = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface S2C_SyncRoomStatus {
  isSyncFinish: number;
  frames?: S2C_Frames[];
}

export function encodeS2C_SyncRoomStatus(message: S2C_SyncRoomStatus): Uint8Array {
  let bb = popByteBuffer();
  _encodeS2C_SyncRoomStatus(message, bb);
  return toUint8Array(bb);
}

function _encodeS2C_SyncRoomStatus(message: S2C_SyncRoomStatus, bb: ByteBuffer): void {
  // required int32 isSyncFinish = 1;
  let $isSyncFinish = message.isSyncFinish;
  if ($isSyncFinish !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($isSyncFinish));
  }

  // repeated S2C_Frames frames = 2;
  let array$frames = message.frames;
  if (array$frames !== undefined) {
    for (let value of array$frames) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeS2C_Frames(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeS2C_SyncRoomStatus(binary: Uint8Array): S2C_SyncRoomStatus {
  return _decodeS2C_SyncRoomStatus(wrapByteBuffer(binary));
}

function _decodeS2C_SyncRoomStatus(bb: ByteBuffer): S2C_SyncRoomStatus {
  let message: S2C_SyncRoomStatus = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 isSyncFinish = 1;
      case 1: {
        message.isSyncFinish = readVarint32(bb);
        break;
      }

      // repeated S2C_Frames frames = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.frames || (message.frames = []);
        values.push(_decodeS2C_Frames(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.isSyncFinish === undefined)
    throw new Error("Missing required field: isSyncFinish");

  return message;
}

export interface TowInt {
  v1: number;
  v2: number;
}

export function encodeTowInt(message: TowInt): Uint8Array {
  let bb = popByteBuffer();
  _encodeTowInt(message, bb);
  return toUint8Array(bb);
}

function _encodeTowInt(message: TowInt, bb: ByteBuffer): void {
  // required int32 v1 = 1;
  let $v1 = message.v1;
  if ($v1 !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($v1));
  }

  // required int32 v2 = 2;
  let $v2 = message.v2;
  if ($v2 !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($v2));
  }
}

export function decodeTowInt(binary: Uint8Array): TowInt {
  return _decodeTowInt(wrapByteBuffer(binary));
}

function _decodeTowInt(bb: ByteBuffer): TowInt {
  let message: TowInt = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 v1 = 1;
      case 1: {
        message.v1 = readVarint32(bb);
        break;
      }

      // required int32 v2 = 2;
      case 2: {
        message.v2 = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.v1 === undefined)
    throw new Error("Missing required field: v1");

  if (message.v2 === undefined)
    throw new Error("Missing required field: v2");

  return message;
}

export interface PlayerMove {
  dt: number;
  playerId: string;
  velocityX?: number;
  velocityY?: number;
}

export function encodePlayerMove(message: PlayerMove): Uint8Array {
  let bb = popByteBuffer();
  _encodePlayerMove(message, bb);
  return toUint8Array(bb);
}

function _encodePlayerMove(message: PlayerMove, bb: ByteBuffer): void {
  // required int32 dt = 1;
  let $dt = message.dt;
  if ($dt !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($dt));
  }

  // required string playerId = 2;
  let $playerId = message.playerId;
  if ($playerId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $playerId);
  }

  // optional int32 velocityX = 3;
  let $velocityX = message.velocityX;
  if ($velocityX !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($velocityX));
  }

  // optional int32 velocityY = 4;
  let $velocityY = message.velocityY;
  if ($velocityY !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($velocityY));
  }
}

export function decodePlayerMove(binary: Uint8Array): PlayerMove {
  return _decodePlayerMove(wrapByteBuffer(binary));
}

function _decodePlayerMove(bb: ByteBuffer): PlayerMove {
  let message: PlayerMove = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 dt = 1;
      case 1: {
        message.dt = readVarint32(bb);
        break;
      }

      // required string playerId = 2;
      case 2: {
        message.playerId = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 velocityX = 3;
      case 3: {
        message.velocityX = readVarint32(bb);
        break;
      }

      // optional int32 velocityY = 4;
      case 4: {
        message.velocityY = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.dt === undefined)
    throw new Error("Missing required field: dt");

  if (message.playerId === undefined)
    throw new Error("Missing required field: playerId");

  return message;
}

export interface PlayerJoin {
  player: Player;
}

export function encodePlayerJoin(message: PlayerJoin): Uint8Array {
  let bb = popByteBuffer();
  _encodePlayerJoin(message, bb);
  return toUint8Array(bb);
}

function _encodePlayerJoin(message: PlayerJoin, bb: ByteBuffer): void {
  // required Player player = 1;
  let $player = message.player;
  if ($player !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodePlayer($player, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodePlayerJoin(binary: Uint8Array): PlayerJoin {
  return _decodePlayerJoin(wrapByteBuffer(binary));
}

function _decodePlayerJoin(bb: ByteBuffer): PlayerJoin {
  let message: PlayerJoin = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required Player player = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.player = _decodePlayer(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.player === undefined)
    throw new Error("Missing required field: player");

  return message;
}

export interface PlayerLeave {
  player: Player;
}

export function encodePlayerLeave(message: PlayerLeave): Uint8Array {
  let bb = popByteBuffer();
  _encodePlayerLeave(message, bb);
  return toUint8Array(bb);
}

function _encodePlayerLeave(message: PlayerLeave, bb: ByteBuffer): void {
  // required Player player = 1;
  let $player = message.player;
  if ($player !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodePlayer($player, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodePlayerLeave(binary: Uint8Array): PlayerLeave {
  return _decodePlayerLeave(wrapByteBuffer(binary));
}

function _decodePlayerLeave(bb: ByteBuffer): PlayerLeave {
  let message: PlayerLeave = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required Player player = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.player = _decodePlayer(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.player === undefined)
    throw new Error("Missing required field: player");

  return message;
}

export interface Player {
  uuid: string;
  role: string;
  position: TowInt;
  velocity: TowInt;
}

export function encodePlayer(message: Player): Uint8Array {
  let bb = popByteBuffer();
  _encodePlayer(message, bb);
  return toUint8Array(bb);
}

function _encodePlayer(message: Player, bb: ByteBuffer): void {
  // required string uuid = 1;
  let $uuid = message.uuid;
  if ($uuid !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $uuid);
  }

  // required string role = 2;
  let $role = message.role;
  if ($role !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $role);
  }

  // required TowInt position = 3;
  let $position = message.position;
  if ($position !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeTowInt($position, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // required TowInt velocity = 4;
  let $velocity = message.velocity;
  if ($velocity !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeTowInt($velocity, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodePlayer(binary: Uint8Array): Player {
  return _decodePlayer(wrapByteBuffer(binary));
}

function _decodePlayer(bb: ByteBuffer): Player {
  let message: Player = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required string uuid = 1;
      case 1: {
        message.uuid = readString(bb, readVarint32(bb));
        break;
      }

      // required string role = 2;
      case 2: {
        message.role = readString(bb, readVarint32(bb));
        break;
      }

      // required TowInt position = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.position = _decodeTowInt(bb);
        bb.limit = limit;
        break;
      }

      // required TowInt velocity = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.velocity = _decodeTowInt(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uuid === undefined)
    throw new Error("Missing required field: uuid");

  if (message.role === undefined)
    throw new Error("Missing required field: role");

  if (message.position === undefined)
    throw new Error("Missing required field: position");

  if (message.velocity === undefined)
    throw new Error("Missing required field: velocity");

  return message;
}

export interface CommonData {
  protoId?: number;
  body?: Uint8Array;
}

export function encodeCommonData(message: CommonData): Uint8Array {
  let bb = popByteBuffer();
  _encodeCommonData(message, bb);
  return toUint8Array(bb);
}

function _encodeCommonData(message: CommonData, bb: ByteBuffer): void {
  // optional int32 protoId = 1;
  let $protoId = message.protoId;
  if ($protoId !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($protoId));
  }

  // optional bytes body = 2;
  let $body = message.body;
  if ($body !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $body.length), writeBytes(bb, $body);
  }
}

export function decodeCommonData(binary: Uint8Array): CommonData {
  return _decodeCommonData(wrapByteBuffer(binary));
}

function _decodeCommonData(bb: ByteBuffer): CommonData {
  let message: CommonData = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 protoId = 1;
      case 1: {
        message.protoId = readVarint32(bb);
        break;
      }

      // optional bytes body = 2;
      case 2: {
        message.body = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Long {
  low: number;
  high: number;
  unsigned: boolean;
}

interface ByteBuffer {
  bytes: Uint8Array;
  offset: number;
  limit: number;
}

function pushTemporaryLength(bb: ByteBuffer): number {
  let length = readVarint32(bb);
  let limit = bb.limit;
  bb.limit = bb.offset + length;
  return limit;
}

function skipUnknownField(bb: ByteBuffer, type: number): void {
  switch (type) {
    case 0: while (readByte(bb) & 0x80) { } break;
    case 2: skip(bb, readVarint32(bb)); break;
    case 5: skip(bb, 4); break;
    case 1: skip(bb, 8); break;
    default: throw new Error("Unimplemented type: " + type);
  }
}

function stringToLong(value: string): Long {
  return {
    low: value.charCodeAt(0) | (value.charCodeAt(1) << 16),
    high: value.charCodeAt(2) | (value.charCodeAt(3) << 16),
    unsigned: false,
  };
}

function longToString(value: Long): string {
  let low = value.low;
  let high = value.high;
  return String.fromCharCode(
    low & 0xFFFF,
    low >>> 16,
    high & 0xFFFF,
    high >>> 16);
}

// The code below was modified from https://github.com/protobufjs/bytebuffer.js
// which is under the Apache License 2.0.

let f32 = new Float32Array(1);
let f32_u8 = new Uint8Array(f32.buffer);

let f64 = new Float64Array(1);
let f64_u8 = new Uint8Array(f64.buffer);

function intToLong(value: number): Long {
  value |= 0;
  return {
    low: value,
    high: value >> 31,
    unsigned: value >= 0,
  };
}

let bbStack: ByteBuffer[] = [];

function popByteBuffer(): ByteBuffer {
  const bb = bbStack.pop();
  if (!bb) return { bytes: new Uint8Array(64), offset: 0, limit: 0 };
  bb.offset = bb.limit = 0;
  return bb;
}

function pushByteBuffer(bb: ByteBuffer): void {
  bbStack.push(bb);
}

function wrapByteBuffer(bytes: Uint8Array): ByteBuffer {
  return { bytes, offset: 0, limit: bytes.length };
}

function toUint8Array(bb: ByteBuffer): Uint8Array {
  let bytes = bb.bytes;
  let limit = bb.limit;
  return bytes.length === limit ? bytes : bytes.subarray(0, limit);
}

function skip(bb: ByteBuffer, offset: number): void {
  if (bb.offset + offset > bb.limit) {
    throw new Error('Skip past limit');
  }
  bb.offset += offset;
}

function isAtEnd(bb: ByteBuffer): boolean {
  return bb.offset >= bb.limit;
}

function grow(bb: ByteBuffer, count: number): number {
  let bytes = bb.bytes;
  let offset = bb.offset;
  let limit = bb.limit;
  let finalOffset = offset + count;
  if (finalOffset > bytes.length) {
    let newBytes = new Uint8Array(finalOffset * 2);
    newBytes.set(bytes);
    bb.bytes = newBytes;
  }
  bb.offset = finalOffset;
  if (finalOffset > limit) {
    bb.limit = finalOffset;
  }
  return offset;
}

function advance(bb: ByteBuffer, count: number): number {
  let offset = bb.offset;
  if (offset + count > bb.limit) {
    throw new Error('Read past limit');
  }
  bb.offset += count;
  return offset;
}

function readBytes(bb: ByteBuffer, count: number): Uint8Array {
  let offset = advance(bb, count);
  return bb.bytes.subarray(offset, offset + count);
}

function writeBytes(bb: ByteBuffer, buffer: Uint8Array): void {
  let offset = grow(bb, buffer.length);
  bb.bytes.set(buffer, offset);
}

function readString(bb: ByteBuffer, count: number): string {
  // Sadly a hand-coded UTF8 decoder is much faster than subarray+TextDecoder in V8
  let offset = advance(bb, count);
  let fromCharCode = String.fromCharCode;
  let bytes = bb.bytes;
  let invalid = '\uFFFD';
  let text = '';

  for (let i = 0; i < count; i++) {
    let c1 = bytes[i + offset], c2: number, c3: number, c4: number, c: number;

    // 1 byte
    if ((c1 & 0x80) === 0) {
      text += fromCharCode(c1);
    }

    // 2 bytes
    else if ((c1 & 0xE0) === 0xC0) {
      if (i + 1 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        if ((c2 & 0xC0) !== 0x80) text += invalid;
        else {
          c = ((c1 & 0x1F) << 6) | (c2 & 0x3F);
          if (c < 0x80) text += invalid;
          else {
            text += fromCharCode(c);
            i++;
          }
        }
      }
    }

    // 3 bytes
    else if ((c1 & 0xF0) == 0xE0) {
      if (i + 2 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        if (((c2 | (c3 << 8)) & 0xC0C0) !== 0x8080) text += invalid;
        else {
          c = ((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
          if (c < 0x0800 || (c >= 0xD800 && c <= 0xDFFF)) text += invalid;
          else {
            text += fromCharCode(c);
            i += 2;
          }
        }
      }
    }

    // 4 bytes
    else if ((c1 & 0xF8) == 0xF0) {
      if (i + 3 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        c4 = bytes[i + offset + 3];
        if (((c2 | (c3 << 8) | (c4 << 16)) & 0xC0C0C0) !== 0x808080) text += invalid;
        else {
          c = ((c1 & 0x07) << 0x12) | ((c2 & 0x3F) << 0x0C) | ((c3 & 0x3F) << 0x06) | (c4 & 0x3F);
          if (c < 0x10000 || c > 0x10FFFF) text += invalid;
          else {
            c -= 0x10000;
            text += fromCharCode((c >> 10) + 0xD800, (c & 0x3FF) + 0xDC00);
            i += 3;
          }
        }
      }
    }

    else text += invalid;
  }

  return text;
}

function writeString(bb: ByteBuffer, text: string): void {
  // Sadly a hand-coded UTF8 encoder is much faster than TextEncoder+set in V8
  let n = text.length;
  let byteCount = 0;

  // Write the byte count first
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    byteCount += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }
  writeVarint32(bb, byteCount);

  let offset = grow(bb, byteCount);
  let bytes = bb.bytes;

  // Then write the bytes
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    if (c < 0x80) {
      bytes[offset++] = c;
    } else {
      if (c < 0x800) {
        bytes[offset++] = ((c >> 6) & 0x1F) | 0xC0;
      } else {
        if (c < 0x10000) {
          bytes[offset++] = ((c >> 12) & 0x0F) | 0xE0;
        } else {
          bytes[offset++] = ((c >> 18) & 0x07) | 0xF0;
          bytes[offset++] = ((c >> 12) & 0x3F) | 0x80;
        }
        bytes[offset++] = ((c >> 6) & 0x3F) | 0x80;
      }
      bytes[offset++] = (c & 0x3F) | 0x80;
    }
  }
}

function writeByteBuffer(bb: ByteBuffer, buffer: ByteBuffer): void {
  let offset = grow(bb, buffer.limit);
  let from = bb.bytes;
  let to = buffer.bytes;

  // This for loop is much faster than subarray+set on V8
  for (let i = 0, n = buffer.limit; i < n; i++) {
    from[i + offset] = to[i];
  }
}

function readByte(bb: ByteBuffer): number {
  return bb.bytes[advance(bb, 1)];
}

function writeByte(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 1);
  bb.bytes[offset] = value;
}

function readFloat(bb: ByteBuffer): number {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f32_u8[0] = bytes[offset++];
  f32_u8[1] = bytes[offset++];
  f32_u8[2] = bytes[offset++];
  f32_u8[3] = bytes[offset++];
  return f32[0];
}

function writeFloat(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  f32[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f32_u8[0];
  bytes[offset++] = f32_u8[1];
  bytes[offset++] = f32_u8[2];
  bytes[offset++] = f32_u8[3];
}

function readDouble(bb: ByteBuffer): number {
  let offset = advance(bb, 8);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f64_u8[0] = bytes[offset++];
  f64_u8[1] = bytes[offset++];
  f64_u8[2] = bytes[offset++];
  f64_u8[3] = bytes[offset++];
  f64_u8[4] = bytes[offset++];
  f64_u8[5] = bytes[offset++];
  f64_u8[6] = bytes[offset++];
  f64_u8[7] = bytes[offset++];
  return f64[0];
}

function writeDouble(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 8);
  let bytes = bb.bytes;
  f64[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f64_u8[0];
  bytes[offset++] = f64_u8[1];
  bytes[offset++] = f64_u8[2];
  bytes[offset++] = f64_u8[3];
  bytes[offset++] = f64_u8[4];
  bytes[offset++] = f64_u8[5];
  bytes[offset++] = f64_u8[6];
  bytes[offset++] = f64_u8[7];
}

function readInt32(bb: ByteBuffer): number {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  );
}

function writeInt32(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  bytes[offset] = value;
  bytes[offset + 1] = value >> 8;
  bytes[offset + 2] = value >> 16;
  bytes[offset + 3] = value >> 24;
}

function readInt64(bb: ByteBuffer, unsigned: boolean): Long {
  return {
    low: readInt32(bb),
    high: readInt32(bb),
    unsigned,
  };
}

function writeInt64(bb: ByteBuffer, value: Long): void {
  writeInt32(bb, value.low);
  writeInt32(bb, value.high);
}

function readVarint32(bb: ByteBuffer): number {
  let c = 0;
  let value = 0;
  let b: number;
  do {
    b = readByte(bb);
    if (c < 32) value |= (b & 0x7F) << c;
    c += 7;
  } while (b & 0x80);
  return value;
}

function writeVarint32(bb: ByteBuffer, value: number): void {
  value >>>= 0;
  while (value >= 0x80) {
    writeByte(bb, (value & 0x7f) | 0x80);
    value >>>= 7;
  }
  writeByte(bb, value);
}

function readVarint64(bb: ByteBuffer, unsigned: boolean): Long {
  let part0 = 0;
  let part1 = 0;
  let part2 = 0;
  let b: number;

  b = readByte(bb); part0 = (b & 0x7F); if (b & 0x80) {
    b = readByte(bb); part0 |= (b & 0x7F) << 7; if (b & 0x80) {
      b = readByte(bb); part0 |= (b & 0x7F) << 14; if (b & 0x80) {
        b = readByte(bb); part0 |= (b & 0x7F) << 21; if (b & 0x80) {

          b = readByte(bb); part1 = (b & 0x7F); if (b & 0x80) {
            b = readByte(bb); part1 |= (b & 0x7F) << 7; if (b & 0x80) {
              b = readByte(bb); part1 |= (b & 0x7F) << 14; if (b & 0x80) {
                b = readByte(bb); part1 |= (b & 0x7F) << 21; if (b & 0x80) {

                  b = readByte(bb); part2 = (b & 0x7F); if (b & 0x80) {
                    b = readByte(bb); part2 |= (b & 0x7F) << 7;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    low: part0 | (part1 << 28),
    high: (part1 >>> 4) | (part2 << 24),
    unsigned,
  };
}

function writeVarint64(bb: ByteBuffer, value: Long): void {
  let part0 = value.low >>> 0;
  let part1 = ((value.low >>> 28) | (value.high << 4)) >>> 0;
  let part2 = value.high >>> 24;

  // ref: src/google/protobuf/io/coded_stream.cc
  let size =
    part2 === 0 ?
      part1 === 0 ?
        part0 < 1 << 14 ?
          part0 < 1 << 7 ? 1 : 2 :
          part0 < 1 << 21 ? 3 : 4 :
        part1 < 1 << 14 ?
          part1 < 1 << 7 ? 5 : 6 :
          part1 < 1 << 21 ? 7 : 8 :
      part2 < 1 << 7 ? 9 : 10;

  let offset = grow(bb, size);
  let bytes = bb.bytes;

  switch (size) {
    case 10: bytes[offset + 9] = (part2 >>> 7) & 0x01;
    case 9: bytes[offset + 8] = size !== 9 ? part2 | 0x80 : part2 & 0x7F;
    case 8: bytes[offset + 7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
    case 7: bytes[offset + 6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
    case 6: bytes[offset + 5] = size !== 6 ? (part1 >>> 7) | 0x80 : (part1 >>> 7) & 0x7F;
    case 5: bytes[offset + 4] = size !== 5 ? part1 | 0x80 : part1 & 0x7F;
    case 4: bytes[offset + 3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
    case 3: bytes[offset + 2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
    case 2: bytes[offset + 1] = size !== 2 ? (part0 >>> 7) | 0x80 : (part0 >>> 7) & 0x7F;
    case 1: bytes[offset] = size !== 1 ? part0 | 0x80 : part0 & 0x7F;
  }
}

function readVarint32ZigZag(bb: ByteBuffer): number {
  let value = readVarint32(bb);

  // ref: src/google/protobuf/wire_format_lite.h
  return (value >>> 1) ^ -(value & 1);
}

function writeVarint32ZigZag(bb: ByteBuffer, value: number): void {
  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint32(bb, (value << 1) ^ (value >> 31));
}

function readVarint64ZigZag(bb: ByteBuffer): Long {
  let value = readVarint64(bb, /* unsigned */ false);
  let low = value.low;
  let high = value.high;
  let flip = -(low & 1);

  // ref: src/google/protobuf/wire_format_lite.h
  return {
    low: ((low >>> 1) | (high << 31)) ^ flip,
    high: (high >>> 1) ^ flip,
    unsigned: false,
  };
}

function writeVarint64ZigZag(bb: ByteBuffer, value: Long): void {
  let low = value.low;
  let high = value.high;
  let flip = high >> 31;

  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint64(bb, {
    low: (low << 1) ^ flip,
    high: ((high << 1) | (low >>> 31)) ^ flip,
    unsigned: false,
  });
}
