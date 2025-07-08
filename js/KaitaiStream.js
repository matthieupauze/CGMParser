/**
 * KaitaiStream is an implementation of Kaitai Struct API for JavaScript.
 * Based on DataStream - https://github.com/kig/DataStream.js .
 */
export class KaitaiStream {
    /**
     * @param arrayBuffer ArrayBuffer to read from.
     * @param byteOffset Offset from arrayBuffer beginning for the KaitaiStream.
     */
    constructor(arrayBuffer, byteOffset) {
        this._byteOffset = byteOffset || 0
        if (arrayBuffer instanceof ArrayBuffer) {
            this.buffer = arrayBuffer
        } else if (typeof arrayBuffer == "object") {
            this.dataView = arrayBuffer
            if (byteOffset) {
                this._byteOffset += byteOffset
            }
        } else {
            this.buffer = new ArrayBuffer(arrayBuffer || 1)
        }
        this.pos = 0
        this.alignToByte()
    }

    /**
     * Virtual byte length of the KaitaiStream backing buffer.
     * Updated to be max of original buffer size and last written size.
     * If dynamicSize is false is set to buffer size.
     */
    _byteLength = 0
    _byteOffset = 0
    bits = 0
    bitsLeft = 0

    /**
     * Dependency configuration data. Holds urls for (optional) dynamic loading
     * of code dependencies from a remote server. For use by (static) processing functions.
     *
     * Caller should the supported keys to the asset urls as needed.
     * NOTE: `depUrls` is a static property of KaitaiStream (the factory), like the various
     * processing functions. It is NOT part of the prototype of instances.
     */
    static depUrls = {
        // processZlib uses this and expected a link to a copy of pako.
        // specifically the pako_inflate.min.js script at:
        // https://raw.githubusercontent.com/nodeca/pako/master/dist/pako_inflate.min.js
        zlib: undefined
    }

    /**
     * Gets the backing ArrayBuffer of the KaitaiStream object.
     *
     * @returns The backing ArrayBuffer.
     */
    get buffer() {
        this._trimAlloc()
        return this._buffer
    }

    /**
     * Sets the backing ArrayBuffer of the KaitaiStream object and updates the
     * DataView to point to the new buffer.
     */
    set buffer(v) {
        this._buffer = v
        this._dataView = new DataView(this._buffer, this._byteOffset)
        this._byteLength = this._buffer.byteLength
    }

    /**
     * Gets the byteOffset of the KaitaiStream object.
     *
     * @returns The byteOffset.
     */
    get byteOffset() {
        return this._byteOffset
    }

    /**
     * Sets the byteOffset of the KaitaiStream object and updates the DataView to
     * point to the new byteOffset.
     */
    set byteOffset(v) {
        this._byteOffset = v
        this._dataView = new DataView(this._buffer, this._byteOffset)
        this._byteLength = this._buffer.byteLength
    }

    /**
     * Gets the backing DataView of the KaitaiStream object.
     *
     * @returns The backing DataView.
     */
    get dataView() {
        return this._dataView
    }
    /**
     * Sets the backing DataView of the KaitaiStream object and updates the buffer
     * and byteOffset to point to the DataView values.
     */
    set dataView(v) {
        this._byteOffset = v.byteOffset
        this._buffer = v.buffer
        this._dataView = new DataView(this._buffer, this._byteOffset)
        this._byteLength = this._byteOffset + v.byteLength
    }

    /**
     * Internal function to trim the KaitaiStream buffer when required.
     * Used for stripping out the extra bytes from the backing buffer when
     * the virtual byteLength is smaller than the buffer byteLength (happens after
     * growing the buffer with writes and not filling the extra space completely).
     */
    _trimAlloc() {
        if (this._byteLength === this._buffer.byteLength) {
            return
        }
        const buf = new ArrayBuffer(this._byteLength)
        const dst = new Uint8Array(buf)
        const src = new Uint8Array(this._buffer, 0, dst.length)
        dst.set(src)
        this.buffer = buf
    }

    // ========================================================================
    // Stream positioning
    // ========================================================================

