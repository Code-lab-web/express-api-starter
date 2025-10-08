<<<<<<< HEAD
'use strict';
=======
"use strict";
>>>>>>> refs/remotes/origin/master

const {
  ArrayBuffer,
  MathMax,
  NumberIsNaN,
  ObjectDefineProperties,
  ObjectDefineProperty,
  ObjectEntries,
  ObjectFreeze,
  ObjectKeys,
  ObjectSetPrototypeOf,
  ReflectApply,
  Symbol,
  Uint32Array,
} = primordials;

const {
  codes: {
    ERR_BROTLI_INVALID_PARAM,
    ERR_BUFFER_TOO_LARGE,
    ERR_INVALID_ARG_TYPE,
    ERR_OUT_OF_RANGE,
    ERR_TRAILING_JUNK_AFTER_STREAM_END,
    ERR_ZSTD_INVALID_PARAM,
  },
  genericNodeError,
<<<<<<< HEAD
} = require('internal/errors');
const { Transform, finished } = require('stream');
const {
  deprecateInstantiation,
} = require('internal/util');
=======
} = require("internal/errors");
const { Transform, finished } = require("stream");
const { deprecateInstantiation } = require("internal/util");
>>>>>>> refs/remotes/origin/master
const {
  isArrayBufferView,
  isAnyArrayBuffer,
  isUint8Array,
<<<<<<< HEAD
} = require('internal/util/types');
const binding = internalBinding('zlib');
const { crc32: crc32Native } = binding;
const assert = require('internal/assert');
const {
  Buffer,
  kMaxLength,
} = require('buffer');
const { owner_symbol } = require('internal/async_hooks').symbols;
=======
} = require("internal/util/types");
const binding = internalBinding("zlib");
const { crc32: crc32Native } = binding;
const assert = require("internal/assert");
const { Buffer, kMaxLength } = require("buffer");
const { owner_symbol } = require("internal/async_hooks").symbols;
>>>>>>> refs/remotes/origin/master
const {
  checkRangesOrGetDefault,
  validateFunction,
  validateUint32,
  validateFiniteNumber,
<<<<<<< HEAD
} = require('internal/validators');

const kFlushFlag = Symbol('kFlushFlag');
const kError = Symbol('kError');

const constants = internalBinding('constants').zlib;
const {
  // Zlib flush levels
  Z_NO_FLUSH, Z_BLOCK, Z_PARTIAL_FLUSH, Z_SYNC_FLUSH, Z_FULL_FLUSH, Z_FINISH,
  // Zlib option values
  Z_MIN_CHUNK, Z_MIN_WINDOWBITS, Z_MAX_WINDOWBITS, Z_MIN_LEVEL, Z_MAX_LEVEL,
  Z_MIN_MEMLEVEL, Z_MAX_MEMLEVEL, Z_DEFAULT_CHUNK, Z_DEFAULT_COMPRESSION,
  Z_DEFAULT_STRATEGY, Z_DEFAULT_WINDOWBITS, Z_DEFAULT_MEMLEVEL, Z_FIXED,
  // Node's compression stream modes (node_zlib_mode)
  DEFLATE, DEFLATERAW, INFLATE, INFLATERAW, GZIP, GUNZIP, UNZIP,
  BROTLI_DECODE, BROTLI_ENCODE,
  ZSTD_COMPRESS, ZSTD_DECOMPRESS,
  // Brotli operations (~flush levels)
  BROTLI_OPERATION_PROCESS, BROTLI_OPERATION_FLUSH,
  BROTLI_OPERATION_FINISH, BROTLI_OPERATION_EMIT_METADATA,
  // Zstd end directives (~flush levels)
  ZSTD_e_continue, ZSTD_e_flush, ZSTD_e_end,
=======
} = require("internal/validators");

const kFlushFlag = Symbol("kFlushFlag");
const kError = Symbol("kError");

const constants = internalBinding("constants").zlib;
const {
  // Zlib flush levels
  Z_NO_FLUSH,
  Z_BLOCK,
  Z_PARTIAL_FLUSH,
  Z_SYNC_FLUSH,
  Z_FULL_FLUSH,
  Z_FINISH,
  // Zlib option values
  Z_MIN_CHUNK,
  Z_MIN_WINDOWBITS,
  Z_MAX_WINDOWBITS,
  Z_MIN_LEVEL,
  Z_MAX_LEVEL,
  Z_MIN_MEMLEVEL,
  Z_MAX_MEMLEVEL,
  Z_DEFAULT_CHUNK,
  Z_DEFAULT_COMPRESSION,
  Z_DEFAULT_STRATEGY,
  Z_DEFAULT_WINDOWBITS,
  Z_DEFAULT_MEMLEVEL,
  Z_FIXED,
  // Node's compression stream modes (node_zlib_mode)
  DEFLATE,
  DEFLATERAW,
  INFLATE,
  INFLATERAW,
  GZIP,
  GUNZIP,
  UNZIP,
  BROTLI_DECODE,
  BROTLI_ENCODE,
  ZSTD_COMPRESS,
  ZSTD_DECOMPRESS,
  // Brotli operations (~flush levels)
  BROTLI_OPERATION_PROCESS,
  BROTLI_OPERATION_FLUSH,
  BROTLI_OPERATION_FINISH,
  BROTLI_OPERATION_EMIT_METADATA,
  // Zstd end directives (~flush levels)
  ZSTD_e_continue,
  ZSTD_e_flush,
  ZSTD_e_end,
>>>>>>> refs/remotes/origin/master
} = constants;

// Translation table for return codes.
const codes = {
  Z_OK: constants.Z_OK,
  Z_STREAM_END: constants.Z_STREAM_END,
  Z_NEED_DICT: constants.Z_NEED_DICT,
  Z_ERRNO: constants.Z_ERRNO,
  Z_STREAM_ERROR: constants.Z_STREAM_ERROR,
  Z_DATA_ERROR: constants.Z_DATA_ERROR,
  Z_MEM_ERROR: constants.Z_MEM_ERROR,
  Z_BUF_ERROR: constants.Z_BUF_ERROR,
  Z_VERSION_ERROR: constants.Z_VERSION_ERROR,
};

for (const ckey of ObjectKeys(codes)) {
  codes[codes[ckey]] = ckey;
}