    /**
     * Returns true if the KaitaiStream seek pointer is at the end of buffer and
     * there's no more data to read.
     *
     * @returns True if the seek pointer is at the end of the buffer.
     */
    isEof() {
        return this.pos >= this.size && this.bitsLeft === 0
    }

    /**
     * Sets the KaitaiStream read/write position to given position.
     * Clamps between 0 and KaitaiStream length.
     *
     * @param pos Position to seek to.
     */
    seek(pos) {
        const npos = Math.max(0, Math.min(this.size, pos))
        this.pos = isNaN(npos) || !isFinite(npos) ? 0 : npos
    }

    /**
     * Returns the byte length of the KaitaiStream object.
     *
     * @returns The byte length.
     */
    get size() {
        return this._byteLength - this._byteOffset
    }

    // ========================================================================
    // Integer numbers
    // ========================================================================

    // ------------------------------------------------------------------------
    // Signed
    // ------------------------------------------------------------------------

    /**
     * Reads an 8-bit signed int from the stream.
     *
     * @returns The read number.
     */
    readS1() {
        this.ensureBytesLeft(1)
        const v = this._dataView.getInt8(this.pos)
        this.pos += 1
        return v
    }

    // ........................................................................
    // Big-endian
    // ........................................................................

    /**
     * Reads a 16-bit big-endian signed int from the stream.
     *
     * @returns The read number.
     */
    readS2be() {
        this.ensureBytesLeft(2)
        const v = this._dataView.getInt16(this.pos)
        this.pos += 2
        return v
    }

    /**
     * Reads a 32-bit big-endian signed int from the stream.
     *
     * @returns The read number.
     */
    readS4be() {
        this.ensureBytesLeft(4)
        const v = this._dataView.getInt32(this.pos)
        this.pos += 4
        return v
    }

    /**
     * Reads a 64-bit big-endian unsigned int from the stream. Note that
     * JavaScript does not support 64-bit integers natively, so it will
     * automatically upgrade internal representation to use IEEE 754
     * double precision float.
     *
     * @returns The read number.
     */
    readS8be() {
        this.ensureBytesLeft(8)
        const v1 = this.readU4be()
        const v2 = this.readU4be()

        if ((v1 & 0x80000000) !== 0) {
            // negative number
            return -(0x100000000 * (v1 ^ 0xffffffff) + (v2 ^ 0xffffffff)) - 1
        } else {
            return 0x100000000 * v1 + v2
        }
    }

    // ........................................................................
    // Little-endian
    // ........................................................................

    /**
     * Reads a 16-bit little-endian signed int from the stream.
     *
     * @returns The read number.
     */
    readS2le() {
        this.ensureBytesLeft(2)
        const v = this._dataView.getInt16(this.pos, true)
        this.pos += 2
        return v
    }

    /**
     * Reads a 32-bit little-endian signed int from the stream.
     *
     * @returns The read number.
     */
    readS4le() {
        this.ensureBytesLeft(4)
        const v = this._dataView.getInt32(this.pos, true)
        this.pos += 4
        return v
    }

    /**
     * Reads a 64-bit little-endian unsigned int from the stream. Note that
     * JavaScript does not support 64-bit integers natively, so it will
     * automatically upgrade internal representation to use IEEE 754
     * double precision float.
     *
     * @returns The read number.
     */
    readS8le() {
        this.ensureBytesLeft(8)
        const v1 = this.readU4le()
        const v2 = this.readU4le()

        if ((v2 & 0x80000000) !== 0) {
            // negative number
            return -(0x100000000 * (v2 ^ 0xffffffff) + (v1 ^ 0xffffffff)) - 1
        } else {
            return 0x100000000 * v2 + v1
        }
    }

    // ------------------------------------------------------------------------
    // Unsigned
    // ------------------------------------------------------------------------

    /**
     * Reads an 8-bit unsigned int from the stream.
     *
     * @returns The read number.
     */
    readU1() {
        this.ensureBytesLeft(1)
        const v = this._dataView.getUint8(this.pos)
        this.pos += 1
        return v
    }

    // ........................................................................
    // Big-endian
    // ........................................................................

    /**
     * Reads a 16-bit big-endian unsigned int from the stream.
     *
     * @returns The read number.
     */
    readU2be() {
        this.ensureBytesLeft(2)
        const v = this._dataView.getUint16(this.pos)
        this.pos += 2
        return v
    }

    /**
     * Reads a 32-bit big-endian unsigned int from the stream.
     *
     * @returns The read number.
     */
    readU4be() {
        this.ensureBytesLeft(4)
        const v = this._dataView.getUint32(this.pos)
        this.pos += 4
        return v
    }

    /**
     * Reads a 64-bit big-endian unsigned int from the stream. Note that
     * JavaScript does not support 64-bit integers natively, so it will
     * automatically upgrade internal representation to use IEEE 754
     * double precision float.
     *
     * @returns The read number.
     */
    readU8be() {
        this.ensureBytesLeft(8)
        const v1 = this.readU4be()
        const v2 = this.readU4be()
        return 0x100000000 * v1 + v2
    }

    // ........................................................................
    // Little-endian
    // ........................................................................

    /**
     * Reads a 16-bit little-endian unsigned int from the stream.
     *
     * @returns The read number.
     */
    readU2le() {
        this.ensureBytesLeft(2)
        const v = this._dataView.getUint16(this.pos, true)
        this.pos += 2
        return v
    }

    /**
     * Reads a 32-bit little-endian unsigned int from the stream.
     *
     * @returns The read number.
     */
    readU4le() {
        this.ensureBytesLeft(4)
        const v = this._dataView.getUint32(this.pos, true)
        this.pos += 4
        return v
    }

    /**
     * Reads a 64-bit little-endian unsigned int from the stream. Note that
     * JavaScript does not support 64-bit integers natively, so it will
     * automatically upgrade internal representation to use IEEE 754
     * double precision float.
     *
     * @returns The read number.
     */
    readU8le() {
        this.ensureBytesLeft(8)
        const v1 = this.readU4le()
        const v2 = this.readU4le()
        return 0x100000000 * v2 + v1
    }

    // ========================================================================
    // Floating point numbers
    // ========================================================================

    // ------------------------------------------------------------------------
    // Big endian
    // ------------------------------------------------------------------------

    /**
     * Reads a 32-bit big-endian float from the stream.
     *
     * @returns The read number.
     */
    readF4be() {
        this.ensureBytesLeft(4)
        const v = this._dataView.getFloat32(this.pos)
        this.pos += 4
        return v
    }

    /**
     * Reads a 64-bit big-endian float from the stream.
     *
     * @returns The read number.
     */
    readF8be() {
        this.ensureBytesLeft(8)
        const v = this._dataView.getFloat64(this.pos)
        this.pos += 8
        return v
    }

    // ------------------------------------------------------------------------
    // Little endian
    // ------------------------------------------------------------------------

    /**
     * Reads a 32-bit little-endian float from the stream.
     *
     * @returns The read number.
     */
    readF4le() {
        this.ensureBytesLeft(4)
        const v = this._dataView.getFloat32(this.pos, true)
        this.pos += 4
        return v
    }

    /**
     * Reads a 64-bit little-endian float from the stream.
     *
     * @returns The read number.
     */
    readF8le() {
        this.ensureBytesLeft(8)
        const v = this._dataView.getFloat64(this.pos, true)
        this.pos += 8
        return v
    }

    // ------------------------------------------------------------------------
    // Unaligned bit values
    // ------------------------------------------------------------------------

    /**
     * Aligns the stream position to the next byte boundary.
     */
    alignToByte() {
        this.bitsLeft = 0
        this.bits = 0
    }