function zlibBuffer(engine, buffer, callback) {
<<<<<<< HEAD
  validateFunction(callback, 'callback');
=======
  validateFunction(callback, "callback");
>>>>>>> refs/remotes/origin/master
  // Streams do not support non-Uint8Array ArrayBufferViews yet. Convert it to a
  // Buffer without copying.
  if (isArrayBufferView(buffer) && !isUint8Array(buffer)) {
    buffer = Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  } else if (isAnyArrayBuffer(buffer)) {
    buffer = Buffer.from(buffer);
  }
  engine.buffers = null;
  engine.nread = 0;
  engine.cb = callback;
<<<<<<< HEAD
  engine.on('data', zlibBufferOnData);
  engine.on('error', zlibBufferOnError);
  engine.on('end', zlibBufferOnEnd);
=======
  engine.on("data", zlibBufferOnData);
  engine.on("error", zlibBufferOnError);
  engine.on("end", zlibBufferOnEnd);
>>>>>>> refs/remotes/origin/master
  engine.end(buffer);
}

function zlibBufferOnData(chunk) {
  if (!this.buffers) {
    this.buffers = [chunk];
  } else {
    this.buffers.push(chunk);
  }
  this.nread += chunk.length;
  if (this.nread > this._maxOutputLength) {
    this.close();
<<<<<<< HEAD
    this.removeAllListeners('end');
=======
    this.removeAllListeners("end");
>>>>>>> refs/remotes/origin/master
    this.cb(new ERR_BUFFER_TOO_LARGE(this._maxOutputLength));
  }
}

function zlibBufferOnError(err) {
<<<<<<< HEAD
  this.removeAllListeners('end');
=======
  this.removeAllListeners("end");
>>>>>>> refs/remotes/origin/master
  this.cb(err);
}

function zlibBufferOnEnd() {
  let buf;
  if (this.nread === 0) {
    buf = Buffer.alloc(0);
  } else {
    const bufs = this.buffers;
<<<<<<< HEAD
    buf = (bufs.length === 1 ? bufs[0] : Buffer.concat(bufs, this.nread));
  }
  this.close();
  if (this._info)
    this.cb(null, { buffer: buf, engine: this });
  else
    this.cb(null, buf);
}

function zlibBufferSync(engine, buffer) {
  if (typeof buffer === 'string') {
=======
    buf = bufs.length === 1 ? bufs[0] : Buffer.concat(bufs, this.nread);
  }
  this.close();
  if (this._info) this.cb(null, { buffer: buf, engine: this });
  else this.cb(null, buf);
}

function zlibBufferSync(engine, buffer) {
  if (typeof buffer === "string") {
>>>>>>> refs/remotes/origin/master
    buffer = Buffer.from(buffer);
  } else if (!isArrayBufferView(buffer)) {
    if (isAnyArrayBuffer(buffer)) {
      buffer = Buffer.from(buffer);
    } else {
      throw new ERR_INVALID_ARG_TYPE(
<<<<<<< HEAD
        'buffer',
        ['string', 'Buffer', 'TypedArray', 'DataView', 'ArrayBuffer'],
        buffer,
=======
        "buffer",
        ["string", "Buffer", "TypedArray", "DataView", "ArrayBuffer"],
        buffer
>>>>>>> refs/remotes/origin/master
      );
    }
  }
  buffer = processChunkSync(engine, buffer, engine._finishFlushFlag);
<<<<<<< HEAD
  if (engine._info)
    return { buffer, engine };
=======
  if (engine._info) return { buffer, engine };
>>>>>>> refs/remotes/origin/master
  return buffer;
}

function zlibOnError(message, errno, code) {
  const self = this[owner_symbol];
  // There is no way to cleanly recover.
  // Continuing only obscures problems.

  const error = genericNodeError(message, { errno, code });
  error.errno = errno;
  error.code = code;
  self.destroy(error);
  self[kError] = error;
}

const FLUSH_BOUND = [
<<<<<<< HEAD
  [ Z_NO_FLUSH, Z_BLOCK ],
  [ BROTLI_OPERATION_PROCESS, BROTLI_OPERATION_EMIT_METADATA ],
  [ ZSTD_e_continue, ZSTD_e_end ],
=======
  [Z_NO_FLUSH, Z_BLOCK],
  [BROTLI_OPERATION_PROCESS, BROTLI_OPERATION_EMIT_METADATA],
  [ZSTD_e_continue, ZSTD_e_end],
>>>>>>> refs/remotes/origin/master
];
const FLUSH_BOUND_IDX_NORMAL = 0;
const FLUSH_BOUND_IDX_BROTLI = 1;
const FLUSH_BOUND_IDX_ZSTD = 2;

/**
 * The base class for all Zlib-style streams.
 * @class
 */
function ZlibBase(opts, mode, handle, { flush, finishFlush, fullFlush }) {
  let chunkSize = Z_DEFAULT_CHUNK;
  let maxOutputLength = kMaxLength;
  // The ZlibBase class is not exported to user land, the mode should only be
  // passed in by us.
<<<<<<< HEAD
  assert(typeof mode === 'number');
=======
  assert(typeof mode === "number");
>>>>>>> refs/remotes/origin/master
  assert(mode >= DEFLATE && mode <= ZSTD_DECOMPRESS);

  let flushBoundIdx;
  if (mode === BROTLI_ENCODE || mode === BROTLI_DECODE) {
    flushBoundIdx = FLUSH_BOUND_IDX_BROTLI;
  } else if (mode === ZSTD_COMPRESS || mode === ZSTD_DECOMPRESS) {
    flushBoundIdx = FLUSH_BOUND_IDX_ZSTD;
  } else {
    flushBoundIdx = FLUSH_BOUND_IDX_NORMAL;
  }

  if (opts) {
    chunkSize = opts.chunkSize;
<<<<<<< HEAD
    if (!validateFiniteNumber(chunkSize, 'options.chunkSize')) {
      chunkSize = Z_DEFAULT_CHUNK;
    } else if (chunkSize < Z_MIN_CHUNK) {
      throw new ERR_OUT_OF_RANGE('options.chunkSize',
                                 `>= ${Z_MIN_CHUNK}`, chunkSize);
    }

    flush = checkRangesOrGetDefault(
      opts.flush, 'options.flush',
      FLUSH_BOUND[flushBoundIdx][0], FLUSH_BOUND[flushBoundIdx][1], flush);

    finishFlush = checkRangesOrGetDefault(
      opts.finishFlush, 'options.finishFlush',
      FLUSH_BOUND[flushBoundIdx][0], FLUSH_BOUND[flushBoundIdx][1],
      finishFlush);

    maxOutputLength = checkRangesOrGetDefault(
      opts.maxOutputLength, 'options.maxOutputLength',
      1, kMaxLength, kMaxLength);
=======
    if (!validateFiniteNumber(chunkSize, "options.chunkSize")) {
      chunkSize = Z_DEFAULT_CHUNK;
    } else if (chunkSize < Z_MIN_CHUNK) {
      throw new ERR_OUT_OF_RANGE(
        "options.chunkSize",
        `>= ${Z_MIN_CHUNK}`,
        chunkSize
      );
    }

    flush = checkRangesOrGetDefault(
      opts.flush,
      "options.flush",
      FLUSH_BOUND[flushBoundIdx][0],
      FLUSH_BOUND[flushBoundIdx][1],
      flush
    );

    finishFlush = checkRangesOrGetDefault(
      opts.finishFlush,
      "options.finishFlush",
      FLUSH_BOUND[flushBoundIdx][0],
      FLUSH_BOUND[flushBoundIdx][1],
      finishFlush
    );

    maxOutputLength = checkRangesOrGetDefault(
      opts.maxOutputLength,
      "options.maxOutputLength",
      1,
      kMaxLength,
      kMaxLength
    );
>>>>>>> refs/remotes/origin/master

    if (opts.encoding || opts.objectMode || opts.writableObjectMode) {
      opts = { ...opts };
      opts.encoding = null;
      opts.objectMode = false;
      opts.writableObjectMode = false;
    }
  }

  ReflectApply(Transform, this, [{ autoDestroy: true, ...opts }]);
  this[kError] = null;
  this.bytesWritten = 0;
  this._handle = handle;
  handle[owner_symbol] = this;
  // Used by processCallback() and zlibOnError()
  handle.onerror = zlibOnError;
  this._outBuffer = Buffer.allocUnsafe(chunkSize);
  this._outOffset = 0;

  this._chunkSize = chunkSize;
  this._defaultFlushFlag = flush;
  this._finishFlushFlag = finishFlush;
  this._defaultFullFlushFlag = fullFlush;
  this._info = opts?.info;
  this._maxOutputLength = maxOutputLength;

  this._rejectGarbageAfterEnd = opts?.rejectGarbageAfterEnd === true;
}
ObjectSetPrototypeOf(ZlibBase.prototype, Transform.prototype);
ObjectSetPrototypeOf(ZlibBase, Transform);