    /**
     * @param {number} n The number of bits to read.
     * @returns The read bits.
     * @throws {RangeError}
     */
    readBitsIntBe(n) {
        // JS only supports bit operations on 32 bits
        if (n > 32) {
            throw new RangeError(
                "readBitsIntBe: the maximum supported bit length is 32 (tried to read " +
                n +
                " bits)"
            )
        }
        let res = 0

        const bitsNeeded = n - this.bitsLeft
        this.bitsLeft = -bitsNeeded & 7 // `-bitsNeeded mod 8`

        if (bitsNeeded > 0) {
            // 1 bit  => 1 byte
            // 8 bits => 1 byte
            // 9 bits => 2 bytes
            const bytesNeeded = ((bitsNeeded - 1) >> 3) + 1 // `ceil(bitsNeeded / 8)` (NB: `x >> 3` is `floor(x / 8)`)
            const buf = this.readBytes(bytesNeeded)
            for (let i = 0; i < bytesNeeded; i++) {
                res = (res << 8) | buf[i]
            }

            const newBits = res
            res = (res >>> this.bitsLeft) | (this.bits << bitsNeeded) // `x << 32` is defined as `x << 0` in JS, but only `0 << 32`
            // can occur here (`n = 32` and `bitsLeft = 0`, this implies
            // `bits = 0` unless changed externally)
            this.bits = newBits // will be masked at the end of the function
        } else {
            res = this.bits >>> -bitsNeeded // shift unneeded bits out
        }

        const mask = (1 << this.bitsLeft) - 1 // `bitsLeft` is in range 0..7, so `(1 << 32)` does not have to be considered
        this.bits &= mask

        // always return an unsigned 32-bit integer
        return res >>> 0
    }

    /**
     * Unused since Kaitai Struct Compiler v0.9+ - compatibility with older versions.
     *
     * @deprecated Use {@link readBitsIntBe} instead.
     * @param n The number of bits to read.
     * @returns The read bits.
     */
    readBitsInt(n) {
        return this.readBitsIntBe(n)
    }

    /**
     * @param n The number of bits to read.
     * @returns The read bits.
     * @throws {RangeError}
     */
    readBitsIntLe(n) {
        // JS only supports bit operations on 32 bits
        if (n > 32) {
            throw new RangeError(
                "readBitsIntLe: the maximum supported bit length is 32 (tried to read " +
                n +
                " bits)"
            )
        }
        let res = 0
        const bitsNeeded = n - this.bitsLeft

        if (bitsNeeded > 0) {
            // 1 bit  => 1 byte
            // 8 bits => 1 byte
            // 9 bits => 2 bytes
            const bytesNeeded = ((bitsNeeded - 1) >> 3) + 1 // `ceil(bitsNeeded / 8)` (NB: `x >> 3` is `floor(x / 8)`)
            const buf = this.readBytes(bytesNeeded)
            for (let i = 0; i < bytesNeeded; i++) {
                res |= buf[i] << (i * 8)
            }

            // NB: in JavaScript, bit shift operators always shift by modulo 32 of the right-hand operand (see
            // https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-unsignedRightShift),
            // so `res >>> 32` is equivalent to `res >>> 0` (but we don't want that)
            const newBits = bitsNeeded < 32 ? res >>> bitsNeeded : 0
            res = (res << this.bitsLeft) | this.bits
            this.bits = newBits
        } else {
            res = this.bits
            this.bits >>>= n
        }

        this.bitsLeft = -bitsNeeded & 7 // `-bitsNeeded mod 8`

        // always return an unsigned 32-bit integer
        if (n < 32) {
            const mask = (1 << n) - 1
            res &= mask // this produces a signed 32-bit int, but the sign bit is cleared
        } else {
            res >>>= 0
        }
        return res
    }

    /**
     * Native endianness. Either KaitaiStream.BIG_ENDIAN or KaitaiStream.LITTLE_ENDIAN
     * depending on the platform endianness.
     */
    static endianness = new Int8Array(new Int16Array([1]).buffer)[0] > 0

    // ========================================================================
    // Byte arrays
    // ========================================================================

    /**
     * @param len The number of bytes to read.
     * @returns The read bytes.
     */
    readBytes(len) {
        return this.mapUint8Array(len)
    }

    /**
     * @returns The read bytes.
     */
    readBytesFull() {
        return this.mapUint8Array(this.size - this.pos)
    }

    /**
     * Reads bytes until the terminator byte is found.
     *
     * @param terminator The terminator byte.
     * @param include True if the terminator should be included with the returned bytes.
     * @param consume True if the terminator should be consumed from the input stream.
     * @param eosError True to throw an error if the end of stream is reached.
     * @returns The read bytes.
     * @throws {string}
     */
    readBytesTerm(terminator, include, consume, eosError) {
        const blen = this.size - this.pos
        const u8 = new Uint8Array(this._buffer, this._byteOffset + this.pos)
        let i
        for (i = 0; i < blen && u8[i] !== terminator; i++); // find first zero byte
        if (i === blen) {
            // we've read all the buffer and haven't found the terminator
            if (eosError) {
                throw "End of stream reached, but no terminator " +
                terminator +
                " found"
            } else {
                return this.mapUint8Array(i)
            }
        } else {
            let arr
            if (include) {
                arr = this.mapUint8Array(i + 1)
            } else {
                arr = this.mapUint8Array(i)
            }
            if (consume) {
                this.pos += 1
            }
            return arr
        }
    }

    /**
     * Reads bytes until the terminator byte sequence is found.
     *
     * @param terminator The terminator byte sequence.
     * @param include True if the terminator should be included with the returned bytes.
     * @param consume True if the terminator should be consumed from the input stream.
     * @param eosError True to throw an error if the end of stream is reached.
     * @returns The read bytes.
     * @throws {string}
     */
    readBytesTermMulti(terminator, include, consume, eosError) {
        const unitSize = terminator.length
        const data = new Uint8Array(
            this._buffer,
            this._byteOffset + this.pos,
            this.size - this.pos
        )
        let res = KaitaiStream.bytesTerminateMulti(data, terminator, true)
        this.pos += res.length
        const termFound =
            res.length !== 0 &&
            res.length % unitSize === 0 &&
            KaitaiStream.byteArrayCompare(
                new Uint8Array(res.buffer, res.length - unitSize),
                terminator
            ) === 0
        if (termFound) {
            if (!include) {
                res = new Uint8Array(res.buffer, res.byteOffset, res.length - unitSize)
            }
            if (!consume) {
                this.pos -= unitSize
            }
        } else if (eosError) {
            throw new Error(
                "End of stream reached, but no terminator " + terminator + " found"
            )
        }
        return res
    }

    /**
     * Unused since Kaitai Struct Compiler v0.9+ - compatibility with older versions.
     *
     * @param expected The expected bytes.
     * @returns The read bytes.
     * @throws {KaitaiStream.UnexpectedDataError}
     */
    ensureFixedContents(expected) {
        const actual = this.readBytes(expected.length)
        if (actual.length !== expected.length) {
            throw new KaitaiStream.UnexpectedDataError(expected, actual)
        }
        const actLen = actual.length
        for (let i = 0; i < actLen; i++) {
            if (actual[i] !== expected[i]) {
                throw new KaitaiStream.UnexpectedDataError(expected, actual)
            }
        }
        return actual
    }

    /**
     * @param data The data.
     * @param padByte The byte to strip.
     * @returns The stripped data.
     */
    static bytesStripRight(data, padByte) {
        let newLen = data.length
        while (data[newLen - 1] === padByte) {
            newLen--
        }
        return data.slice(0, newLen)
    }

    /**
     * @param data The data.
     * @param term The terminator.
     * @param include True if the returned bytes should include the terminator.
     * @returns The terminated bytes.
     */
    static bytesTerminate(data, term, include) {
        let newLen = 0
        const maxLen = data.length
        while (newLen < maxLen && data[newLen] !== term) {
            newLen++
        }
        if (include && newLen < maxLen) newLen++
        return data.slice(0, newLen)
    }