<<<<<<< HEAD
ObjectDefineProperty(ZlibBase.prototype, '_closed', {
=======
ObjectDefineProperty(ZlibBase.prototype, "_closed", {
>>>>>>> refs/remotes/origin/master
  __proto__: null,
  configurable: true,
  enumerable: true,
  get() {
    return !this._handle;
  },
});

/**
 * @this {ZlibBase}
 * @returns {void}
 */
<<<<<<< HEAD
ZlibBase.prototype.reset = function() {
  assert(this._handle, 'zlib binding closed');
=======
ZlibBase.prototype.reset = function () {
  assert(this._handle, "zlib binding closed");
>>>>>>> refs/remotes/origin/master
  return this._handle.reset();
};

/**
 * @this {ZlibBase}
 * This is the _flush function called by the transform class,
 * internally, when the last chunk has been written.
 * @returns {void}
 */
<<<<<<< HEAD
ZlibBase.prototype._flush = function(callback) {
  this._transform(Buffer.alloc(0), '', callback);
=======
ZlibBase.prototype._flush = function (callback) {
  this._transform(Buffer.alloc(0), "", callback);
>>>>>>> refs/remotes/origin/master
};

/**
 * @this {ZlibBase}
 * Force Transform compat behavior.
 * @returns {void}
 */
<<<<<<< HEAD
ZlibBase.prototype._final = function(callback) {
=======
ZlibBase.prototype._final = function (callback) {
>>>>>>> refs/remotes/origin/master
  callback();
};

// If a flush is scheduled while another flush is still pending, a way to figure
// out which one is the "stronger" flush is needed.
// This is currently only used to figure out which flush flag to use for the
// last chunk.
// Roughly, the following holds:
// Z_NO_FLUSH < Z_BLOCK < Z_PARTIAL_FLUSH <
//     Z_SYNC_FLUSH < Z_FULL_FLUSH < Z_FINISH
const flushiness = [];
<<<<<<< HEAD
const kFlushFlagList = [Z_NO_FLUSH, Z_BLOCK, Z_PARTIAL_FLUSH,
                        Z_SYNC_FLUSH, Z_FULL_FLUSH, Z_FINISH];
=======
const kFlushFlagList = [
  Z_NO_FLUSH,
  Z_BLOCK,
  Z_PARTIAL_FLUSH,
  Z_SYNC_FLUSH,
  Z_FULL_FLUSH,
  Z_FINISH,
];
>>>>>>> refs/remotes/origin/master
for (let i = 0; i < kFlushFlagList.length; i++) {
  flushiness[kFlushFlagList[i]] = i;
}

function maxFlush(a, b) {
  return flushiness[a] > flushiness[b] ? a : b;
}

// Set up a list of 'special' buffers that can be written using .write()
// from the .flush() code as a way of introducing flushing operations into the
// write sequence.
const kFlushBuffers = [];
{
  const dummyArrayBuffer = new ArrayBuffer();
  for (const flushFlag of kFlushFlagList) {
    kFlushBuffers[flushFlag] = Buffer.from(dummyArrayBuffer);
    kFlushBuffers[flushFlag][kFlushFlag] = flushFlag;
  }
}

<<<<<<< HEAD
ZlibBase.prototype.flush = function(kind, callback) {
  if (typeof kind === 'function' || (kind === undefined && !callback)) {
=======
ZlibBase.prototype.flush = function (kind, callback) {
  if (typeof kind === "function" || (kind === undefined && !callback)) {
>>>>>>> refs/remotes/origin/master
    callback = kind;
    kind = this._defaultFullFlushFlag;
  }

  if (this.writableFinished) {
<<<<<<< HEAD
    if (callback)
      process.nextTick(callback);
  } else if (this.writableEnded) {
    if (callback)
      this.once('end', callback);
  } else {
    this.write(kFlushBuffers[kind], '', callback);
=======
    if (callback) process.nextTick(callback);
  } else if (this.writableEnded) {
    if (callback) this.once("end", callback);
  } else {
    this.write(kFlushBuffers[kind], "", callback);
>>>>>>> refs/remotes/origin/master
  }
};

/**
 * @this {import('stream').Transform}
 * @param {(err?: Error) => any} [callback]
 */
<<<<<<< HEAD
ZlibBase.prototype.close = function(callback) {
=======
ZlibBase.prototype.close = function (callback) {
>>>>>>> refs/remotes/origin/master
  if (callback) finished(this, callback);
  this.destroy();
};

<<<<<<< HEAD
ZlibBase.prototype._destroy = function(err, callback) {
=======
ZlibBase.prototype._destroy = function (err, callback) {
>>>>>>> refs/remotes/origin/master
  _close(this);
  callback(err);
};

<<<<<<< HEAD
ZlibBase.prototype._transform = function(chunk, encoding, cb) {
  let flushFlag = this._defaultFlushFlag;
  // We use a 'fake' zero-length chunk to carry information about flushes from
  // the public API to the actual stream implementation.
  if (typeof chunk[kFlushFlag] === 'number') {
=======
ZlibBase.prototype._transform = function (chunk, encoding, cb) {
  let flushFlag = this._defaultFlushFlag;
  // We use a 'fake' zero-length chunk to carry information about flushes from
  // the public API to the actual stream implementation.
  if (typeof chunk[kFlushFlag] === "number") {
>>>>>>> refs/remotes/origin/master
    flushFlag = chunk[kFlushFlag];
  }

  // For the last chunk, also apply `_finishFlushFlag`.
  if (this.writableEnded && this.writableLength === chunk.byteLength) {
    flushFlag = maxFlush(flushFlag, this._finishFlushFlag);
  }
  processChunk(this, chunk, flushFlag, cb);
};

<<<<<<< HEAD
ZlibBase.prototype._processChunk = function(chunk, flushFlag, cb) {
  // _processChunk() is left for backwards compatibility
  if (typeof cb === 'function')
    processChunk(this, chunk, flushFlag, cb);
  else
    return processChunkSync(this, chunk, flushFlag);
=======
ZlibBase.prototype._processChunk = function (chunk, flushFlag, cb) {
  // _processChunk() is left for backwards compatibility
  if (typeof cb === "function") processChunk(this, chunk, flushFlag, cb);
  else return processChunkSync(this, chunk, flushFlag);
>>>>>>> refs/remotes/origin/master
};

function processChunkSync(self, chunk, flushFlag) {
  let availInBefore = chunk.byteLength;
  let availOutBefore = self._chunkSize - self._outOffset;
  let inOff = 0;
  let availOutAfter;
  let availInAfter;

  const buffers = [];
  let nread = 0;
  let inputRead = 0;
  const state = self._writeState;
  const handle = self._handle;
  let buffer = self._outBuffer;
  let offset = self._outOffset;
  const chunkSize = self._chunkSize;

  let error;
<<<<<<< HEAD
  self.on('error', function onError(er) {
=======
  self.on("error", function onError(er) {
>>>>>>> refs/remotes/origin/master
    error = er;
  });

  while (true) {
<<<<<<< HEAD
    handle.writeSync(flushFlag,
                     chunk, // in
                     inOff, // in_off
                     availInBefore, // in_len
                     buffer, // out
                     offset, // out_off
                     availOutBefore); // out_len
    if (error)
      throw error;
    else if (self[kError])
      throw self[kError];
=======
    handle.writeSync(
      flushFlag,
      chunk, // in
      inOff, // in_off
      availInBefore, // in_len
      buffer, // out
      offset, // out_off
      availOutBefore
    ); // out_len
    if (error) throw error;
    else if (self[kError]) throw self[kError];
>>>>>>> refs/remotes/origin/master

    availOutAfter = state[0];
    availInAfter = state[1];

<<<<<<< HEAD
    const inDelta = (availInBefore - availInAfter);
=======
    const inDelta = availInBefore - availInAfter;
>>>>>>> refs/remotes/origin/master
    inputRead += inDelta;

    const have = availOutBefore - availOutAfter;
    if (have > 0) {
      const out = buffer.slice(offset, offset + have);
      offset += have;
      buffers.push(out);
      nread += out.byteLength;

      if (nread > self._maxOutputLength) {
        _close(self);
        throw new ERR_BUFFER_TOO_LARGE(self._maxOutputLength);
      }
<<<<<<< HEAD

    } else {
      assert(have === 0, 'have should not go down');
=======
    } else {
      assert(have === 0, "have should not go down");
>>>>>>> refs/remotes/origin/master
    }

    // Exhausted the output buffer, or used all the input create a new one.
    if (availOutAfter === 0 || offset >= chunkSize) {
      availOutBefore = chunkSize;
      offset = 0;
      buffer = Buffer.allocUnsafe(chunkSize);
    }

    if (availOutAfter === 0) {
      // Not actually done. Need to reprocess.
      // Also, update the availInBefore to the availInAfter value,
      // so that if we have to hit it a third (fourth, etc.) time,
      // it'll have the correct byte counts.
      inOff += inDelta;
      availInBefore = availInAfter;
    } else {
      break;
    }
  }

  self.bytesWritten = inputRead;
  _close(self);

<<<<<<< HEAD
  if (nread === 0)
    return Buffer.alloc(0);

  return (buffers.length === 1 ? buffers[0] : Buffer.concat(buffers, nread));
=======
  if (nread === 0) return Buffer.alloc(0);

  return buffers.length === 1 ? buffers[0] : Buffer.concat(buffers, nread);
>>>>>>> refs/remotes/origin/master
}

function processChunk(self, chunk, flushFlag, cb) {
  const handle = self._handle;
  if (!handle) return process.nextTick(cb);

  handle.buffer = chunk;
  handle.cb = cb;
  handle.availOutBefore = self._chunkSize - self._outOffset;
  handle.availInBefore = chunk.byteLength;
  handle.inOff = 0;
  handle.flushFlag = flushFlag;

<<<<<<< HEAD
  handle.write(flushFlag,
               chunk, // in
               0, // in_off
               handle.availInBefore, // in_len
               self._outBuffer, // out
               self._outOffset, // out_off
               handle.availOutBefore); // out_len
=======
  handle.write(
    flushFlag,
    chunk, // in
    0, // in_off
    handle.availInBefore, // in_len
    self._outBuffer, // out
    self._outOffset, // out_off
    handle.availOutBefore
  ); // out_len
>>>>>>> refs/remotes/origin/master
}

function processCallback() {
  // This callback's context (`this`) is the `_handle` (ZCtx) object. It is
  // important to null out the values once they are no longer needed since
  // `_handle` can stay in memory long after the buffer is needed.
  const handle = this;
  const self = this[owner_symbol];
  const state = self._writeState;

  if (self.destroyed) {
    this.buffer = null;
    this.cb();
    return;
  }

  const availOutAfter = state[0];
  const availInAfter = state[1];

  const inDelta = handle.availInBefore - availInAfter;
  self.bytesWritten += inDelta;

  const have = handle.availOutBefore - availOutAfter;
  let streamBufferIsFull = false;
  if (have > 0) {
    const out = self._outBuffer.slice(self._outOffset, self._outOffset + have);
    self._outOffset += have;
    streamBufferIsFull = !self.push(out);
  } else {
<<<<<<< HEAD
    assert(have === 0, 'have should not go down');
=======
    assert(have === 0, "have should not go down");
>>>>>>> refs/remotes/origin/master
  }

  if (self.destroyed) {
    this.cb();
    return;
  }

  // Exhausted the output buffer, or used all the input create a new one.
  if (availOutAfter === 0 || self._outOffset >= self._chunkSize) {
    handle.availOutBefore = self._chunkSize;
    self._outOffset = 0;
    self._outBuffer = Buffer.allocUnsafe(self._chunkSize);
  }

  if (availOutAfter === 0) {
    // Not actually done. Need to reprocess.
    // Also, update the availInBefore to the availInAfter value,
    // so that if we have to hit it a third (fourth, etc.) time,
    // it'll have the correct byte counts.
    handle.inOff += inDelta;
    handle.availInBefore = availInAfter;

<<<<<<< HEAD

    if (!streamBufferIsFull) {
      this.write(handle.flushFlag,
                 this.buffer, // in
                 handle.inOff, // in_off
                 handle.availInBefore, // in_len
                 self._outBuffer, // out
                 self._outOffset, // out_off
                 self._chunkSize); // out_len
=======
    if (!streamBufferIsFull) {
      this.write(
        handle.flushFlag,
        this.buffer, // in
        handle.inOff, // in_off
        handle.availInBefore, // in_len
        self._outBuffer, // out
        self._outOffset, // out_off
        self._chunkSize
      ); // out_len
>>>>>>> refs/remotes/origin/master
    } else {
      const oldRead = self._read;
      self._read = (n) => {
        self._read = oldRead;
<<<<<<< HEAD
        this.write(handle.flushFlag,
                   this.buffer, // in
                   handle.inOff, // in_off
                   handle.availInBefore, // in_len
                   self._outBuffer, // out
                   self._outOffset, // out_off
                   self._chunkSize); // out_len
=======
        this.write(
          handle.flushFlag,
          this.buffer, // in
          handle.inOff, // in_off
          handle.availInBefore, // in_len
          self._outBuffer, // out
          self._outOffset, // out_off
          self._chunkSize
        ); // out_len
>>>>>>> refs/remotes/origin/master
        self._read(n);
      };
    }
    return;
  }

  if (availInAfter > 0) {
    // If we have more input that should be written, but we also have output
    // space available, that means that the compression library was not
    // interested in receiving more data, and in particular that the input
    // stream has ended early.
    // This applies to streams where we don't check data past the end of
    // what was consumed; that is, everything except Gunzip/Unzip.

    if (self._rejectGarbageAfterEnd) {
      const err = new ERR_TRAILING_JUNK_AFTER_STREAM_END();
      self.destroy(err);
      this.cb(err);
      return;
    }

    self.push(null);
  }

  // Finished with the chunk.
  this.buffer = null;
  this.cb();
}

/**
 * @param {ZlibBase} engine
 * @private
 */
function _close(engine) {
  // Caller may invoke .close after a zlib error (which will null _handle)
  engine._handle?.close();
  engine._handle = null;
}

const zlibDefaultOpts = {
  flush: Z_NO_FLUSH,
  finishFlush: Z_FINISH,
  fullFlush: Z_FULL_FLUSH,
};
// Base class for all streams actually backed by zlib and using zlib-specific
// parameters.
function Zlib(opts, mode) {
  let windowBits = Z_DEFAULT_WINDOWBITS;
  let level = Z_DEFAULT_COMPRESSION;
  let memLevel = Z_DEFAULT_MEMLEVEL;
  let strategy = Z_DEFAULT_STRATEGY;
  let dictionary;

  if (opts) {
    // windowBits is special. On the compression side, 0 is an invalid value.
    // But on the decompression side, a value of 0 for windowBits tells zlib
    // to use the window size in the zlib header of the compressed stream.
<<<<<<< HEAD
    if ((opts.windowBits == null || opts.windowBits === 0) &&
        (mode === INFLATE ||
         mode === GUNZIP ||
         mode === UNZIP)) {
=======
    if (
      (opts.windowBits == null || opts.windowBits === 0) &&
      (mode === INFLATE || mode === GUNZIP || mode === UNZIP)
    ) {
>>>>>>> refs/remotes/origin/master
      windowBits = 0;
    } else {
      // `{ windowBits: 8 }` is valid for deflate but not gzip.
      const min = Z_MIN_WINDOWBITS + (mode === GZIP ? 1 : 0);
      windowBits = checkRangesOrGetDefault(
<<<<<<< HEAD
        opts.windowBits, 'options.windowBits',
        min, Z_MAX_WINDOWBITS, Z_DEFAULT_WINDOWBITS);
    }

    level = checkRangesOrGetDefault(
      opts.level, 'options.level',
      Z_MIN_LEVEL, Z_MAX_LEVEL, Z_DEFAULT_COMPRESSION);

    memLevel = checkRangesOrGetDefault(
      opts.memLevel, 'options.memLevel',
      Z_MIN_MEMLEVEL, Z_MAX_MEMLEVEL, Z_DEFAULT_MEMLEVEL);

    strategy = checkRangesOrGetDefault(
      opts.strategy, 'options.strategy',
      Z_DEFAULT_STRATEGY, Z_FIXED, Z_DEFAULT_STRATEGY);
=======
        opts.windowBits,
        "options.windowBits",
        min,
        Z_MAX_WINDOWBITS,
        Z_DEFAULT_WINDOWBITS
      );
    }

    level = checkRangesOrGetDefault(
      opts.level,
      "options.level",
      Z_MIN_LEVEL,
      Z_MAX_LEVEL,
      Z_DEFAULT_COMPRESSION
    );

    memLevel = checkRangesOrGetDefault(
      opts.memLevel,
      "options.memLevel",
      Z_MIN_MEMLEVEL,
      Z_MAX_MEMLEVEL,
      Z_DEFAULT_MEMLEVEL
    );

    strategy = checkRangesOrGetDefault(
      opts.strategy,
      "options.strategy",
      Z_DEFAULT_STRATEGY,
      Z_FIXED,
      Z_DEFAULT_STRATEGY
    );
>>>>>>> refs/remotes/origin/master

    dictionary = opts.dictionary;
    if (dictionary !== undefined && !isArrayBufferView(dictionary)) {
      if (isAnyArrayBuffer(dictionary)) {
        dictionary = Buffer.from(dictionary);
      } else {
        throw new ERR_INVALID_ARG_TYPE(
<<<<<<< HEAD
          'options.dictionary',
          ['Buffer', 'TypedArray', 'DataView', 'ArrayBuffer'],
          dictionary,
=======
          "options.dictionary",
          ["Buffer", "TypedArray", "DataView", "ArrayBuffer"],
          dictionary
>>>>>>> refs/remotes/origin/master
        );
      }
    }
  }

  const handle = new binding.Zlib(mode);
  // Ideally, we could let ZlibBase() set up _writeState. I haven't been able
  // to come up with a good solution that doesn't break our internal API,
  // and with it all supported npm versions at the time of writing.
  this._writeState = new Uint32Array(2);
<<<<<<< HEAD
  handle.init(windowBits,
              level,
              memLevel,
              strategy,
              this._writeState,
              processCallback,
              dictionary);
=======
  handle.init(
    windowBits,
    level,
    memLevel,
    strategy,
    this._writeState,
    processCallback,
    dictionary
  );
>>>>>>> refs/remotes/origin/master

  ReflectApply(ZlibBase, this, [opts, mode, handle, zlibDefaultOpts]);

  this._level = level;
  this._strategy = strategy;
  this._mode = mode;
}
ObjectSetPrototypeOf(Zlib.prototype, ZlibBase.prototype);
ObjectSetPrototypeOf(Zlib, ZlibBase);

// This callback is used by `.params()` to wait until a full flush happened
// before adjusting the parameters. In particular, the call to the native
// `params()` function should not happen while a write is currently in progress
// on the threadpool.
function paramsAfterFlushCallback(level, strategy, callback) {
<<<<<<< HEAD
  assert(this._handle, 'zlib binding closed');
=======
  assert(this._handle, "zlib binding closed");
>>>>>>> refs/remotes/origin/master
  this._handle.params(level, strategy);
  if (!this.destroyed) {
    this._level = level;
    this._strategy = strategy;
    if (callback) callback();
  }
}

Zlib.prototype.params = function params(level, strategy, callback) {
<<<<<<< HEAD
  checkRangesOrGetDefault(level, 'level', Z_MIN_LEVEL, Z_MAX_LEVEL);
  checkRangesOrGetDefault(strategy, 'strategy', Z_DEFAULT_STRATEGY, Z_FIXED);
=======
  checkRangesOrGetDefault(level, "level", Z_MIN_LEVEL, Z_MAX_LEVEL);
  checkRangesOrGetDefault(strategy, "strategy", Z_DEFAULT_STRATEGY, Z_FIXED);
>>>>>>> refs/remotes/origin/master

  if (this._level !== level || this._strategy !== strategy) {
    this.flush(
      Z_SYNC_FLUSH,
<<<<<<< HEAD
      paramsAfterFlushCallback.bind(this, level, strategy, callback),
=======
      paramsAfterFlushCallback.bind(this, level, strategy, callback)
>>>>>>> refs/remotes/origin/master
    );
  } else {
    process.nextTick(callback);
  }
};

// generic zlib
// minimal 2-byte header
function Deflate(opts) {
  if (!(this instanceof Deflate)) {
<<<<<<< HEAD
    return deprecateInstantiation(Deflate, 'DEP0184', opts);
=======
    return deprecateInstantiation(Deflate, "DEP0184", opts);
>>>>>>> refs/remotes/origin/master
  }
  ReflectApply(Zlib, this, [opts, DEFLATE]);
}
ObjectSetPrototypeOf(Deflate.prototype, Zlib.prototype);
ObjectSetPrototypeOf(Deflate, Zlib);

function Inflate(opts) {
  if (!(this instanceof Inflate)) {
<<<<<<< HEAD
    return deprecateInstantiation(Inflate, 'DEP0184', opts);
=======
    return deprecateInstantiation(Inflate, "DEP0184", opts);
>>>>>>> refs/remotes/origin/master
  }
  ReflectApply(Zlib, this, [opts, INFLATE]);
}
ObjectSetPrototypeOf(Inflate.prototype, Zlib.prototype);
ObjectSetPrototypeOf(Inflate, Zlib);

function Gzip(opts) {
  if (!(this instanceof Gzip)) {
<<<<<<< HEAD
    return deprecateInstantiation(Gzip, 'DEP0184', opts);
=======
    return deprecateInstantiation(Gzip, "DEP0184", opts);
>>>>>>> refs/remotes/origin/master
  }
  ReflectApply(Zlib, this, [opts, GZIP]);
}
ObjectSetPrototypeOf(Gzip.prototype, Zlib.prototype);
ObjectSetPrototypeOf(Gzip, Zlib);

function Gunzip(opts) {
  if (!(this instanceof Gunzip)) {
<<<<<<< HEAD
    return deprecateInstantiation(Gunzip, 'DEP0184', opts);
=======
    return deprecateInstantiation(Gunzip, "DEP0184", opts);
>>>>>>> refs/remotes/origin/master
  }
  ReflectApply(Zlib, this, [opts, GUNZIP]);
}
ObjectSetPrototypeOf(Gunzip.prototype, Zlib.prototype);
ObjectSetPrototypeOf(Gunzip, Zlib);

function DeflateRaw(opts) {
  if (opts && opts.windowBits === 8) opts.windowBits = 9;
  if (!(this instanceof DeflateRaw)) {
<<<<<<< HEAD
    return deprecateInstantiation(DeflateRaw, 'DEP0184', opts);
=======
    return deprecateInstantiation(DeflateRaw, "DEP0184", opts);
>>>>>>> refs/remotes/origin/master
  }
  ReflectApply(Zlib, this, [opts, DEFLATERAW]);
}
ObjectSetPrototypeOf(DeflateRaw.prototype, Zlib.prototype);
ObjectSetPrototypeOf(DeflateRaw, Zlib);

function InflateRaw(opts) {
  if (!(this instanceof InflateRaw)) {
<<<<<<< HEAD
    return deprecateInstantiation(InflateRaw, 'DEP0184', opts);
=======
    return deprecateInstantiation(InflateRaw, "DEP0184", opts);
>>>>>>> refs/remotes/origin/master
  }
  ReflectApply(Zlib, this, [opts, INFLATERAW]);
}
ObjectSetPrototypeOf(InflateRaw.prototype, Zlib.prototype);
ObjectSetPrototypeOf(InflateRaw, Zlib);

function Unzip(opts) {
  if (!(this instanceof Unzip)) {
<<<<<<< HEAD
    return deprecateInstantiation(Unzip, 'DEP0184', opts);
=======
    return deprecateInstantiation(Unzip, "DEP0184", opts);
>>>>>>> refs/remotes/origin/master
  }
  ReflectApply(Zlib, this, [opts, UNZIP]);
}
ObjectSetPrototypeOf(Unzip.prototype, Zlib.prototype);
ObjectSetPrototypeOf(Unzip, Zlib);

function createConvenienceMethod(ctor, sync) {
  if (sync) {
    return function syncBufferWrapper(buffer, opts) {
      return zlibBufferSync(new ctor(opts), buffer);
    };
  }
  return function asyncBufferWrapper(buffer, opts, callback) {
<<<<<<< HEAD
    if (typeof opts === 'function') {
=======
    if (typeof opts === "function") {
>>>>>>> refs/remotes/origin/master
      callback = opts;
      opts = {};
    }
    return zlibBuffer(new ctor(opts), buffer, callback);
  };
}

const kMaxBrotliParam = MathMax(
<<<<<<< HEAD
  ...ObjectEntries(constants)
    .map(({ 0: key, 1: value }) => (key.startsWith('BROTLI_PARAM_') ? value : 0)),
=======
  ...ObjectEntries(constants).map(({ 0: key, 1: value }) =>
    key.startsWith("BROTLI_PARAM_") ? value : 0
  )
>>>>>>> refs/remotes/origin/master
);
const brotliInitParamsArray = new Uint32Array(kMaxBrotliParam + 1);

const brotliDefaultOpts = {
  flush: BROTLI_OPERATION_PROCESS,
  finishFlush: BROTLI_OPERATION_FINISH,
  fullFlush: BROTLI_OPERATION_FLUSH,
};
function Brotli(opts, mode) {
  assert(mode === BROTLI_DECODE || mode === BROTLI_ENCODE);

  brotliInitParamsArray.fill(-1);
  if (opts?.params) {
    ObjectKeys(opts.params).forEach((origKey) => {
      const key = +origKey;
<<<<<<< HEAD
      if (NumberIsNaN(key) || key < 0 || key > kMaxBrotliParam ||
          (brotliInitParamsArray[key] | 0) !== -1) {
=======
      if (
        NumberIsNaN(key) ||
        key < 0 ||
        key > kMaxBrotliParam ||
        (brotliInitParamsArray[key] | 0) !== -1
      ) {
>>>>>>> refs/remotes/origin/master
        throw new ERR_BROTLI_INVALID_PARAM(origKey);
      }

      const value = opts.params[origKey];
<<<<<<< HEAD
      if (typeof value !== 'number' && typeof value !== 'boolean') {
        throw new ERR_INVALID_ARG_TYPE('options.params[key]',
                                       'number', opts.params[origKey]);
=======
      if (typeof value !== "number" && typeof value !== "boolean") {
        throw new ERR_INVALID_ARG_TYPE(
          "options.params[key]",
          "number",
          opts.params[origKey]
        );
>>>>>>> refs/remotes/origin/master
      }
      brotliInitParamsArray[key] = value;
    });
  }

<<<<<<< HEAD
  const handle = mode === BROTLI_DECODE ?
    new binding.BrotliDecoder(mode) : new binding.BrotliEncoder(mode);
=======
  const handle =
    mode === BROTLI_DECODE
      ? new binding.BrotliDecoder(mode)
      : new binding.BrotliEncoder(mode);
>>>>>>> refs/remotes/origin/master

  this._writeState = new Uint32Array(2);
  handle.init(brotliInitParamsArray, this._writeState, processCallback);

  ReflectApply(ZlibBase, this, [opts, mode, handle, brotliDefaultOpts]);
}
ObjectSetPrototypeOf(Brotli.prototype, Zlib.prototype);
ObjectSetPrototypeOf(Brotli, Zlib);

function BrotliCompress(opts) {
  if (!(this instanceof BrotliCompress)) {
<<<<<<< HEAD
    return deprecateInstantiation(BrotliCompress, 'DEP0184', opts);
=======
    return deprecateInstantiation(BrotliCompress, "DEP0184", opts);
>>>>>>> refs/remotes/origin/master
  }
  ReflectApply(Brotli, this, [opts, BROTLI_ENCODE]);
}
ObjectSetPrototypeOf(BrotliCompress.prototype, Brotli.prototype);
ObjectSetPrototypeOf(BrotliCompress, Brotli);

function BrotliDecompress(opts) {
  if (!(this instanceof BrotliDecompress)) {
<<<<<<< HEAD
    return deprecateInstantiation(BrotliDecompress, 'DEP0184', opts);
=======
    return deprecateInstantiation(BrotliDecompress, "DEP0184", opts);
>>>>>>> refs/remotes/origin/master
  }
  ReflectApply(Brotli, this, [opts, BROTLI_DECODE]);
}
ObjectSetPrototypeOf(BrotliDecompress.prototype, Brotli.prototype);
ObjectSetPrototypeOf(BrotliDecompress, Brotli);

<<<<<<< HEAD

=======
>>>>>>> refs/remotes/origin/master
const zstdDefaultOpts = {
  flush: ZSTD_e_continue,
  finishFlush: ZSTD_e_end,
  fullFlush: ZSTD_e_flush,
};
class Zstd extends ZlibBase {
  constructor(opts, mode, initParamsArray, maxParam) {
    assert(mode === ZSTD_COMPRESS || mode === ZSTD_DECOMPRESS);

    initParamsArray.fill(-1);
    if (opts?.params) {
      ObjectKeys(opts.params).forEach((origKey) => {
        const key = +origKey;
<<<<<<< HEAD
        if (NumberIsNaN(key) || key < 0 || key > maxParam ||
            (initParamsArray[key] | 0) !== -1) {
=======
        if (
          NumberIsNaN(key) ||
          key < 0 ||
          key > maxParam ||
          (initParamsArray[key] | 0) !== -1
        ) {
>>>>>>> refs/remotes/origin/master
          throw new ERR_ZSTD_INVALID_PARAM(origKey);
        }

        const value = opts.params[origKey];
<<<<<<< HEAD
        if (typeof value !== 'number' && typeof value !== 'boolean') {
          throw new ERR_INVALID_ARG_TYPE('options.params[key]',
                                         'number', opts.params[origKey]);
=======
        if (typeof value !== "number" && typeof value !== "boolean") {
          throw new ERR_INVALID_ARG_TYPE(
            "options.params[key]",
            "number",
            opts.params[origKey]
          );
>>>>>>> refs/remotes/origin/master
        }
        initParamsArray[key] = value;
      });
    }

<<<<<<< HEAD
    const handle = mode === ZSTD_COMPRESS ?
      new binding.ZstdCompress() : new binding.ZstdDecompress();
=======
    const handle =
      mode === ZSTD_COMPRESS
        ? new binding.ZstdCompress()
        : new binding.ZstdDecompress();
>>>>>>> refs/remotes/origin/master

    const pledgedSrcSize = opts?.pledgedSrcSize ?? undefined;

    const writeState = new Uint32Array(2);

    handle.init(
      initParamsArray,
      pledgedSrcSize,
      writeState,
      processCallback,
<<<<<<< HEAD
      opts?.dictionary && isArrayBufferView(opts.dictionary) ? opts.dictionary : undefined,
=======
      opts?.dictionary && isArrayBufferView(opts.dictionary)
        ? opts.dictionary
        : undefined
>>>>>>> refs/remotes/origin/master
    );

    super(opts, mode, handle, zstdDefaultOpts);
    this._writeState = writeState;
  }
}

<<<<<<< HEAD
const kMaxZstdCParam = MathMax(...ObjectKeys(constants).map(
  (key) => (key.startsWith('ZSTD_c_') ?
    constants[key] :
    0),
));
=======
const kMaxZstdCParam = MathMax(
  ...ObjectKeys(constants).map((key) =>
    key.startsWith("ZSTD_c_") ? constants[key] : 0
  )
);
>>>>>>> refs/remotes/origin/master

const zstdInitCParamsArray = new Uint32Array(kMaxZstdCParam + 1);

class ZstdCompress extends Zstd {
  constructor(opts) {
    super(opts, ZSTD_COMPRESS, zstdInitCParamsArray, kMaxZstdCParam);
  }
}

<<<<<<< HEAD
const kMaxZstdDParam = MathMax(...ObjectKeys(constants).map(
  (key) => (key.startsWith('ZSTD_d_') ?
    constants[key] :
    0),
));
=======
const kMaxZstdDParam = MathMax(
  ...ObjectKeys(constants).map((key) =>
    key.startsWith("ZSTD_d_") ? constants[key] : 0
  )
);
>>>>>>> refs/remotes/origin/master

const zstdInitDParamsArray = new Uint32Array(kMaxZstdDParam + 1);

class ZstdDecompress extends Zstd {
  constructor(opts) {
    super(opts, ZSTD_DECOMPRESS, zstdInitDParamsArray, kMaxZstdDParam);
  }
}

function createProperty(ctor) {
  return {
    __proto__: null,
    configurable: true,
    enumerable: true,
<<<<<<< HEAD
    value: function(options) {
=======
    value: function (options) {
>>>>>>> refs/remotes/origin/master
      return new ctor(options);
    },
  };
}

function crc32(data, value = 0) {
<<<<<<< HEAD
  if (typeof data !== 'string' && !isArrayBufferView(data)) {
    throw new ERR_INVALID_ARG_TYPE('data', ['Buffer', 'TypedArray', 'DataView', 'string'], data);
  }
  validateUint32(value, 'value');
=======
  if (typeof data !== "string" && !isArrayBufferView(data)) {
    throw new ERR_INVALID_ARG_TYPE(
      "data",
      ["Buffer", "TypedArray", "DataView", "string"],
      data
    );
  }
  validateUint32(value, "value");
>>>>>>> refs/remotes/origin/master
  return crc32Native(data, value);
}

// Legacy alias on the C++ wrapper object. This is not public API, so we may
// want to runtime-deprecate it at some point. There's no hurry, though.
<<<<<<< HEAD
ObjectDefineProperty(binding.Zlib.prototype, 'jsref', {
  __proto__: null,
  get() { return this[owner_symbol]; },
  set(v) { return this[owner_symbol] = v; },
=======
ObjectDefineProperty(binding.Zlib.prototype, "jsref", {
  __proto__: null,
  get() {
    return this[owner_symbol];
  },
  set(v) {
    return (this[owner_symbol] = v);
  },
>>>>>>> refs/remotes/origin/master
});

module.exports = {
  crc32,
  Deflate,
  Inflate,
  Gzip,
  Gunzip,
  DeflateRaw,
  InflateRaw,
  Unzip,
  BrotliCompress,
  BrotliDecompress,
  ZstdCompress,
  ZstdDecompress,

  // Convenience methods.
  // compress/decompress a string or buffer in one step.
  deflate: createConvenienceMethod(Deflate, false),
  deflateSync: createConvenienceMethod(Deflate, true),
  gzip: createConvenienceMethod(Gzip, false),
  gzipSync: createConvenienceMethod(Gzip, true),
  deflateRaw: createConvenienceMethod(DeflateRaw, false),
  deflateRawSync: createConvenienceMethod(DeflateRaw, true),
  unzip: createConvenienceMethod(Unzip, false),
  unzipSync: createConvenienceMethod(Unzip, true),
  inflate: createConvenienceMethod(Inflate, false),
  inflateSync: createConvenienceMethod(Inflate, true),
  gunzip: createConvenienceMethod(Gunzip, false),
  gunzipSync: createConvenienceMethod(Gunzip, true),
  inflateRaw: createConvenienceMethod(InflateRaw, false),
  inflateRawSync: createConvenienceMethod(InflateRaw, true),
  brotliCompress: createConvenienceMethod(BrotliCompress, false),
  brotliCompressSync: createConvenienceMethod(BrotliCompress, true),
  brotliDecompress: createConvenienceMethod(BrotliDecompress, false),
  brotliDecompressSync: createConvenienceMethod(BrotliDecompress, true),
  zstdCompress: createConvenienceMethod(ZstdCompress, false),
  zstdCompressSync: createConvenienceMethod(ZstdCompress, true),
  zstdDecompress: createConvenienceMethod(ZstdDecompress, false),
  zstdDecompressSync: createConvenienceMethod(ZstdDecompress, true),
};

ObjectDefineProperties(module.exports, {
  createDeflate: createProperty(Deflate),
  createInflate: createProperty(Inflate),
  createDeflateRaw: createProperty(DeflateRaw),
  createInflateRaw: createProperty(InflateRaw),
  createGzip: createProperty(Gzip),
  createGunzip: createProperty(Gunzip),
  createUnzip: createProperty(Unzip),
  createBrotliCompress: createProperty(BrotliCompress),
  createBrotliDecompress: createProperty(BrotliDecompress),
  createZstdCompress: createProperty(ZstdCompress),
  createZstdDecompress: createProperty(ZstdDecompress),
  constants: {
    __proto__: null,
    configurable: false,
    enumerable: true,
    value: constants,
  },
  codes: {
    __proto__: null,
    enumerable: true,
    writable: false,
    value: ObjectFreeze(codes),
  },
});

// These should be considered deprecated
// expose all the zlib constants
for (const { 0: key, 1: value } of ObjectEntries(constants)) {
<<<<<<< HEAD
  if (key.startsWith('BROTLI')) continue;
=======
  if (key.startsWith("BROTLI")) continue;
>>>>>>> refs/remotes/origin/master
  ObjectDefineProperty(module.exports, key, {
    __proto__: null,
    enumerable: false,
    value,
    writable: false,
  });
<<<<<<< HEAD
}
=======
}
>>>>>>> refs/remotes/origin/master