    /**
     * @param data The data.
     * @param term The terminator.
     * @param include True if the returned bytes should include the terminator.
     * @returns The terminated bytes.
     */
    static bytesTerminateMulti(data, term, include) {
        const unitSize = term.length
        if (unitSize === 0) {
            return new Uint8Array()
        }
        const len = data.length
        let iTerm = 0
        for (let iData = 0; iData < len;) {
            if (data[iData] !== term[iTerm]) {
                iData += unitSize - iTerm
                iTerm = 0
                continue
            }
            iData++
            iTerm++
            if (iTerm === unitSize) {
                return data.slice(0, iData - (include ? 0 : unitSize))
            }
        }
        return data.slice()
    }

    /**
     * @param arr The bytes.
     * @param encoding The character encoding.
     * @returns {string} The decoded string.
     */
    static bytesToStr(arr, encoding) {
        if (encoding == null || encoding.toLowerCase() === "ascii") {
            return KaitaiStream.createStringFromArray(arr)
        } else {
            if (typeof TextDecoder === "function") {
                // we're in a browser that supports TextDecoder, or in Node.js 11 or later
                return new TextDecoder(encoding).decode(arr)
            } else {
                // probably we're in Node.js < 11

                // check if it's supported natively by Node.js Buffer
                // see https://nodejs.org/docs/latest-v10.x/api/buffer.html#buffer_buffers_and_character_encodings
                switch (encoding.toLowerCase()) {
                    case "utf8":
                    case "utf-8":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return Buffer.from(arr).toString(encoding)
                    default:
                        // unsupported encoding, we'll have to resort to iconv-lite
                        if (typeof KaitaiStream.iconvlite === "undefined")
                            KaitaiStream.iconvlite = require("iconv-lite")

                        return KaitaiStream.iconvlite.decode(arr, encoding)
                }
            }
        }
    }

    // ========================================================================
    // Byte array processing
    // ========================================================================

    /**
     * @param data The input bytes.
     * @param key The key byte.
     * @returns The Xor'd bytes.
     */
    static processXorOne(data, key) {
        const r = new Uint8Array(data.length)
        const dl = data.length
        for (let i = 0; i < dl; i++) r[i] = data[i] ^ key
        return r
    }

    /**
     * @param data The input bytes.
     * @param key The key bytes.
     * @returns The Xor'd bytes.
     */
    static processXorMany(data, key) {
        const dl = data.length
        const r = new Uint8Array(dl)
        const kl = key.length
        let ki = 0
        for (let i = 0; i < dl; i++) {
            r[i] = data[i] ^ key[ki]
            ki++
            if (ki >= kl) ki = 0
        }
        return r
    }

    /**
     * @param data The input bytes.
     * @param amount The shift amount in bits.
     * @param groupSize The number of bytes in each group.
     * @returns The rotated bytes.
     * @throws {string}
     */
    static processRotateLeft(data, amount, groupSize) {
        if (groupSize !== 1)
            throw "unable to rotate group of " + groupSize + " bytes yet"

        const mask = groupSize * 8 - 1
        const antiAmount = -amount & mask

        const r = new Uint8Array(data.length)
        for (let i = 0; i < data.length; i++)
            r[i] = ((data[i] << amount) & 0xff) | (data[i] >> antiAmount)

        return r
    }

    /**
     * @param buf The input bytes.
     * @returns The uncompressed bytes.
     */
    static processZlib(buf) {
        if (typeof require !== "undefined") {
            // require is available - we're running under node
            if (typeof KaitaiStream.zlib === "undefined")
                KaitaiStream.zlib = require("zlib")
            // use node's zlib module API
            const r = KaitaiStream.zlib.inflateSync(
                Buffer.from(
                    buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
                )
            )
            return new Uint8Array(r.buffer, r.byteOffset, r.length)
        } else {
            // no require() - assume we're running as a web worker in browser.
            // user should have configured KaitaiStream.depUrls.zlib, if not
            // we'll throw.
            if (
                typeof KaitaiStream.zlib === "undefined" &&
                typeof KaitaiStream.depUrls.zlib !== "undefined"
            ) {
                importScripts(KaitaiStream.depUrls.zlib)
                KaitaiStream.zlib = pako
            }
            // use pako API
            return KaitaiStream.zlib.inflate(buf)
        }
    }

    // ========================================================================
    // Misc runtime operations
    // ========================================================================

    /**
     * @param a The dividend.
     * @param b The divisor.
     * @returns The result of `a` mod `b`.
     * @throws {string}
     */
    static mod(a, b) {
        if (b <= 0) throw "mod divisor <= 0"
        let r = a % b
        if (r < 0) r += b
        return r
    }

    /**
     * Gets the smallest value in an array.
     *
     * @param arr The input array.
     * @returns The smallest value.
     */
    static arrayMin(arr) {
        let min = arr[0]
        let x
        for (let i = 1, n = arr.length; i < n; ++i) {
            x = arr[i]
            if (x < min) min = x
        }
        return min
    }

    /**
     * Gets the largest value in an array.
     *
     * @param arr The input array.
     * @returns The largest value.
     */
    static arrayMax(arr) {
        let max = arr[0]
        let x
        for (let i = 1, n = arr.length; i < n; ++i) {
            x = arr[i]
            if (x > max) max = x
        }
        return max
    }

    /**
     * Compares two arrays of bytes from left to right.
     *
     * @param a The first array.
     * @param b The second array.
     * @returns `0` if the arrays are the equal, a positive number if `a` is greater than `b`, or a negative number if `a` is less than `b`.
     */
    static byteArrayCompare(a, b) {
        if (a === b) return 0
        const al = a.length
        const bl = b.length
        const minLen = al < bl ? al : bl
        for (let i = 0; i < minLen; i++) {
            const cmp = a[i] - b[i]
            if (cmp !== 0) return cmp
        }

        // Reached the end of at least one of the arrays
        if (al === bl) {
            return 0
        } else {
            return al - bl
        }
    }

    // ========================================================================
    // Internal implementation details
    // ========================================================================

    static EOFError = class EOFError extends Error {
        name = "EOFError"

        /**
         * @param bytesReq The number of bytes requested.
         * @param bytesAvail The number of bytes available.
         */
        constructor(bytesReq, bytesAvail) {
            super(
                "requested " +
                bytesReq +
                " bytes, but only " +
                bytesAvail +
                " bytes available"
            )
            // Workaround https://www.typescriptlang.org/docs/handbook/2/classes.html#inheriting-built-in-types
            Object.setPrototypeOf(this, KaitaiStream.EOFError.prototype)
            this.bytesReq = bytesReq
            this.bytesAvail = bytesAvail
        }
    }

    /**
     * Unused since Kaitai Struct Compiler v0.9+ - compatibility with older versions.
     */
    static UnexpectedDataError = class UnexpectedDataError extends Error {
        name = "UnexpectedDataError"

        /**
         * @param expected The expected value.
         * @param actual The actual value.
         */
        constructor(expected, actual) {
            super("expected [" + expected + "], but got [" + actual + "]")
            // Workaround https://www.typescriptlang.org/docs/handbook/2/classes.html#inheriting-built-in-types
            Object.setPrototypeOf(this, KaitaiStream.UnexpectedDataError.prototype)
            this.expected = expected
            this.actual = actual
        }
    }

    static UndecidedEndiannessError = class UndecidedEndiannessError extends Error {
        name = "UndecidedEndiannessError"

        constructor() {
            super()
            // Workaround https://www.typescriptlang.org/docs/handbook/2/classes.html#inheriting-built-in-types
            Object.setPrototypeOf(
                this,
                KaitaiStream.UndecidedEndiannessError.prototype
            )
        }
    }

    static ValidationNotEqualError = class ValidationNotEqualError extends Error {
        name = "ValidationNotEqualError"

        /**
         * @param expected The expected value.
         * @param actual The actual value.
         */
        constructor(expected, actual) {
            super("not equal, expected [" + expected + "], but got [" + actual + "]")
            // Workaround https://www.typescriptlang.org/docs/handbook/2/classes.html#inheriting-built-in-types
            Object.setPrototypeOf(
                this,
                KaitaiStream.ValidationNotEqualError.prototype
            )
            this.expected = expected
            this.actual = actual
        }
    }

    static ValidationLessThanError = class ValidationLessThanError extends Error {
        name = "ValidationLessThanError"

        /**
         * @param min The minimum allowed value.
         * @param actual The actual value.
         */
        constructor(min, actual) {
            super("not in range, min [" + min + "], but got [" + actual + "]")
            // Workaround https://www.typescriptlang.org/docs/handbook/2/classes.html#inheriting-built-in-types
            Object.setPrototypeOf(
                this,
                KaitaiStream.ValidationLessThanError.prototype
            )
            this.min = min
            this.actual = actual
        }
    }

    static ValidationGreaterThanError = class ValidationGreaterThanError extends Error {
        name = "ValidationGreaterThanError"

        /**
         * @param max The maximum allowed value.
         * @param actual The actual value.
         */
        constructor(max, actual) {
            super("not in range, max [" + max + "], but got [" + actual + "]")
            // Workaround https://www.typescriptlang.org/docs/handbook/2/classes.html#inheriting-built-in-types
            Object.setPrototypeOf(
                this,
                KaitaiStream.ValidationGreaterThanError.prototype
            )
            this.max = max
            this.actual = actual
        }
    }

    static ValidationNotAnyOfError = class ValidationNotAnyOfError extends Error {
        name = "ValidationNotAnyOfError"

        /**
         * @param actual The actual value.
         */
        constructor(actual) {
            super("not any of the list, got [" + actual + "]")
            // Workaround https://www.typescriptlang.org/docs/handbook/2/classes.html#inheriting-built-in-types
            Object.setPrototypeOf(
                this,
                KaitaiStream.ValidationNotAnyOfError.prototype
            )
            this.actual = actual
        }
    }

    static ValidationNotInEnumError = class ValidationNotInEnumError extends Error {
        name = "ValidationNotInEnumError"

        /**
         * @param actual The actual value.
         */
        constructor(actual) {
            super("not in the enum, got [" + actual + "]")
            // Workaround https://www.typescriptlang.org/docs/handbook/2/classes.html#inheriting-built-in-types
            Object.setPrototypeOf(
                this,
                KaitaiStream.ValidationNotInEnumError.prototype
            )
            this.actual = actual
        }
    }

    static ValidationExprError = class ValidationExprError extends Error {
        name = "ValidationExprError"

        /**
         * @param actual The actual value.
         */
        constructor(actual) {
            super("not matching the expression, got [" + actual + "]")
            // Workaround https://www.typescriptlang.org/docs/handbook/2/classes.html#inheriting-built-in-types
            Object.setPrototypeOf(this, KaitaiStream.ValidationExprError.prototype)
            this.actual = actual
        }
    }

    /**
     * Ensures that we have at least `length` bytes left in the stream.
     * If not, throws an EOFError.
     *
     * @param length Number of bytes to require.
     * @throws {KaitaiStream.EOFError}
     */
    ensureBytesLeft(length) {
        if (this.pos + length > this.size) {
            throw new KaitaiStream.EOFError(length, this.size - this.pos)
        }
    }

    /**
     * Maps a Uint8Array into the KaitaiStream buffer.
     * Nice for quickly reading in data.
     *
     * @param length Number of elements to map.
     * @returns A Uint8Array to the KaitaiStream backing buffer.
     */
    mapUint8Array(length) {
        length |= 0

        this.ensureBytesLeft(length)

        const arr = new Uint8Array(this._buffer, this.byteOffset + this.pos, length)
        this.pos += length
        return arr
    }

    /**
     * Creates an array from an array of character codes.
     * Uses String.fromCharCode in chunks for memory efficiency and then concatenates
     * the resulting string chunks.
     *
     * @param array Array of character codes.
     * @returns String created from the character codes.
     */
    static createStringFromArray(array) {
        const chunk_size = 0x8000
        const chunks = []
        for (let i = 0; i < array.length; i += chunk_size) {
            const chunk = array.subarray(i, i + chunk_size)
            chunks.push(String.fromCharCode.apply(null, chunk))
        }
        return chunks.join("")
    }
}
