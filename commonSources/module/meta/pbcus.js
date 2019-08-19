/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "./protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const ClassicalModeLevelMeta = $root.ClassicalModeLevelMeta = (() => {

    /**
     * Properties of a ClassicalModeLevelMeta.
     * @exports IClassicalModeLevelMeta
     * @interface IClassicalModeLevelMeta
     * @property {number} level ClassicalModeLevelMeta level
     * @property {number} goldBulletNum ClassicalModeLevelMeta goldBulletNum
     */

    /**
     * Constructs a new ClassicalModeLevelMeta.
     * @exports ClassicalModeLevelMeta
     * @classdesc Represents a ClassicalModeLevelMeta.
     * @implements IClassicalModeLevelMeta
     * @constructor
     * @param {IClassicalModeLevelMeta=} [properties] Properties to set
     */
    function ClassicalModeLevelMeta(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ClassicalModeLevelMeta level.
     * @member {number} level
     * @memberof ClassicalModeLevelMeta
     * @instance
     */
    ClassicalModeLevelMeta.prototype.level = 0;

    /**
     * ClassicalModeLevelMeta goldBulletNum.
     * @member {number} goldBulletNum
     * @memberof ClassicalModeLevelMeta
     * @instance
     */
    ClassicalModeLevelMeta.prototype.goldBulletNum = 0;

    /**
     * Creates a new ClassicalModeLevelMeta instance using the specified properties.
     * @function create
     * @memberof ClassicalModeLevelMeta
     * @static
     * @param {IClassicalModeLevelMeta=} [properties] Properties to set
     * @returns {ClassicalModeLevelMeta} ClassicalModeLevelMeta instance
     */
    ClassicalModeLevelMeta.create = function create(properties) {
        return new ClassicalModeLevelMeta(properties);
    };

    /**
     * Encodes the specified ClassicalModeLevelMeta message. Does not implicitly {@link ClassicalModeLevelMeta.verify|verify} messages.
     * @function encode
     * @memberof ClassicalModeLevelMeta
     * @static
     * @param {IClassicalModeLevelMeta} message ClassicalModeLevelMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClassicalModeLevelMeta.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.level);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.goldBulletNum);
        return writer;
    };

    /**
     * Encodes the specified ClassicalModeLevelMeta message, length delimited. Does not implicitly {@link ClassicalModeLevelMeta.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ClassicalModeLevelMeta
     * @static
     * @param {IClassicalModeLevelMeta} message ClassicalModeLevelMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClassicalModeLevelMeta.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ClassicalModeLevelMeta message from the specified reader or buffer.
     * @function decode
     * @memberof ClassicalModeLevelMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ClassicalModeLevelMeta} ClassicalModeLevelMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClassicalModeLevelMeta.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ClassicalModeLevelMeta();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.level = reader.int32();
                break;
            case 2:
                message.goldBulletNum = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("level"))
            throw $util.ProtocolError("missing required 'level'", { instance: message });
        if (!message.hasOwnProperty("goldBulletNum"))
            throw $util.ProtocolError("missing required 'goldBulletNum'", { instance: message });
        return message;
    };

    /**
     * Decodes a ClassicalModeLevelMeta message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ClassicalModeLevelMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ClassicalModeLevelMeta} ClassicalModeLevelMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClassicalModeLevelMeta.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ClassicalModeLevelMeta message.
     * @function verify
     * @memberof ClassicalModeLevelMeta
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ClassicalModeLevelMeta.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.level))
            return "level: integer expected";
        if (!$util.isInteger(message.goldBulletNum))
            return "goldBulletNum: integer expected";
        return null;
    };

    /**
     * Creates a ClassicalModeLevelMeta message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ClassicalModeLevelMeta
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ClassicalModeLevelMeta} ClassicalModeLevelMeta
     */
    ClassicalModeLevelMeta.fromObject = function fromObject(object) {
        if (object instanceof $root.ClassicalModeLevelMeta)
            return object;
        let message = new $root.ClassicalModeLevelMeta();
        if (object.level != null)
            message.level = object.level | 0;
        if (object.goldBulletNum != null)
            message.goldBulletNum = object.goldBulletNum | 0;
        return message;
    };

    /**
     * Creates a plain object from a ClassicalModeLevelMeta message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ClassicalModeLevelMeta
     * @static
     * @param {ClassicalModeLevelMeta} message ClassicalModeLevelMeta
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ClassicalModeLevelMeta.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.level = 0;
            object.goldBulletNum = 0;
        }
        if (message.level != null && message.hasOwnProperty("level"))
            object.level = message.level;
        if (message.goldBulletNum != null && message.hasOwnProperty("goldBulletNum"))
            object.goldBulletNum = message.goldBulletNum;
        return object;
    };

    /**
     * Converts this ClassicalModeLevelMeta to JSON.
     * @function toJSON
     * @memberof ClassicalModeLevelMeta
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ClassicalModeLevelMeta.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ClassicalModeLevelMeta;
})();

export const CoinRewardMeta = $root.CoinRewardMeta = (() => {

    /**
     * Properties of a CoinRewardMeta.
     * @exports ICoinRewardMeta
     * @interface ICoinRewardMeta
     * @property {number} rewardNum CoinRewardMeta rewardNum
     */

    /**
     * Constructs a new CoinRewardMeta.
     * @exports CoinRewardMeta
     * @classdesc Represents a CoinRewardMeta.
     * @implements ICoinRewardMeta
     * @constructor
     * @param {ICoinRewardMeta=} [properties] Properties to set
     */
    function CoinRewardMeta(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CoinRewardMeta rewardNum.
     * @member {number} rewardNum
     * @memberof CoinRewardMeta
     * @instance
     */
    CoinRewardMeta.prototype.rewardNum = 0;

    /**
     * Creates a new CoinRewardMeta instance using the specified properties.
     * @function create
     * @memberof CoinRewardMeta
     * @static
     * @param {ICoinRewardMeta=} [properties] Properties to set
     * @returns {CoinRewardMeta} CoinRewardMeta instance
     */
    CoinRewardMeta.create = function create(properties) {
        return new CoinRewardMeta(properties);
    };

    /**
     * Encodes the specified CoinRewardMeta message. Does not implicitly {@link CoinRewardMeta.verify|verify} messages.
     * @function encode
     * @memberof CoinRewardMeta
     * @static
     * @param {ICoinRewardMeta} message CoinRewardMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CoinRewardMeta.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.rewardNum);
        return writer;
    };

    /**
     * Encodes the specified CoinRewardMeta message, length delimited. Does not implicitly {@link CoinRewardMeta.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CoinRewardMeta
     * @static
     * @param {ICoinRewardMeta} message CoinRewardMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CoinRewardMeta.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CoinRewardMeta message from the specified reader or buffer.
     * @function decode
     * @memberof CoinRewardMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CoinRewardMeta} CoinRewardMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CoinRewardMeta.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CoinRewardMeta();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.rewardNum = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("rewardNum"))
            throw $util.ProtocolError("missing required 'rewardNum'", { instance: message });
        return message;
    };

    /**
     * Decodes a CoinRewardMeta message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CoinRewardMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CoinRewardMeta} CoinRewardMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CoinRewardMeta.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CoinRewardMeta message.
     * @function verify
     * @memberof CoinRewardMeta
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CoinRewardMeta.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.rewardNum))
            return "rewardNum: integer expected";
        return null;
    };

    /**
     * Creates a CoinRewardMeta message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CoinRewardMeta
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CoinRewardMeta} CoinRewardMeta
     */
    CoinRewardMeta.fromObject = function fromObject(object) {
        if (object instanceof $root.CoinRewardMeta)
            return object;
        let message = new $root.CoinRewardMeta();
        if (object.rewardNum != null)
            message.rewardNum = object.rewardNum | 0;
        return message;
    };

    /**
     * Creates a plain object from a CoinRewardMeta message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CoinRewardMeta
     * @static
     * @param {CoinRewardMeta} message CoinRewardMeta
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CoinRewardMeta.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.rewardNum = 0;
        if (message.rewardNum != null && message.hasOwnProperty("rewardNum"))
            object.rewardNum = message.rewardNum;
        return object;
    };

    /**
     * Converts this CoinRewardMeta to JSON.
     * @function toJSON
     * @memberof CoinRewardMeta
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CoinRewardMeta.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CoinRewardMeta;
})();

export const EnergyMeta = $root.EnergyMeta = (() => {

    /**
     * Properties of an EnergyMeta.
     * @exports IEnergyMeta
     * @interface IEnergyMeta
     * @property {number} initialNum EnergyMeta initialNum
     * @property {number} upperLimit EnergyMeta upperLimit
     * @property {number} recoverInterval EnergyMeta recoverInterval
     * @property {number} recoverNum EnergyMeta recoverNum
     * @property {number} energyExchange EnergyMeta energyExchange
     * @property {number} goldenergyExchange EnergyMeta goldenergyExchange
     * @property {number} goldPrice EnergyMeta goldPrice
     */

    /**
     * Constructs a new EnergyMeta.
     * @exports EnergyMeta
     * @classdesc Represents an EnergyMeta.
     * @implements IEnergyMeta
     * @constructor
     * @param {IEnergyMeta=} [properties] Properties to set
     */
    function EnergyMeta(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * EnergyMeta initialNum.
     * @member {number} initialNum
     * @memberof EnergyMeta
     * @instance
     */
    EnergyMeta.prototype.initialNum = 0;

    /**
     * EnergyMeta upperLimit.
     * @member {number} upperLimit
     * @memberof EnergyMeta
     * @instance
     */
    EnergyMeta.prototype.upperLimit = 0;

    /**
     * EnergyMeta recoverInterval.
     * @member {number} recoverInterval
     * @memberof EnergyMeta
     * @instance
     */
    EnergyMeta.prototype.recoverInterval = 0;

    /**
     * EnergyMeta recoverNum.
     * @member {number} recoverNum
     * @memberof EnergyMeta
     * @instance
     */
    EnergyMeta.prototype.recoverNum = 0;

    /**
     * EnergyMeta energyExchange.
     * @member {number} energyExchange
     * @memberof EnergyMeta
     * @instance
     */
    EnergyMeta.prototype.energyExchange = 0;

    /**
     * EnergyMeta goldenergyExchange.
     * @member {number} goldenergyExchange
     * @memberof EnergyMeta
     * @instance
     */
    EnergyMeta.prototype.goldenergyExchange = 0;

    /**
     * EnergyMeta goldPrice.
     * @member {number} goldPrice
     * @memberof EnergyMeta
     * @instance
     */
    EnergyMeta.prototype.goldPrice = 0;

    /**
     * Creates a new EnergyMeta instance using the specified properties.
     * @function create
     * @memberof EnergyMeta
     * @static
     * @param {IEnergyMeta=} [properties] Properties to set
     * @returns {EnergyMeta} EnergyMeta instance
     */
    EnergyMeta.create = function create(properties) {
        return new EnergyMeta(properties);
    };

    /**
     * Encodes the specified EnergyMeta message. Does not implicitly {@link EnergyMeta.verify|verify} messages.
     * @function encode
     * @memberof EnergyMeta
     * @static
     * @param {IEnergyMeta} message EnergyMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EnergyMeta.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.initialNum);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.upperLimit);
        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.recoverInterval);
        writer.uint32(/* id 4, wireType 0 =*/32).int32(message.recoverNum);
        writer.uint32(/* id 5, wireType 0 =*/40).int32(message.energyExchange);
        writer.uint32(/* id 6, wireType 0 =*/48).int32(message.goldenergyExchange);
        writer.uint32(/* id 7, wireType 0 =*/56).int32(message.goldPrice);
        return writer;
    };

    /**
     * Encodes the specified EnergyMeta message, length delimited. Does not implicitly {@link EnergyMeta.verify|verify} messages.
     * @function encodeDelimited
     * @memberof EnergyMeta
     * @static
     * @param {IEnergyMeta} message EnergyMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EnergyMeta.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an EnergyMeta message from the specified reader or buffer.
     * @function decode
     * @memberof EnergyMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {EnergyMeta} EnergyMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EnergyMeta.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EnergyMeta();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.initialNum = reader.int32();
                break;
            case 2:
                message.upperLimit = reader.int32();
                break;
            case 3:
                message.recoverInterval = reader.int32();
                break;
            case 4:
                message.recoverNum = reader.int32();
                break;
            case 5:
                message.energyExchange = reader.int32();
                break;
            case 6:
                message.goldenergyExchange = reader.int32();
                break;
            case 7:
                message.goldPrice = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("initialNum"))
            throw $util.ProtocolError("missing required 'initialNum'", { instance: message });
        if (!message.hasOwnProperty("upperLimit"))
            throw $util.ProtocolError("missing required 'upperLimit'", { instance: message });
        if (!message.hasOwnProperty("recoverInterval"))
            throw $util.ProtocolError("missing required 'recoverInterval'", { instance: message });
        if (!message.hasOwnProperty("recoverNum"))
            throw $util.ProtocolError("missing required 'recoverNum'", { instance: message });
        if (!message.hasOwnProperty("energyExchange"))
            throw $util.ProtocolError("missing required 'energyExchange'", { instance: message });
        if (!message.hasOwnProperty("goldenergyExchange"))
            throw $util.ProtocolError("missing required 'goldenergyExchange'", { instance: message });
        if (!message.hasOwnProperty("goldPrice"))
            throw $util.ProtocolError("missing required 'goldPrice'", { instance: message });
        return message;
    };

    /**
     * Decodes an EnergyMeta message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof EnergyMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {EnergyMeta} EnergyMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EnergyMeta.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an EnergyMeta message.
     * @function verify
     * @memberof EnergyMeta
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    EnergyMeta.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.initialNum))
            return "initialNum: integer expected";
        if (!$util.isInteger(message.upperLimit))
            return "upperLimit: integer expected";
        if (!$util.isInteger(message.recoverInterval))
            return "recoverInterval: integer expected";
        if (!$util.isInteger(message.recoverNum))
            return "recoverNum: integer expected";
        if (!$util.isInteger(message.energyExchange))
            return "energyExchange: integer expected";
        if (!$util.isInteger(message.goldenergyExchange))
            return "goldenergyExchange: integer expected";
        if (!$util.isInteger(message.goldPrice))
            return "goldPrice: integer expected";
        return null;
    };

    /**
     * Creates an EnergyMeta message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof EnergyMeta
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {EnergyMeta} EnergyMeta
     */
    EnergyMeta.fromObject = function fromObject(object) {
        if (object instanceof $root.EnergyMeta)
            return object;
        let message = new $root.EnergyMeta();
        if (object.initialNum != null)
            message.initialNum = object.initialNum | 0;
        if (object.upperLimit != null)
            message.upperLimit = object.upperLimit | 0;
        if (object.recoverInterval != null)
            message.recoverInterval = object.recoverInterval | 0;
        if (object.recoverNum != null)
            message.recoverNum = object.recoverNum | 0;
        if (object.energyExchange != null)
            message.energyExchange = object.energyExchange | 0;
        if (object.goldenergyExchange != null)
            message.goldenergyExchange = object.goldenergyExchange | 0;
        if (object.goldPrice != null)
            message.goldPrice = object.goldPrice | 0;
        return message;
    };

    /**
     * Creates a plain object from an EnergyMeta message. Also converts values to other types if specified.
     * @function toObject
     * @memberof EnergyMeta
     * @static
     * @param {EnergyMeta} message EnergyMeta
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    EnergyMeta.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.initialNum = 0;
            object.upperLimit = 0;
            object.recoverInterval = 0;
            object.recoverNum = 0;
            object.energyExchange = 0;
            object.goldenergyExchange = 0;
            object.goldPrice = 0;
        }
        if (message.initialNum != null && message.hasOwnProperty("initialNum"))
            object.initialNum = message.initialNum;
        if (message.upperLimit != null && message.hasOwnProperty("upperLimit"))
            object.upperLimit = message.upperLimit;
        if (message.recoverInterval != null && message.hasOwnProperty("recoverInterval"))
            object.recoverInterval = message.recoverInterval;
        if (message.recoverNum != null && message.hasOwnProperty("recoverNum"))
            object.recoverNum = message.recoverNum;
        if (message.energyExchange != null && message.hasOwnProperty("energyExchange"))
            object.energyExchange = message.energyExchange;
        if (message.goldenergyExchange != null && message.hasOwnProperty("goldenergyExchange"))
            object.goldenergyExchange = message.goldenergyExchange;
        if (message.goldPrice != null && message.hasOwnProperty("goldPrice"))
            object.goldPrice = message.goldPrice;
        return object;
    };

    /**
     * Converts this EnergyMeta to JSON.
     * @function toJSON
     * @memberof EnergyMeta
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    EnergyMeta.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EnergyMeta;
})();

export const GameMeta = $root.GameMeta = (() => {

    /**
     * Properties of a GameMeta.
     * @exports IGameMeta
     * @interface IGameMeta
     * @property {Array.<IClassicalModeLevelMeta>|null} [classicalModeLevelMeta] GameMeta classicalModeLevelMeta
     * @property {number|Long} metaVer GameMeta metaVer
     * @property {Array.<ISignInMeta>|null} [signInMeta] GameMeta signInMeta
     * @property {Array.<ICoinRewardMeta>|null} [coinRewardMeta] GameMeta coinRewardMeta
     * @property {Array.<IImageUpgradeMeta>|null} [imageUpgradeMeta] GameMeta imageUpgradeMeta
     * @property {Array.<ISettlementRewardMeta>|null} [settlementRewardMeta] GameMeta settlementRewardMeta
     * @property {Array.<IMiniGameMeta>|null} [miniGameMeta] GameMeta miniGameMeta
     * @property {Array.<IWelfareCentreMeta>|null} [welfareCentreMeta] GameMeta welfareCentreMeta
     * @property {Array.<IKeyRewardMeta>|null} [keyRewardMeta] GameMeta keyRewardMeta
     * @property {Array.<INewModeUnlockMeta>|null} [newModeUnlockMeta] GameMeta newModeUnlockMeta
     * @property {Array.<IEnergyMeta>|null} [energyMeta] GameMeta energyMeta
     * @property {Array.<IGrenadeModeLevelMeta>|null} [grenadeModeLevelMeta] GameMeta grenadeModeLevelMeta
     * @property {Array.<IHostageModeLevelMeta>|null} [hostageModeLevelMeta] GameMeta hostageModeLevelMeta
     * @property {Array.<ISurvivalModeLevelMeta>|null} [survivalModeLevelMeta] GameMeta survivalModeLevelMeta
     */

    /**
     * Constructs a new GameMeta.
     * @exports GameMeta
     * @classdesc Represents a GameMeta.
     * @implements IGameMeta
     * @constructor
     * @param {IGameMeta=} [properties] Properties to set
     */
    function GameMeta(properties) {
        this.classicalModeLevelMeta = [];
        this.signInMeta = [];
        this.coinRewardMeta = [];
        this.imageUpgradeMeta = [];
        this.settlementRewardMeta = [];
        this.miniGameMeta = [];
        this.welfareCentreMeta = [];
        this.keyRewardMeta = [];
        this.newModeUnlockMeta = [];
        this.energyMeta = [];
        this.grenadeModeLevelMeta = [];
        this.hostageModeLevelMeta = [];
        this.survivalModeLevelMeta = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GameMeta classicalModeLevelMeta.
     * @member {Array.<IClassicalModeLevelMeta>} classicalModeLevelMeta
     * @memberof GameMeta
     * @instance
     */
    GameMeta.prototype.classicalModeLevelMeta = $util.emptyArray;

    /**
     * GameMeta metaVer.
     * @member {number|Long} metaVer
     * @memberof GameMeta
     * @instance
     */
    GameMeta.prototype.metaVer = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * GameMeta signInMeta.
     * @member {Array.<ISignInMeta>} signInMeta
     * @memberof GameMeta
     * @instance
     */
    GameMeta.prototype.signInMeta = $util.emptyArray;

    /**
     * GameMeta coinRewardMeta.
     * @member {Array.<ICoinRewardMeta>} coinRewardMeta
     * @memberof GameMeta
     * @instance
     */
    GameMeta.prototype.coinRewardMeta = $util.emptyArray;

    /**
     * GameMeta imageUpgradeMeta.
     * @member {Array.<IImageUpgradeMeta>} imageUpgradeMeta
     * @memberof GameMeta
     * @instance
     */
    GameMeta.prototype.imageUpgradeMeta = $util.emptyArray;

    /**
     * GameMeta settlementRewardMeta.
     * @member {Array.<ISettlementRewardMeta>} settlementRewardMeta
     * @memberof GameMeta
     * @instance
     */
    GameMeta.prototype.settlementRewardMeta = $util.emptyArray;

    /**
     * GameMeta miniGameMeta.
     * @member {Array.<IMiniGameMeta>} miniGameMeta
     * @memberof GameMeta
     * @instance
     */
    GameMeta.prototype.miniGameMeta = $util.emptyArray;

    /**
     * GameMeta welfareCentreMeta.
     * @member {Array.<IWelfareCentreMeta>} welfareCentreMeta
     * @memberof GameMeta
     * @instance
     */
    GameMeta.prototype.welfareCentreMeta = $util.emptyArray;

    /**
     * GameMeta keyRewardMeta.
     * @member {Array.<IKeyRewardMeta>} keyRewardMeta
     * @memberof GameMeta
     * @instance
     */
    GameMeta.prototype.keyRewardMeta = $util.emptyArray;

    /**
     * GameMeta newModeUnlockMeta.
     * @member {Array.<INewModeUnlockMeta>} newModeUnlockMeta
     * @memberof GameMeta
     * @instance
     */
    GameMeta.prototype.newModeUnlockMeta = $util.emptyArray;

    /**
     * GameMeta energyMeta.
     * @member {Array.<IEnergyMeta>} energyMeta
     * @memberof GameMeta
     * @instance
     */
    GameMeta.prototype.energyMeta = $util.emptyArray;

    /**
     * GameMeta grenadeModeLevelMeta.
     * @member {Array.<IGrenadeModeLevelMeta>} grenadeModeLevelMeta
     * @memberof GameMeta
     * @instance
     */
    GameMeta.prototype.grenadeModeLevelMeta = $util.emptyArray;

    /**
     * GameMeta hostageModeLevelMeta.
     * @member {Array.<IHostageModeLevelMeta>} hostageModeLevelMeta
     * @memberof GameMeta
     * @instance
     */
    GameMeta.prototype.hostageModeLevelMeta = $util.emptyArray;

    /**
     * GameMeta survivalModeLevelMeta.
     * @member {Array.<ISurvivalModeLevelMeta>} survivalModeLevelMeta
     * @memberof GameMeta
     * @instance
     */
    GameMeta.prototype.survivalModeLevelMeta = $util.emptyArray;

    /**
     * Creates a new GameMeta instance using the specified properties.
     * @function create
     * @memberof GameMeta
     * @static
     * @param {IGameMeta=} [properties] Properties to set
     * @returns {GameMeta} GameMeta instance
     */
    GameMeta.create = function create(properties) {
        return new GameMeta(properties);
    };

    /**
     * Encodes the specified GameMeta message. Does not implicitly {@link GameMeta.verify|verify} messages.
     * @function encode
     * @memberof GameMeta
     * @static
     * @param {IGameMeta} message GameMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameMeta.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.classicalModeLevelMeta != null && message.classicalModeLevelMeta.length)
            for (let i = 0; i < message.classicalModeLevelMeta.length; ++i)
                $root.ClassicalModeLevelMeta.encode(message.classicalModeLevelMeta[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        writer.uint32(/* id 2, wireType 0 =*/16).int64(message.metaVer);
        if (message.signInMeta != null && message.signInMeta.length)
            for (let i = 0; i < message.signInMeta.length; ++i)
                $root.SignInMeta.encode(message.signInMeta[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.coinRewardMeta != null && message.coinRewardMeta.length)
            for (let i = 0; i < message.coinRewardMeta.length; ++i)
                $root.CoinRewardMeta.encode(message.coinRewardMeta[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.imageUpgradeMeta != null && message.imageUpgradeMeta.length)
            for (let i = 0; i < message.imageUpgradeMeta.length; ++i)
                $root.ImageUpgradeMeta.encode(message.imageUpgradeMeta[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.settlementRewardMeta != null && message.settlementRewardMeta.length)
            for (let i = 0; i < message.settlementRewardMeta.length; ++i)
                $root.SettlementRewardMeta.encode(message.settlementRewardMeta[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.miniGameMeta != null && message.miniGameMeta.length)
            for (let i = 0; i < message.miniGameMeta.length; ++i)
                $root.MiniGameMeta.encode(message.miniGameMeta[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.welfareCentreMeta != null && message.welfareCentreMeta.length)
            for (let i = 0; i < message.welfareCentreMeta.length; ++i)
                $root.WelfareCentreMeta.encode(message.welfareCentreMeta[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
        if (message.keyRewardMeta != null && message.keyRewardMeta.length)
            for (let i = 0; i < message.keyRewardMeta.length; ++i)
                $root.KeyRewardMeta.encode(message.keyRewardMeta[i], writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
        if (message.newModeUnlockMeta != null && message.newModeUnlockMeta.length)
            for (let i = 0; i < message.newModeUnlockMeta.length; ++i)
                $root.NewModeUnlockMeta.encode(message.newModeUnlockMeta[i], writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
        if (message.energyMeta != null && message.energyMeta.length)
            for (let i = 0; i < message.energyMeta.length; ++i)
                $root.EnergyMeta.encode(message.energyMeta[i], writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
        if (message.grenadeModeLevelMeta != null && message.grenadeModeLevelMeta.length)
            for (let i = 0; i < message.grenadeModeLevelMeta.length; ++i)
                $root.GrenadeModeLevelMeta.encode(message.grenadeModeLevelMeta[i], writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
        if (message.hostageModeLevelMeta != null && message.hostageModeLevelMeta.length)
            for (let i = 0; i < message.hostageModeLevelMeta.length; ++i)
                $root.HostageModeLevelMeta.encode(message.hostageModeLevelMeta[i], writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
        if (message.survivalModeLevelMeta != null && message.survivalModeLevelMeta.length)
            for (let i = 0; i < message.survivalModeLevelMeta.length; ++i)
                $root.SurvivalModeLevelMeta.encode(message.survivalModeLevelMeta[i], writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified GameMeta message, length delimited. Does not implicitly {@link GameMeta.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GameMeta
     * @static
     * @param {IGameMeta} message GameMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameMeta.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GameMeta message from the specified reader or buffer.
     * @function decode
     * @memberof GameMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GameMeta} GameMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameMeta.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameMeta();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.classicalModeLevelMeta && message.classicalModeLevelMeta.length))
                    message.classicalModeLevelMeta = [];
                message.classicalModeLevelMeta.push($root.ClassicalModeLevelMeta.decode(reader, reader.uint32()));
                break;
            case 2:
                message.metaVer = reader.int64();
                break;
            case 3:
                if (!(message.signInMeta && message.signInMeta.length))
                    message.signInMeta = [];
                message.signInMeta.push($root.SignInMeta.decode(reader, reader.uint32()));
                break;
            case 4:
                if (!(message.coinRewardMeta && message.coinRewardMeta.length))
                    message.coinRewardMeta = [];
                message.coinRewardMeta.push($root.CoinRewardMeta.decode(reader, reader.uint32()));
                break;
            case 5:
                if (!(message.imageUpgradeMeta && message.imageUpgradeMeta.length))
                    message.imageUpgradeMeta = [];
                message.imageUpgradeMeta.push($root.ImageUpgradeMeta.decode(reader, reader.uint32()));
                break;
            case 6:
                if (!(message.settlementRewardMeta && message.settlementRewardMeta.length))
                    message.settlementRewardMeta = [];
                message.settlementRewardMeta.push($root.SettlementRewardMeta.decode(reader, reader.uint32()));
                break;
            case 7:
                if (!(message.miniGameMeta && message.miniGameMeta.length))
                    message.miniGameMeta = [];
                message.miniGameMeta.push($root.MiniGameMeta.decode(reader, reader.uint32()));
                break;
            case 8:
                if (!(message.welfareCentreMeta && message.welfareCentreMeta.length))
                    message.welfareCentreMeta = [];
                message.welfareCentreMeta.push($root.WelfareCentreMeta.decode(reader, reader.uint32()));
                break;
            case 9:
                if (!(message.keyRewardMeta && message.keyRewardMeta.length))
                    message.keyRewardMeta = [];
                message.keyRewardMeta.push($root.KeyRewardMeta.decode(reader, reader.uint32()));
                break;
            case 10:
                if (!(message.newModeUnlockMeta && message.newModeUnlockMeta.length))
                    message.newModeUnlockMeta = [];
                message.newModeUnlockMeta.push($root.NewModeUnlockMeta.decode(reader, reader.uint32()));
                break;
            case 11:
                if (!(message.energyMeta && message.energyMeta.length))
                    message.energyMeta = [];
                message.energyMeta.push($root.EnergyMeta.decode(reader, reader.uint32()));
                break;
            case 12:
                if (!(message.grenadeModeLevelMeta && message.grenadeModeLevelMeta.length))
                    message.grenadeModeLevelMeta = [];
                message.grenadeModeLevelMeta.push($root.GrenadeModeLevelMeta.decode(reader, reader.uint32()));
                break;
            case 13:
                if (!(message.hostageModeLevelMeta && message.hostageModeLevelMeta.length))
                    message.hostageModeLevelMeta = [];
                message.hostageModeLevelMeta.push($root.HostageModeLevelMeta.decode(reader, reader.uint32()));
                break;
            case 14:
                if (!(message.survivalModeLevelMeta && message.survivalModeLevelMeta.length))
                    message.survivalModeLevelMeta = [];
                message.survivalModeLevelMeta.push($root.SurvivalModeLevelMeta.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("metaVer"))
            throw $util.ProtocolError("missing required 'metaVer'", { instance: message });
        return message;
    };

    /**
     * Decodes a GameMeta message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GameMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GameMeta} GameMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameMeta.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GameMeta message.
     * @function verify
     * @memberof GameMeta
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GameMeta.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.classicalModeLevelMeta != null && message.hasOwnProperty("classicalModeLevelMeta")) {
            if (!Array.isArray(message.classicalModeLevelMeta))
                return "classicalModeLevelMeta: array expected";
            for (let i = 0; i < message.classicalModeLevelMeta.length; ++i) {
                let error = $root.ClassicalModeLevelMeta.verify(message.classicalModeLevelMeta[i]);
                if (error)
                    return "classicalModeLevelMeta." + error;
            }
        }
        if (!$util.isInteger(message.metaVer) && !(message.metaVer && $util.isInteger(message.metaVer.low) && $util.isInteger(message.metaVer.high)))
            return "metaVer: integer|Long expected";
        if (message.signInMeta != null && message.hasOwnProperty("signInMeta")) {
            if (!Array.isArray(message.signInMeta))
                return "signInMeta: array expected";
            for (let i = 0; i < message.signInMeta.length; ++i) {
                let error = $root.SignInMeta.verify(message.signInMeta[i]);
                if (error)
                    return "signInMeta." + error;
            }
        }
        if (message.coinRewardMeta != null && message.hasOwnProperty("coinRewardMeta")) {
            if (!Array.isArray(message.coinRewardMeta))
                return "coinRewardMeta: array expected";
            for (let i = 0; i < message.coinRewardMeta.length; ++i) {
                let error = $root.CoinRewardMeta.verify(message.coinRewardMeta[i]);
                if (error)
                    return "coinRewardMeta." + error;
            }
        }
        if (message.imageUpgradeMeta != null && message.hasOwnProperty("imageUpgradeMeta")) {
            if (!Array.isArray(message.imageUpgradeMeta))
                return "imageUpgradeMeta: array expected";
            for (let i = 0; i < message.imageUpgradeMeta.length; ++i) {
                let error = $root.ImageUpgradeMeta.verify(message.imageUpgradeMeta[i]);
                if (error)
                    return "imageUpgradeMeta." + error;
            }
        }
        if (message.settlementRewardMeta != null && message.hasOwnProperty("settlementRewardMeta")) {
            if (!Array.isArray(message.settlementRewardMeta))
                return "settlementRewardMeta: array expected";
            for (let i = 0; i < message.settlementRewardMeta.length; ++i) {
                let error = $root.SettlementRewardMeta.verify(message.settlementRewardMeta[i]);
                if (error)
                    return "settlementRewardMeta." + error;
            }
        }
        if (message.miniGameMeta != null && message.hasOwnProperty("miniGameMeta")) {
            if (!Array.isArray(message.miniGameMeta))
                return "miniGameMeta: array expected";
            for (let i = 0; i < message.miniGameMeta.length; ++i) {
                let error = $root.MiniGameMeta.verify(message.miniGameMeta[i]);
                if (error)
                    return "miniGameMeta." + error;
            }
        }
        if (message.welfareCentreMeta != null && message.hasOwnProperty("welfareCentreMeta")) {
            if (!Array.isArray(message.welfareCentreMeta))
                return "welfareCentreMeta: array expected";
            for (let i = 0; i < message.welfareCentreMeta.length; ++i) {
                let error = $root.WelfareCentreMeta.verify(message.welfareCentreMeta[i]);
                if (error)
                    return "welfareCentreMeta." + error;
            }
        }
        if (message.keyRewardMeta != null && message.hasOwnProperty("keyRewardMeta")) {
            if (!Array.isArray(message.keyRewardMeta))
                return "keyRewardMeta: array expected";
            for (let i = 0; i < message.keyRewardMeta.length; ++i) {
                let error = $root.KeyRewardMeta.verify(message.keyRewardMeta[i]);
                if (error)
                    return "keyRewardMeta." + error;
            }
        }
        if (message.newModeUnlockMeta != null && message.hasOwnProperty("newModeUnlockMeta")) {
            if (!Array.isArray(message.newModeUnlockMeta))
                return "newModeUnlockMeta: array expected";
            for (let i = 0; i < message.newModeUnlockMeta.length; ++i) {
                let error = $root.NewModeUnlockMeta.verify(message.newModeUnlockMeta[i]);
                if (error)
                    return "newModeUnlockMeta." + error;
            }
        }
        if (message.energyMeta != null && message.hasOwnProperty("energyMeta")) {
            if (!Array.isArray(message.energyMeta))
                return "energyMeta: array expected";
            for (let i = 0; i < message.energyMeta.length; ++i) {
                let error = $root.EnergyMeta.verify(message.energyMeta[i]);
                if (error)
                    return "energyMeta." + error;
            }
        }
        if (message.grenadeModeLevelMeta != null && message.hasOwnProperty("grenadeModeLevelMeta")) {
            if (!Array.isArray(message.grenadeModeLevelMeta))
                return "grenadeModeLevelMeta: array expected";
            for (let i = 0; i < message.grenadeModeLevelMeta.length; ++i) {
                let error = $root.GrenadeModeLevelMeta.verify(message.grenadeModeLevelMeta[i]);
                if (error)
                    return "grenadeModeLevelMeta." + error;
            }
        }
        if (message.hostageModeLevelMeta != null && message.hasOwnProperty("hostageModeLevelMeta")) {
            if (!Array.isArray(message.hostageModeLevelMeta))
                return "hostageModeLevelMeta: array expected";
            for (let i = 0; i < message.hostageModeLevelMeta.length; ++i) {
                let error = $root.HostageModeLevelMeta.verify(message.hostageModeLevelMeta[i]);
                if (error)
                    return "hostageModeLevelMeta." + error;
            }
        }
        if (message.survivalModeLevelMeta != null && message.hasOwnProperty("survivalModeLevelMeta")) {
            if (!Array.isArray(message.survivalModeLevelMeta))
                return "survivalModeLevelMeta: array expected";
            for (let i = 0; i < message.survivalModeLevelMeta.length; ++i) {
                let error = $root.SurvivalModeLevelMeta.verify(message.survivalModeLevelMeta[i]);
                if (error)
                    return "survivalModeLevelMeta." + error;
            }
        }
        return null;
    };

    /**
     * Creates a GameMeta message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GameMeta
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GameMeta} GameMeta
     */
    GameMeta.fromObject = function fromObject(object) {
        if (object instanceof $root.GameMeta)
            return object;
        let message = new $root.GameMeta();
        if (object.classicalModeLevelMeta) {
            if (!Array.isArray(object.classicalModeLevelMeta))
                throw TypeError(".GameMeta.classicalModeLevelMeta: array expected");
            message.classicalModeLevelMeta = [];
            for (let i = 0; i < object.classicalModeLevelMeta.length; ++i) {
                if (typeof object.classicalModeLevelMeta[i] !== "object")
                    throw TypeError(".GameMeta.classicalModeLevelMeta: object expected");
                message.classicalModeLevelMeta[i] = $root.ClassicalModeLevelMeta.fromObject(object.classicalModeLevelMeta[i]);
            }
        }
        if (object.metaVer != null)
            if ($util.Long)
                (message.metaVer = $util.Long.fromValue(object.metaVer)).unsigned = false;
            else if (typeof object.metaVer === "string")
                message.metaVer = parseInt(object.metaVer, 10);
            else if (typeof object.metaVer === "number")
                message.metaVer = object.metaVer;
            else if (typeof object.metaVer === "object")
                message.metaVer = new $util.LongBits(object.metaVer.low >>> 0, object.metaVer.high >>> 0).toNumber();
        if (object.signInMeta) {
            if (!Array.isArray(object.signInMeta))
                throw TypeError(".GameMeta.signInMeta: array expected");
            message.signInMeta = [];
            for (let i = 0; i < object.signInMeta.length; ++i) {
                if (typeof object.signInMeta[i] !== "object")
                    throw TypeError(".GameMeta.signInMeta: object expected");
                message.signInMeta[i] = $root.SignInMeta.fromObject(object.signInMeta[i]);
            }
        }
        if (object.coinRewardMeta) {
            if (!Array.isArray(object.coinRewardMeta))
                throw TypeError(".GameMeta.coinRewardMeta: array expected");
            message.coinRewardMeta = [];
            for (let i = 0; i < object.coinRewardMeta.length; ++i) {
                if (typeof object.coinRewardMeta[i] !== "object")
                    throw TypeError(".GameMeta.coinRewardMeta: object expected");
                message.coinRewardMeta[i] = $root.CoinRewardMeta.fromObject(object.coinRewardMeta[i]);
            }
        }
        if (object.imageUpgradeMeta) {
            if (!Array.isArray(object.imageUpgradeMeta))
                throw TypeError(".GameMeta.imageUpgradeMeta: array expected");
            message.imageUpgradeMeta = [];
            for (let i = 0; i < object.imageUpgradeMeta.length; ++i) {
                if (typeof object.imageUpgradeMeta[i] !== "object")
                    throw TypeError(".GameMeta.imageUpgradeMeta: object expected");
                message.imageUpgradeMeta[i] = $root.ImageUpgradeMeta.fromObject(object.imageUpgradeMeta[i]);
            }
        }
        if (object.settlementRewardMeta) {
            if (!Array.isArray(object.settlementRewardMeta))
                throw TypeError(".GameMeta.settlementRewardMeta: array expected");
            message.settlementRewardMeta = [];
            for (let i = 0; i < object.settlementRewardMeta.length; ++i) {
                if (typeof object.settlementRewardMeta[i] !== "object")
                    throw TypeError(".GameMeta.settlementRewardMeta: object expected");
                message.settlementRewardMeta[i] = $root.SettlementRewardMeta.fromObject(object.settlementRewardMeta[i]);
            }
        }
        if (object.miniGameMeta) {
            if (!Array.isArray(object.miniGameMeta))
                throw TypeError(".GameMeta.miniGameMeta: array expected");
            message.miniGameMeta = [];
            for (let i = 0; i < object.miniGameMeta.length; ++i) {
                if (typeof object.miniGameMeta[i] !== "object")
                    throw TypeError(".GameMeta.miniGameMeta: object expected");
                message.miniGameMeta[i] = $root.MiniGameMeta.fromObject(object.miniGameMeta[i]);
            }
        }
        if (object.welfareCentreMeta) {
            if (!Array.isArray(object.welfareCentreMeta))
                throw TypeError(".GameMeta.welfareCentreMeta: array expected");
            message.welfareCentreMeta = [];
            for (let i = 0; i < object.welfareCentreMeta.length; ++i) {
                if (typeof object.welfareCentreMeta[i] !== "object")
                    throw TypeError(".GameMeta.welfareCentreMeta: object expected");
                message.welfareCentreMeta[i] = $root.WelfareCentreMeta.fromObject(object.welfareCentreMeta[i]);
            }
        }
        if (object.keyRewardMeta) {
            if (!Array.isArray(object.keyRewardMeta))
                throw TypeError(".GameMeta.keyRewardMeta: array expected");
            message.keyRewardMeta = [];
            for (let i = 0; i < object.keyRewardMeta.length; ++i) {
                if (typeof object.keyRewardMeta[i] !== "object")
                    throw TypeError(".GameMeta.keyRewardMeta: object expected");
                message.keyRewardMeta[i] = $root.KeyRewardMeta.fromObject(object.keyRewardMeta[i]);
            }
        }
        if (object.newModeUnlockMeta) {
            if (!Array.isArray(object.newModeUnlockMeta))
                throw TypeError(".GameMeta.newModeUnlockMeta: array expected");
            message.newModeUnlockMeta = [];
            for (let i = 0; i < object.newModeUnlockMeta.length; ++i) {
                if (typeof object.newModeUnlockMeta[i] !== "object")
                    throw TypeError(".GameMeta.newModeUnlockMeta: object expected");
                message.newModeUnlockMeta[i] = $root.NewModeUnlockMeta.fromObject(object.newModeUnlockMeta[i]);
            }
        }
        if (object.energyMeta) {
            if (!Array.isArray(object.energyMeta))
                throw TypeError(".GameMeta.energyMeta: array expected");
            message.energyMeta = [];
            for (let i = 0; i < object.energyMeta.length; ++i) {
                if (typeof object.energyMeta[i] !== "object")
                    throw TypeError(".GameMeta.energyMeta: object expected");
                message.energyMeta[i] = $root.EnergyMeta.fromObject(object.energyMeta[i]);
            }
        }
        if (object.grenadeModeLevelMeta) {
            if (!Array.isArray(object.grenadeModeLevelMeta))
                throw TypeError(".GameMeta.grenadeModeLevelMeta: array expected");
            message.grenadeModeLevelMeta = [];
            for (let i = 0; i < object.grenadeModeLevelMeta.length; ++i) {
                if (typeof object.grenadeModeLevelMeta[i] !== "object")
                    throw TypeError(".GameMeta.grenadeModeLevelMeta: object expected");
                message.grenadeModeLevelMeta[i] = $root.GrenadeModeLevelMeta.fromObject(object.grenadeModeLevelMeta[i]);
            }
        }
        if (object.hostageModeLevelMeta) {
            if (!Array.isArray(object.hostageModeLevelMeta))
                throw TypeError(".GameMeta.hostageModeLevelMeta: array expected");
            message.hostageModeLevelMeta = [];
            for (let i = 0; i < object.hostageModeLevelMeta.length; ++i) {
                if (typeof object.hostageModeLevelMeta[i] !== "object")
                    throw TypeError(".GameMeta.hostageModeLevelMeta: object expected");
                message.hostageModeLevelMeta[i] = $root.HostageModeLevelMeta.fromObject(object.hostageModeLevelMeta[i]);
            }
        }
        if (object.survivalModeLevelMeta) {
            if (!Array.isArray(object.survivalModeLevelMeta))
                throw TypeError(".GameMeta.survivalModeLevelMeta: array expected");
            message.survivalModeLevelMeta = [];
            for (let i = 0; i < object.survivalModeLevelMeta.length; ++i) {
                if (typeof object.survivalModeLevelMeta[i] !== "object")
                    throw TypeError(".GameMeta.survivalModeLevelMeta: object expected");
                message.survivalModeLevelMeta[i] = $root.SurvivalModeLevelMeta.fromObject(object.survivalModeLevelMeta[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a GameMeta message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GameMeta
     * @static
     * @param {GameMeta} message GameMeta
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GameMeta.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults) {
            object.classicalModeLevelMeta = [];
            object.signInMeta = [];
            object.coinRewardMeta = [];
            object.imageUpgradeMeta = [];
            object.settlementRewardMeta = [];
            object.miniGameMeta = [];
            object.welfareCentreMeta = [];
            object.keyRewardMeta = [];
            object.newModeUnlockMeta = [];
            object.energyMeta = [];
            object.grenadeModeLevelMeta = [];
            object.hostageModeLevelMeta = [];
            object.survivalModeLevelMeta = [];
        }
        if (options.defaults)
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.metaVer = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.metaVer = options.longs === String ? "0" : 0;
        if (message.classicalModeLevelMeta && message.classicalModeLevelMeta.length) {
            object.classicalModeLevelMeta = [];
            for (let j = 0; j < message.classicalModeLevelMeta.length; ++j)
                object.classicalModeLevelMeta[j] = $root.ClassicalModeLevelMeta.toObject(message.classicalModeLevelMeta[j], options);
        }
        if (message.metaVer != null && message.hasOwnProperty("metaVer"))
            if (typeof message.metaVer === "number")
                object.metaVer = options.longs === String ? String(message.metaVer) : message.metaVer;
            else
                object.metaVer = options.longs === String ? $util.Long.prototype.toString.call(message.metaVer) : options.longs === Number ? new $util.LongBits(message.metaVer.low >>> 0, message.metaVer.high >>> 0).toNumber() : message.metaVer;
        if (message.signInMeta && message.signInMeta.length) {
            object.signInMeta = [];
            for (let j = 0; j < message.signInMeta.length; ++j)
                object.signInMeta[j] = $root.SignInMeta.toObject(message.signInMeta[j], options);
        }
        if (message.coinRewardMeta && message.coinRewardMeta.length) {
            object.coinRewardMeta = [];
            for (let j = 0; j < message.coinRewardMeta.length; ++j)
                object.coinRewardMeta[j] = $root.CoinRewardMeta.toObject(message.coinRewardMeta[j], options);
        }
        if (message.imageUpgradeMeta && message.imageUpgradeMeta.length) {
            object.imageUpgradeMeta = [];
            for (let j = 0; j < message.imageUpgradeMeta.length; ++j)
                object.imageUpgradeMeta[j] = $root.ImageUpgradeMeta.toObject(message.imageUpgradeMeta[j], options);
        }
        if (message.settlementRewardMeta && message.settlementRewardMeta.length) {
            object.settlementRewardMeta = [];
            for (let j = 0; j < message.settlementRewardMeta.length; ++j)
                object.settlementRewardMeta[j] = $root.SettlementRewardMeta.toObject(message.settlementRewardMeta[j], options);
        }
        if (message.miniGameMeta && message.miniGameMeta.length) {
            object.miniGameMeta = [];
            for (let j = 0; j < message.miniGameMeta.length; ++j)
                object.miniGameMeta[j] = $root.MiniGameMeta.toObject(message.miniGameMeta[j], options);
        }
        if (message.welfareCentreMeta && message.welfareCentreMeta.length) {
            object.welfareCentreMeta = [];
            for (let j = 0; j < message.welfareCentreMeta.length; ++j)
                object.welfareCentreMeta[j] = $root.WelfareCentreMeta.toObject(message.welfareCentreMeta[j], options);
        }
        if (message.keyRewardMeta && message.keyRewardMeta.length) {
            object.keyRewardMeta = [];
            for (let j = 0; j < message.keyRewardMeta.length; ++j)
                object.keyRewardMeta[j] = $root.KeyRewardMeta.toObject(message.keyRewardMeta[j], options);
        }
        if (message.newModeUnlockMeta && message.newModeUnlockMeta.length) {
            object.newModeUnlockMeta = [];
            for (let j = 0; j < message.newModeUnlockMeta.length; ++j)
                object.newModeUnlockMeta[j] = $root.NewModeUnlockMeta.toObject(message.newModeUnlockMeta[j], options);
        }
        if (message.energyMeta && message.energyMeta.length) {
            object.energyMeta = [];
            for (let j = 0; j < message.energyMeta.length; ++j)
                object.energyMeta[j] = $root.EnergyMeta.toObject(message.energyMeta[j], options);
        }
        if (message.grenadeModeLevelMeta && message.grenadeModeLevelMeta.length) {
            object.grenadeModeLevelMeta = [];
            for (let j = 0; j < message.grenadeModeLevelMeta.length; ++j)
                object.grenadeModeLevelMeta[j] = $root.GrenadeModeLevelMeta.toObject(message.grenadeModeLevelMeta[j], options);
        }
        if (message.hostageModeLevelMeta && message.hostageModeLevelMeta.length) {
            object.hostageModeLevelMeta = [];
            for (let j = 0; j < message.hostageModeLevelMeta.length; ++j)
                object.hostageModeLevelMeta[j] = $root.HostageModeLevelMeta.toObject(message.hostageModeLevelMeta[j], options);
        }
        if (message.survivalModeLevelMeta && message.survivalModeLevelMeta.length) {
            object.survivalModeLevelMeta = [];
            for (let j = 0; j < message.survivalModeLevelMeta.length; ++j)
                object.survivalModeLevelMeta[j] = $root.SurvivalModeLevelMeta.toObject(message.survivalModeLevelMeta[j], options);
        }
        return object;
    };

    /**
     * Converts this GameMeta to JSON.
     * @function toJSON
     * @memberof GameMeta
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GameMeta.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GameMeta;
})();

export const SignInMeta = $root.SignInMeta = (() => {

    /**
     * Properties of a SignInMeta.
     * @exports ISignInMeta
     * @interface ISignInMeta
     * @property {number} days SignInMeta days
     * @property {number} coinNum SignInMeta coinNum
     */

    /**
     * Constructs a new SignInMeta.
     * @exports SignInMeta
     * @classdesc Represents a SignInMeta.
     * @implements ISignInMeta
     * @constructor
     * @param {ISignInMeta=} [properties] Properties to set
     */
    function SignInMeta(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SignInMeta days.
     * @member {number} days
     * @memberof SignInMeta
     * @instance
     */
    SignInMeta.prototype.days = 0;

    /**
     * SignInMeta coinNum.
     * @member {number} coinNum
     * @memberof SignInMeta
     * @instance
     */
    SignInMeta.prototype.coinNum = 0;

    /**
     * Creates a new SignInMeta instance using the specified properties.
     * @function create
     * @memberof SignInMeta
     * @static
     * @param {ISignInMeta=} [properties] Properties to set
     * @returns {SignInMeta} SignInMeta instance
     */
    SignInMeta.create = function create(properties) {
        return new SignInMeta(properties);
    };

    /**
     * Encodes the specified SignInMeta message. Does not implicitly {@link SignInMeta.verify|verify} messages.
     * @function encode
     * @memberof SignInMeta
     * @static
     * @param {ISignInMeta} message SignInMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SignInMeta.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.days);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.coinNum);
        return writer;
    };

    /**
     * Encodes the specified SignInMeta message, length delimited. Does not implicitly {@link SignInMeta.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SignInMeta
     * @static
     * @param {ISignInMeta} message SignInMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SignInMeta.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SignInMeta message from the specified reader or buffer.
     * @function decode
     * @memberof SignInMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SignInMeta} SignInMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SignInMeta.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SignInMeta();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.days = reader.int32();
                break;
            case 2:
                message.coinNum = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("days"))
            throw $util.ProtocolError("missing required 'days'", { instance: message });
        if (!message.hasOwnProperty("coinNum"))
            throw $util.ProtocolError("missing required 'coinNum'", { instance: message });
        return message;
    };

    /**
     * Decodes a SignInMeta message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SignInMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SignInMeta} SignInMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SignInMeta.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SignInMeta message.
     * @function verify
     * @memberof SignInMeta
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SignInMeta.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.days))
            return "days: integer expected";
        if (!$util.isInteger(message.coinNum))
            return "coinNum: integer expected";
        return null;
    };

    /**
     * Creates a SignInMeta message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SignInMeta
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SignInMeta} SignInMeta
     */
    SignInMeta.fromObject = function fromObject(object) {
        if (object instanceof $root.SignInMeta)
            return object;
        let message = new $root.SignInMeta();
        if (object.days != null)
            message.days = object.days | 0;
        if (object.coinNum != null)
            message.coinNum = object.coinNum | 0;
        return message;
    };

    /**
     * Creates a plain object from a SignInMeta message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SignInMeta
     * @static
     * @param {SignInMeta} message SignInMeta
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SignInMeta.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.days = 0;
            object.coinNum = 0;
        }
        if (message.days != null && message.hasOwnProperty("days"))
            object.days = message.days;
        if (message.coinNum != null && message.hasOwnProperty("coinNum"))
            object.coinNum = message.coinNum;
        return object;
    };

    /**
     * Converts this SignInMeta to JSON.
     * @function toJSON
     * @memberof SignInMeta
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SignInMeta.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SignInMeta;
})();

export const ImageUpgradeMeta = $root.ImageUpgradeMeta = (() => {

    /**
     * Properties of an ImageUpgradeMeta.
     * @exports IImageUpgradeMeta
     * @interface IImageUpgradeMeta
     * @property {number} grade ImageUpgradeMeta grade
     * @property {string} imageId ImageUpgradeMeta imageId
     * @property {string} name ImageUpgradeMeta name
     * @property {string} backgroundId ImageUpgradeMeta backgroundId
     * @property {number} starsNum ImageUpgradeMeta starsNum
     */

    /**
     * Constructs a new ImageUpgradeMeta.
     * @exports ImageUpgradeMeta
     * @classdesc Represents an ImageUpgradeMeta.
     * @implements IImageUpgradeMeta
     * @constructor
     * @param {IImageUpgradeMeta=} [properties] Properties to set
     */
    function ImageUpgradeMeta(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ImageUpgradeMeta grade.
     * @member {number} grade
     * @memberof ImageUpgradeMeta
     * @instance
     */
    ImageUpgradeMeta.prototype.grade = 0;

    /**
     * ImageUpgradeMeta imageId.
     * @member {string} imageId
     * @memberof ImageUpgradeMeta
     * @instance
     */
    ImageUpgradeMeta.prototype.imageId = "";

    /**
     * ImageUpgradeMeta name.
     * @member {string} name
     * @memberof ImageUpgradeMeta
     * @instance
     */
    ImageUpgradeMeta.prototype.name = "";

    /**
     * ImageUpgradeMeta backgroundId.
     * @member {string} backgroundId
     * @memberof ImageUpgradeMeta
     * @instance
     */
    ImageUpgradeMeta.prototype.backgroundId = "";

    /**
     * ImageUpgradeMeta starsNum.
     * @member {number} starsNum
     * @memberof ImageUpgradeMeta
     * @instance
     */
    ImageUpgradeMeta.prototype.starsNum = 0;

    /**
     * Creates a new ImageUpgradeMeta instance using the specified properties.
     * @function create
     * @memberof ImageUpgradeMeta
     * @static
     * @param {IImageUpgradeMeta=} [properties] Properties to set
     * @returns {ImageUpgradeMeta} ImageUpgradeMeta instance
     */
    ImageUpgradeMeta.create = function create(properties) {
        return new ImageUpgradeMeta(properties);
    };

    /**
     * Encodes the specified ImageUpgradeMeta message. Does not implicitly {@link ImageUpgradeMeta.verify|verify} messages.
     * @function encode
     * @memberof ImageUpgradeMeta
     * @static
     * @param {IImageUpgradeMeta} message ImageUpgradeMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ImageUpgradeMeta.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.grade);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.imageId);
        writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
        writer.uint32(/* id 4, wireType 2 =*/34).string(message.backgroundId);
        writer.uint32(/* id 5, wireType 0 =*/40).int32(message.starsNum);
        return writer;
    };

    /**
     * Encodes the specified ImageUpgradeMeta message, length delimited. Does not implicitly {@link ImageUpgradeMeta.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ImageUpgradeMeta
     * @static
     * @param {IImageUpgradeMeta} message ImageUpgradeMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ImageUpgradeMeta.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ImageUpgradeMeta message from the specified reader or buffer.
     * @function decode
     * @memberof ImageUpgradeMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ImageUpgradeMeta} ImageUpgradeMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ImageUpgradeMeta.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ImageUpgradeMeta();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.grade = reader.int32();
                break;
            case 2:
                message.imageId = reader.string();
                break;
            case 3:
                message.name = reader.string();
                break;
            case 4:
                message.backgroundId = reader.string();
                break;
            case 5:
                message.starsNum = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("grade"))
            throw $util.ProtocolError("missing required 'grade'", { instance: message });
        if (!message.hasOwnProperty("imageId"))
            throw $util.ProtocolError("missing required 'imageId'", { instance: message });
        if (!message.hasOwnProperty("name"))
            throw $util.ProtocolError("missing required 'name'", { instance: message });
        if (!message.hasOwnProperty("backgroundId"))
            throw $util.ProtocolError("missing required 'backgroundId'", { instance: message });
        if (!message.hasOwnProperty("starsNum"))
            throw $util.ProtocolError("missing required 'starsNum'", { instance: message });
        return message;
    };

    /**
     * Decodes an ImageUpgradeMeta message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ImageUpgradeMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ImageUpgradeMeta} ImageUpgradeMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ImageUpgradeMeta.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ImageUpgradeMeta message.
     * @function verify
     * @memberof ImageUpgradeMeta
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ImageUpgradeMeta.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.grade))
            return "grade: integer expected";
        if (!$util.isString(message.imageId))
            return "imageId: string expected";
        if (!$util.isString(message.name))
            return "name: string expected";
        if (!$util.isString(message.backgroundId))
            return "backgroundId: string expected";
        if (!$util.isInteger(message.starsNum))
            return "starsNum: integer expected";
        return null;
    };

    /**
     * Creates an ImageUpgradeMeta message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ImageUpgradeMeta
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ImageUpgradeMeta} ImageUpgradeMeta
     */
    ImageUpgradeMeta.fromObject = function fromObject(object) {
        if (object instanceof $root.ImageUpgradeMeta)
            return object;
        let message = new $root.ImageUpgradeMeta();
        if (object.grade != null)
            message.grade = object.grade | 0;
        if (object.imageId != null)
            message.imageId = String(object.imageId);
        if (object.name != null)
            message.name = String(object.name);
        if (object.backgroundId != null)
            message.backgroundId = String(object.backgroundId);
        if (object.starsNum != null)
            message.starsNum = object.starsNum | 0;
        return message;
    };

    /**
     * Creates a plain object from an ImageUpgradeMeta message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ImageUpgradeMeta
     * @static
     * @param {ImageUpgradeMeta} message ImageUpgradeMeta
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ImageUpgradeMeta.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.grade = 0;
            object.imageId = "";
            object.name = "";
            object.backgroundId = "";
            object.starsNum = 0;
        }
        if (message.grade != null && message.hasOwnProperty("grade"))
            object.grade = message.grade;
        if (message.imageId != null && message.hasOwnProperty("imageId"))
            object.imageId = message.imageId;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.backgroundId != null && message.hasOwnProperty("backgroundId"))
            object.backgroundId = message.backgroundId;
        if (message.starsNum != null && message.hasOwnProperty("starsNum"))
            object.starsNum = message.starsNum;
        return object;
    };

    /**
     * Converts this ImageUpgradeMeta to JSON.
     * @function toJSON
     * @memberof ImageUpgradeMeta
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ImageUpgradeMeta.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ImageUpgradeMeta;
})();

export const SettlementRewardMeta = $root.SettlementRewardMeta = (() => {

    /**
     * Properties of a SettlementRewardMeta.
     * @exports ISettlementRewardMeta
     * @interface ISettlementRewardMeta
     * @property {number} lose SettlementRewardMeta lose
     * @property {number} oneStarsReward SettlementRewardMeta oneStarsReward
     * @property {number} extraBonus SettlementRewardMeta extraBonus
     * @property {number} videoRefreshNum SettlementRewardMeta videoRefreshNum
     * @property {number} shareRefreshNum SettlementRewardMeta shareRefreshNum
     * @property {number} bulletReboundNum SettlementRewardMeta bulletReboundNum
     */

    /**
     * Constructs a new SettlementRewardMeta.
     * @exports SettlementRewardMeta
     * @classdesc Represents a SettlementRewardMeta.
     * @implements ISettlementRewardMeta
     * @constructor
     * @param {ISettlementRewardMeta=} [properties] Properties to set
     */
    function SettlementRewardMeta(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SettlementRewardMeta lose.
     * @member {number} lose
     * @memberof SettlementRewardMeta
     * @instance
     */
    SettlementRewardMeta.prototype.lose = 0;

    /**
     * SettlementRewardMeta oneStarsReward.
     * @member {number} oneStarsReward
     * @memberof SettlementRewardMeta
     * @instance
     */
    SettlementRewardMeta.prototype.oneStarsReward = 0;

    /**
     * SettlementRewardMeta extraBonus.
     * @member {number} extraBonus
     * @memberof SettlementRewardMeta
     * @instance
     */
    SettlementRewardMeta.prototype.extraBonus = 0;

    /**
     * SettlementRewardMeta videoRefreshNum.
     * @member {number} videoRefreshNum
     * @memberof SettlementRewardMeta
     * @instance
     */
    SettlementRewardMeta.prototype.videoRefreshNum = 0;

    /**
     * SettlementRewardMeta shareRefreshNum.
     * @member {number} shareRefreshNum
     * @memberof SettlementRewardMeta
     * @instance
     */
    SettlementRewardMeta.prototype.shareRefreshNum = 0;

    /**
     * SettlementRewardMeta bulletReboundNum.
     * @member {number} bulletReboundNum
     * @memberof SettlementRewardMeta
     * @instance
     */
    SettlementRewardMeta.prototype.bulletReboundNum = 0;

    /**
     * Creates a new SettlementRewardMeta instance using the specified properties.
     * @function create
     * @memberof SettlementRewardMeta
     * @static
     * @param {ISettlementRewardMeta=} [properties] Properties to set
     * @returns {SettlementRewardMeta} SettlementRewardMeta instance
     */
    SettlementRewardMeta.create = function create(properties) {
        return new SettlementRewardMeta(properties);
    };

    /**
     * Encodes the specified SettlementRewardMeta message. Does not implicitly {@link SettlementRewardMeta.verify|verify} messages.
     * @function encode
     * @memberof SettlementRewardMeta
     * @static
     * @param {ISettlementRewardMeta} message SettlementRewardMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SettlementRewardMeta.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.lose);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.oneStarsReward);
        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.extraBonus);
        writer.uint32(/* id 4, wireType 0 =*/32).int32(message.videoRefreshNum);
        writer.uint32(/* id 5, wireType 0 =*/40).int32(message.shareRefreshNum);
        writer.uint32(/* id 6, wireType 0 =*/48).int32(message.bulletReboundNum);
        return writer;
    };

    /**
     * Encodes the specified SettlementRewardMeta message, length delimited. Does not implicitly {@link SettlementRewardMeta.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SettlementRewardMeta
     * @static
     * @param {ISettlementRewardMeta} message SettlementRewardMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SettlementRewardMeta.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SettlementRewardMeta message from the specified reader or buffer.
     * @function decode
     * @memberof SettlementRewardMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SettlementRewardMeta} SettlementRewardMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SettlementRewardMeta.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SettlementRewardMeta();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.lose = reader.int32();
                break;
            case 2:
                message.oneStarsReward = reader.int32();
                break;
            case 3:
                message.extraBonus = reader.int32();
                break;
            case 4:
                message.videoRefreshNum = reader.int32();
                break;
            case 5:
                message.shareRefreshNum = reader.int32();
                break;
            case 6:
                message.bulletReboundNum = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("lose"))
            throw $util.ProtocolError("missing required 'lose'", { instance: message });
        if (!message.hasOwnProperty("oneStarsReward"))
            throw $util.ProtocolError("missing required 'oneStarsReward'", { instance: message });
        if (!message.hasOwnProperty("extraBonus"))
            throw $util.ProtocolError("missing required 'extraBonus'", { instance: message });
        if (!message.hasOwnProperty("videoRefreshNum"))
            throw $util.ProtocolError("missing required 'videoRefreshNum'", { instance: message });
        if (!message.hasOwnProperty("shareRefreshNum"))
            throw $util.ProtocolError("missing required 'shareRefreshNum'", { instance: message });
        if (!message.hasOwnProperty("bulletReboundNum"))
            throw $util.ProtocolError("missing required 'bulletReboundNum'", { instance: message });
        return message;
    };

    /**
     * Decodes a SettlementRewardMeta message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SettlementRewardMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SettlementRewardMeta} SettlementRewardMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SettlementRewardMeta.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SettlementRewardMeta message.
     * @function verify
     * @memberof SettlementRewardMeta
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SettlementRewardMeta.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.lose))
            return "lose: integer expected";
        if (!$util.isInteger(message.oneStarsReward))
            return "oneStarsReward: integer expected";
        if (!$util.isInteger(message.extraBonus))
            return "extraBonus: integer expected";
        if (!$util.isInteger(message.videoRefreshNum))
            return "videoRefreshNum: integer expected";
        if (!$util.isInteger(message.shareRefreshNum))
            return "shareRefreshNum: integer expected";
        if (!$util.isInteger(message.bulletReboundNum))
            return "bulletReboundNum: integer expected";
        return null;
    };

    /**
     * Creates a SettlementRewardMeta message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SettlementRewardMeta
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SettlementRewardMeta} SettlementRewardMeta
     */
    SettlementRewardMeta.fromObject = function fromObject(object) {
        if (object instanceof $root.SettlementRewardMeta)
            return object;
        let message = new $root.SettlementRewardMeta();
        if (object.lose != null)
            message.lose = object.lose | 0;
        if (object.oneStarsReward != null)
            message.oneStarsReward = object.oneStarsReward | 0;
        if (object.extraBonus != null)
            message.extraBonus = object.extraBonus | 0;
        if (object.videoRefreshNum != null)
            message.videoRefreshNum = object.videoRefreshNum | 0;
        if (object.shareRefreshNum != null)
            message.shareRefreshNum = object.shareRefreshNum | 0;
        if (object.bulletReboundNum != null)
            message.bulletReboundNum = object.bulletReboundNum | 0;
        return message;
    };

    /**
     * Creates a plain object from a SettlementRewardMeta message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SettlementRewardMeta
     * @static
     * @param {SettlementRewardMeta} message SettlementRewardMeta
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SettlementRewardMeta.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.lose = 0;
            object.oneStarsReward = 0;
            object.extraBonus = 0;
            object.videoRefreshNum = 0;
            object.shareRefreshNum = 0;
            object.bulletReboundNum = 0;
        }
        if (message.lose != null && message.hasOwnProperty("lose"))
            object.lose = message.lose;
        if (message.oneStarsReward != null && message.hasOwnProperty("oneStarsReward"))
            object.oneStarsReward = message.oneStarsReward;
        if (message.extraBonus != null && message.hasOwnProperty("extraBonus"))
            object.extraBonus = message.extraBonus;
        if (message.videoRefreshNum != null && message.hasOwnProperty("videoRefreshNum"))
            object.videoRefreshNum = message.videoRefreshNum;
        if (message.shareRefreshNum != null && message.hasOwnProperty("shareRefreshNum"))
            object.shareRefreshNum = message.shareRefreshNum;
        if (message.bulletReboundNum != null && message.hasOwnProperty("bulletReboundNum"))
            object.bulletReboundNum = message.bulletReboundNum;
        return object;
    };

    /**
     * Converts this SettlementRewardMeta to JSON.
     * @function toJSON
     * @memberof SettlementRewardMeta
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SettlementRewardMeta.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SettlementRewardMeta;
})();

export const MiniGameMeta = $root.MiniGameMeta = (() => {

    /**
     * Properties of a MiniGameMeta.
     * @exports IMiniGameMeta
     * @interface IMiniGameMeta
     * @property {number} type MiniGameMeta type
     * @property {number} num MiniGameMeta num
     * @property {number} probability MiniGameMeta probability
     */

    /**
     * Constructs a new MiniGameMeta.
     * @exports MiniGameMeta
     * @classdesc Represents a MiniGameMeta.
     * @implements IMiniGameMeta
     * @constructor
     * @param {IMiniGameMeta=} [properties] Properties to set
     */
    function MiniGameMeta(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MiniGameMeta type.
     * @member {number} type
     * @memberof MiniGameMeta
     * @instance
     */
    MiniGameMeta.prototype.type = 0;

    /**
     * MiniGameMeta num.
     * @member {number} num
     * @memberof MiniGameMeta
     * @instance
     */
    MiniGameMeta.prototype.num = 0;

    /**
     * MiniGameMeta probability.
     * @member {number} probability
     * @memberof MiniGameMeta
     * @instance
     */
    MiniGameMeta.prototype.probability = 0;

    /**
     * Creates a new MiniGameMeta instance using the specified properties.
     * @function create
     * @memberof MiniGameMeta
     * @static
     * @param {IMiniGameMeta=} [properties] Properties to set
     * @returns {MiniGameMeta} MiniGameMeta instance
     */
    MiniGameMeta.create = function create(properties) {
        return new MiniGameMeta(properties);
    };

    /**
     * Encodes the specified MiniGameMeta message. Does not implicitly {@link MiniGameMeta.verify|verify} messages.
     * @function encode
     * @memberof MiniGameMeta
     * @static
     * @param {IMiniGameMeta} message MiniGameMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MiniGameMeta.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.num);
        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.probability);
        return writer;
    };

    /**
     * Encodes the specified MiniGameMeta message, length delimited. Does not implicitly {@link MiniGameMeta.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MiniGameMeta
     * @static
     * @param {IMiniGameMeta} message MiniGameMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MiniGameMeta.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MiniGameMeta message from the specified reader or buffer.
     * @function decode
     * @memberof MiniGameMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MiniGameMeta} MiniGameMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MiniGameMeta.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.MiniGameMeta();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.type = reader.int32();
                break;
            case 2:
                message.num = reader.int32();
                break;
            case 3:
                message.probability = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("type"))
            throw $util.ProtocolError("missing required 'type'", { instance: message });
        if (!message.hasOwnProperty("num"))
            throw $util.ProtocolError("missing required 'num'", { instance: message });
        if (!message.hasOwnProperty("probability"))
            throw $util.ProtocolError("missing required 'probability'", { instance: message });
        return message;
    };

    /**
     * Decodes a MiniGameMeta message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MiniGameMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MiniGameMeta} MiniGameMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MiniGameMeta.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MiniGameMeta message.
     * @function verify
     * @memberof MiniGameMeta
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MiniGameMeta.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.type))
            return "type: integer expected";
        if (!$util.isInteger(message.num))
            return "num: integer expected";
        if (!$util.isInteger(message.probability))
            return "probability: integer expected";
        return null;
    };

    /**
     * Creates a MiniGameMeta message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MiniGameMeta
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MiniGameMeta} MiniGameMeta
     */
    MiniGameMeta.fromObject = function fromObject(object) {
        if (object instanceof $root.MiniGameMeta)
            return object;
        let message = new $root.MiniGameMeta();
        if (object.type != null)
            message.type = object.type | 0;
        if (object.num != null)
            message.num = object.num | 0;
        if (object.probability != null)
            message.probability = object.probability | 0;
        return message;
    };

    /**
     * Creates a plain object from a MiniGameMeta message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MiniGameMeta
     * @static
     * @param {MiniGameMeta} message MiniGameMeta
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MiniGameMeta.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.type = 0;
            object.num = 0;
            object.probability = 0;
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.num != null && message.hasOwnProperty("num"))
            object.num = message.num;
        if (message.probability != null && message.hasOwnProperty("probability"))
            object.probability = message.probability;
        return object;
    };

    /**
     * Converts this MiniGameMeta to JSON.
     * @function toJSON
     * @memberof MiniGameMeta
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MiniGameMeta.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MiniGameMeta;
})();

export const WelfareCentreMeta = $root.WelfareCentreMeta = (() => {

    /**
     * Properties of a WelfareCentreMeta.
     * @exports IWelfareCentreMeta
     * @interface IWelfareCentreMeta
     * @property {number} coinReward WelfareCentreMeta coinReward
     */

    /**
     * Constructs a new WelfareCentreMeta.
     * @exports WelfareCentreMeta
     * @classdesc Represents a WelfareCentreMeta.
     * @implements IWelfareCentreMeta
     * @constructor
     * @param {IWelfareCentreMeta=} [properties] Properties to set
     */
    function WelfareCentreMeta(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * WelfareCentreMeta coinReward.
     * @member {number} coinReward
     * @memberof WelfareCentreMeta
     * @instance
     */
    WelfareCentreMeta.prototype.coinReward = 0;

    /**
     * Creates a new WelfareCentreMeta instance using the specified properties.
     * @function create
     * @memberof WelfareCentreMeta
     * @static
     * @param {IWelfareCentreMeta=} [properties] Properties to set
     * @returns {WelfareCentreMeta} WelfareCentreMeta instance
     */
    WelfareCentreMeta.create = function create(properties) {
        return new WelfareCentreMeta(properties);
    };

    /**
     * Encodes the specified WelfareCentreMeta message. Does not implicitly {@link WelfareCentreMeta.verify|verify} messages.
     * @function encode
     * @memberof WelfareCentreMeta
     * @static
     * @param {IWelfareCentreMeta} message WelfareCentreMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    WelfareCentreMeta.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.coinReward);
        return writer;
    };

    /**
     * Encodes the specified WelfareCentreMeta message, length delimited. Does not implicitly {@link WelfareCentreMeta.verify|verify} messages.
     * @function encodeDelimited
     * @memberof WelfareCentreMeta
     * @static
     * @param {IWelfareCentreMeta} message WelfareCentreMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    WelfareCentreMeta.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a WelfareCentreMeta message from the specified reader or buffer.
     * @function decode
     * @memberof WelfareCentreMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {WelfareCentreMeta} WelfareCentreMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    WelfareCentreMeta.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.WelfareCentreMeta();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.coinReward = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("coinReward"))
            throw $util.ProtocolError("missing required 'coinReward'", { instance: message });
        return message;
    };

    /**
     * Decodes a WelfareCentreMeta message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof WelfareCentreMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {WelfareCentreMeta} WelfareCentreMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    WelfareCentreMeta.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a WelfareCentreMeta message.
     * @function verify
     * @memberof WelfareCentreMeta
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    WelfareCentreMeta.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.coinReward))
            return "coinReward: integer expected";
        return null;
    };

    /**
     * Creates a WelfareCentreMeta message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof WelfareCentreMeta
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {WelfareCentreMeta} WelfareCentreMeta
     */
    WelfareCentreMeta.fromObject = function fromObject(object) {
        if (object instanceof $root.WelfareCentreMeta)
            return object;
        let message = new $root.WelfareCentreMeta();
        if (object.coinReward != null)
            message.coinReward = object.coinReward | 0;
        return message;
    };

    /**
     * Creates a plain object from a WelfareCentreMeta message. Also converts values to other types if specified.
     * @function toObject
     * @memberof WelfareCentreMeta
     * @static
     * @param {WelfareCentreMeta} message WelfareCentreMeta
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    WelfareCentreMeta.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.coinReward = 0;
        if (message.coinReward != null && message.hasOwnProperty("coinReward"))
            object.coinReward = message.coinReward;
        return object;
    };

    /**
     * Converts this WelfareCentreMeta to JSON.
     * @function toJSON
     * @memberof WelfareCentreMeta
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    WelfareCentreMeta.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return WelfareCentreMeta;
})();

export const KeyRewardMeta = $root.KeyRewardMeta = (() => {

    /**
     * Properties of a KeyRewardMeta.
     * @exports IKeyRewardMeta
     * @interface IKeyRewardMeta
     * @property {number} num KeyRewardMeta num
     * @property {number} price KeyRewardMeta price
     */

    /**
     * Constructs a new KeyRewardMeta.
     * @exports KeyRewardMeta
     * @classdesc Represents a KeyRewardMeta.
     * @implements IKeyRewardMeta
     * @constructor
     * @param {IKeyRewardMeta=} [properties] Properties to set
     */
    function KeyRewardMeta(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * KeyRewardMeta num.
     * @member {number} num
     * @memberof KeyRewardMeta
     * @instance
     */
    KeyRewardMeta.prototype.num = 0;

    /**
     * KeyRewardMeta price.
     * @member {number} price
     * @memberof KeyRewardMeta
     * @instance
     */
    KeyRewardMeta.prototype.price = 0;

    /**
     * Creates a new KeyRewardMeta instance using the specified properties.
     * @function create
     * @memberof KeyRewardMeta
     * @static
     * @param {IKeyRewardMeta=} [properties] Properties to set
     * @returns {KeyRewardMeta} KeyRewardMeta instance
     */
    KeyRewardMeta.create = function create(properties) {
        return new KeyRewardMeta(properties);
    };

    /**
     * Encodes the specified KeyRewardMeta message. Does not implicitly {@link KeyRewardMeta.verify|verify} messages.
     * @function encode
     * @memberof KeyRewardMeta
     * @static
     * @param {IKeyRewardMeta} message KeyRewardMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    KeyRewardMeta.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.num);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.price);
        return writer;
    };

    /**
     * Encodes the specified KeyRewardMeta message, length delimited. Does not implicitly {@link KeyRewardMeta.verify|verify} messages.
     * @function encodeDelimited
     * @memberof KeyRewardMeta
     * @static
     * @param {IKeyRewardMeta} message KeyRewardMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    KeyRewardMeta.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a KeyRewardMeta message from the specified reader or buffer.
     * @function decode
     * @memberof KeyRewardMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {KeyRewardMeta} KeyRewardMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    KeyRewardMeta.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.KeyRewardMeta();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.num = reader.int32();
                break;
            case 2:
                message.price = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("num"))
            throw $util.ProtocolError("missing required 'num'", { instance: message });
        if (!message.hasOwnProperty("price"))
            throw $util.ProtocolError("missing required 'price'", { instance: message });
        return message;
    };

    /**
     * Decodes a KeyRewardMeta message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof KeyRewardMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {KeyRewardMeta} KeyRewardMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    KeyRewardMeta.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a KeyRewardMeta message.
     * @function verify
     * @memberof KeyRewardMeta
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    KeyRewardMeta.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.num))
            return "num: integer expected";
        if (!$util.isInteger(message.price))
            return "price: integer expected";
        return null;
    };

    /**
     * Creates a KeyRewardMeta message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof KeyRewardMeta
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {KeyRewardMeta} KeyRewardMeta
     */
    KeyRewardMeta.fromObject = function fromObject(object) {
        if (object instanceof $root.KeyRewardMeta)
            return object;
        let message = new $root.KeyRewardMeta();
        if (object.num != null)
            message.num = object.num | 0;
        if (object.price != null)
            message.price = object.price | 0;
        return message;
    };

    /**
     * Creates a plain object from a KeyRewardMeta message. Also converts values to other types if specified.
     * @function toObject
     * @memberof KeyRewardMeta
     * @static
     * @param {KeyRewardMeta} message KeyRewardMeta
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    KeyRewardMeta.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.num = 0;
            object.price = 0;
        }
        if (message.num != null && message.hasOwnProperty("num"))
            object.num = message.num;
        if (message.price != null && message.hasOwnProperty("price"))
            object.price = message.price;
        return object;
    };

    /**
     * Converts this KeyRewardMeta to JSON.
     * @function toJSON
     * @memberof KeyRewardMeta
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    KeyRewardMeta.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return KeyRewardMeta;
})();

export const NewModeUnlockMeta = $root.NewModeUnlockMeta = (() => {

    /**
     * Properties of a NewModeUnlockMeta.
     * @exports INewModeUnlockMeta
     * @interface INewModeUnlockMeta
     * @property {string} modeName NewModeUnlockMeta modeName
     * @property {number} starsNum NewModeUnlockMeta starsNum
     * @property {number} refreshNum NewModeUnlockMeta refreshNum
     */

    /**
     * Constructs a new NewModeUnlockMeta.
     * @exports NewModeUnlockMeta
     * @classdesc Represents a NewModeUnlockMeta.
     * @implements INewModeUnlockMeta
     * @constructor
     * @param {INewModeUnlockMeta=} [properties] Properties to set
     */
    function NewModeUnlockMeta(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * NewModeUnlockMeta modeName.
     * @member {string} modeName
     * @memberof NewModeUnlockMeta
     * @instance
     */
    NewModeUnlockMeta.prototype.modeName = "";

    /**
     * NewModeUnlockMeta starsNum.
     * @member {number} starsNum
     * @memberof NewModeUnlockMeta
     * @instance
     */
    NewModeUnlockMeta.prototype.starsNum = 0;

    /**
     * NewModeUnlockMeta refreshNum.
     * @member {number} refreshNum
     * @memberof NewModeUnlockMeta
     * @instance
     */
    NewModeUnlockMeta.prototype.refreshNum = 0;

    /**
     * Creates a new NewModeUnlockMeta instance using the specified properties.
     * @function create
     * @memberof NewModeUnlockMeta
     * @static
     * @param {INewModeUnlockMeta=} [properties] Properties to set
     * @returns {NewModeUnlockMeta} NewModeUnlockMeta instance
     */
    NewModeUnlockMeta.create = function create(properties) {
        return new NewModeUnlockMeta(properties);
    };

    /**
     * Encodes the specified NewModeUnlockMeta message. Does not implicitly {@link NewModeUnlockMeta.verify|verify} messages.
     * @function encode
     * @memberof NewModeUnlockMeta
     * @static
     * @param {INewModeUnlockMeta} message NewModeUnlockMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    NewModeUnlockMeta.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.modeName);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.starsNum);
        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.refreshNum);
        return writer;
    };

    /**
     * Encodes the specified NewModeUnlockMeta message, length delimited. Does not implicitly {@link NewModeUnlockMeta.verify|verify} messages.
     * @function encodeDelimited
     * @memberof NewModeUnlockMeta
     * @static
     * @param {INewModeUnlockMeta} message NewModeUnlockMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    NewModeUnlockMeta.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a NewModeUnlockMeta message from the specified reader or buffer.
     * @function decode
     * @memberof NewModeUnlockMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {NewModeUnlockMeta} NewModeUnlockMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    NewModeUnlockMeta.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.NewModeUnlockMeta();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.modeName = reader.string();
                break;
            case 2:
                message.starsNum = reader.int32();
                break;
            case 3:
                message.refreshNum = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("modeName"))
            throw $util.ProtocolError("missing required 'modeName'", { instance: message });
        if (!message.hasOwnProperty("starsNum"))
            throw $util.ProtocolError("missing required 'starsNum'", { instance: message });
        if (!message.hasOwnProperty("refreshNum"))
            throw $util.ProtocolError("missing required 'refreshNum'", { instance: message });
        return message;
    };

    /**
     * Decodes a NewModeUnlockMeta message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof NewModeUnlockMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {NewModeUnlockMeta} NewModeUnlockMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    NewModeUnlockMeta.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a NewModeUnlockMeta message.
     * @function verify
     * @memberof NewModeUnlockMeta
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    NewModeUnlockMeta.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isString(message.modeName))
            return "modeName: string expected";
        if (!$util.isInteger(message.starsNum))
            return "starsNum: integer expected";
        if (!$util.isInteger(message.refreshNum))
            return "refreshNum: integer expected";
        return null;
    };

    /**
     * Creates a NewModeUnlockMeta message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof NewModeUnlockMeta
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {NewModeUnlockMeta} NewModeUnlockMeta
     */
    NewModeUnlockMeta.fromObject = function fromObject(object) {
        if (object instanceof $root.NewModeUnlockMeta)
            return object;
        let message = new $root.NewModeUnlockMeta();
        if (object.modeName != null)
            message.modeName = String(object.modeName);
        if (object.starsNum != null)
            message.starsNum = object.starsNum | 0;
        if (object.refreshNum != null)
            message.refreshNum = object.refreshNum | 0;
        return message;
    };

    /**
     * Creates a plain object from a NewModeUnlockMeta message. Also converts values to other types if specified.
     * @function toObject
     * @memberof NewModeUnlockMeta
     * @static
     * @param {NewModeUnlockMeta} message NewModeUnlockMeta
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    NewModeUnlockMeta.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.modeName = "";
            object.starsNum = 0;
            object.refreshNum = 0;
        }
        if (message.modeName != null && message.hasOwnProperty("modeName"))
            object.modeName = message.modeName;
        if (message.starsNum != null && message.hasOwnProperty("starsNum"))
            object.starsNum = message.starsNum;
        if (message.refreshNum != null && message.hasOwnProperty("refreshNum"))
            object.refreshNum = message.refreshNum;
        return object;
    };

    /**
     * Converts this NewModeUnlockMeta to JSON.
     * @function toJSON
     * @memberof NewModeUnlockMeta
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    NewModeUnlockMeta.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return NewModeUnlockMeta;
})();

export const GrenadeModeLevelMeta = $root.GrenadeModeLevelMeta = (() => {

    /**
     * Properties of a GrenadeModeLevelMeta.
     * @exports IGrenadeModeLevelMeta
     * @interface IGrenadeModeLevelMeta
     * @property {number} level GrenadeModeLevelMeta level
     * @property {number} goldBulletNum GrenadeModeLevelMeta goldBulletNum
     */

    /**
     * Constructs a new GrenadeModeLevelMeta.
     * @exports GrenadeModeLevelMeta
     * @classdesc Represents a GrenadeModeLevelMeta.
     * @implements IGrenadeModeLevelMeta
     * @constructor
     * @param {IGrenadeModeLevelMeta=} [properties] Properties to set
     */
    function GrenadeModeLevelMeta(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GrenadeModeLevelMeta level.
     * @member {number} level
     * @memberof GrenadeModeLevelMeta
     * @instance
     */
    GrenadeModeLevelMeta.prototype.level = 0;

    /**
     * GrenadeModeLevelMeta goldBulletNum.
     * @member {number} goldBulletNum
     * @memberof GrenadeModeLevelMeta
     * @instance
     */
    GrenadeModeLevelMeta.prototype.goldBulletNum = 0;

    /**
     * Creates a new GrenadeModeLevelMeta instance using the specified properties.
     * @function create
     * @memberof GrenadeModeLevelMeta
     * @static
     * @param {IGrenadeModeLevelMeta=} [properties] Properties to set
     * @returns {GrenadeModeLevelMeta} GrenadeModeLevelMeta instance
     */
    GrenadeModeLevelMeta.create = function create(properties) {
        return new GrenadeModeLevelMeta(properties);
    };

    /**
     * Encodes the specified GrenadeModeLevelMeta message. Does not implicitly {@link GrenadeModeLevelMeta.verify|verify} messages.
     * @function encode
     * @memberof GrenadeModeLevelMeta
     * @static
     * @param {IGrenadeModeLevelMeta} message GrenadeModeLevelMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GrenadeModeLevelMeta.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.level);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.goldBulletNum);
        return writer;
    };

    /**
     * Encodes the specified GrenadeModeLevelMeta message, length delimited. Does not implicitly {@link GrenadeModeLevelMeta.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GrenadeModeLevelMeta
     * @static
     * @param {IGrenadeModeLevelMeta} message GrenadeModeLevelMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GrenadeModeLevelMeta.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GrenadeModeLevelMeta message from the specified reader or buffer.
     * @function decode
     * @memberof GrenadeModeLevelMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GrenadeModeLevelMeta} GrenadeModeLevelMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GrenadeModeLevelMeta.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GrenadeModeLevelMeta();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.level = reader.int32();
                break;
            case 2:
                message.goldBulletNum = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("level"))
            throw $util.ProtocolError("missing required 'level'", { instance: message });
        if (!message.hasOwnProperty("goldBulletNum"))
            throw $util.ProtocolError("missing required 'goldBulletNum'", { instance: message });
        return message;
    };

    /**
     * Decodes a GrenadeModeLevelMeta message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GrenadeModeLevelMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GrenadeModeLevelMeta} GrenadeModeLevelMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GrenadeModeLevelMeta.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GrenadeModeLevelMeta message.
     * @function verify
     * @memberof GrenadeModeLevelMeta
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GrenadeModeLevelMeta.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.level))
            return "level: integer expected";
        if (!$util.isInteger(message.goldBulletNum))
            return "goldBulletNum: integer expected";
        return null;
    };

    /**
     * Creates a GrenadeModeLevelMeta message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GrenadeModeLevelMeta
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GrenadeModeLevelMeta} GrenadeModeLevelMeta
     */
    GrenadeModeLevelMeta.fromObject = function fromObject(object) {
        if (object instanceof $root.GrenadeModeLevelMeta)
            return object;
        let message = new $root.GrenadeModeLevelMeta();
        if (object.level != null)
            message.level = object.level | 0;
        if (object.goldBulletNum != null)
            message.goldBulletNum = object.goldBulletNum | 0;
        return message;
    };

    /**
     * Creates a plain object from a GrenadeModeLevelMeta message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GrenadeModeLevelMeta
     * @static
     * @param {GrenadeModeLevelMeta} message GrenadeModeLevelMeta
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GrenadeModeLevelMeta.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.level = 0;
            object.goldBulletNum = 0;
        }
        if (message.level != null && message.hasOwnProperty("level"))
            object.level = message.level;
        if (message.goldBulletNum != null && message.hasOwnProperty("goldBulletNum"))
            object.goldBulletNum = message.goldBulletNum;
        return object;
    };

    /**
     * Converts this GrenadeModeLevelMeta to JSON.
     * @function toJSON
     * @memberof GrenadeModeLevelMeta
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GrenadeModeLevelMeta.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GrenadeModeLevelMeta;
})();

export const HostageModeLevelMeta = $root.HostageModeLevelMeta = (() => {

    /**
     * Properties of a HostageModeLevelMeta.
     * @exports IHostageModeLevelMeta
     * @interface IHostageModeLevelMeta
     * @property {number} level HostageModeLevelMeta level
     * @property {number} goldBulletNum HostageModeLevelMeta goldBulletNum
     */

    /**
     * Constructs a new HostageModeLevelMeta.
     * @exports HostageModeLevelMeta
     * @classdesc Represents a HostageModeLevelMeta.
     * @implements IHostageModeLevelMeta
     * @constructor
     * @param {IHostageModeLevelMeta=} [properties] Properties to set
     */
    function HostageModeLevelMeta(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * HostageModeLevelMeta level.
     * @member {number} level
     * @memberof HostageModeLevelMeta
     * @instance
     */
    HostageModeLevelMeta.prototype.level = 0;

    /**
     * HostageModeLevelMeta goldBulletNum.
     * @member {number} goldBulletNum
     * @memberof HostageModeLevelMeta
     * @instance
     */
    HostageModeLevelMeta.prototype.goldBulletNum = 0;

    /**
     * Creates a new HostageModeLevelMeta instance using the specified properties.
     * @function create
     * @memberof HostageModeLevelMeta
     * @static
     * @param {IHostageModeLevelMeta=} [properties] Properties to set
     * @returns {HostageModeLevelMeta} HostageModeLevelMeta instance
     */
    HostageModeLevelMeta.create = function create(properties) {
        return new HostageModeLevelMeta(properties);
    };

    /**
     * Encodes the specified HostageModeLevelMeta message. Does not implicitly {@link HostageModeLevelMeta.verify|verify} messages.
     * @function encode
     * @memberof HostageModeLevelMeta
     * @static
     * @param {IHostageModeLevelMeta} message HostageModeLevelMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    HostageModeLevelMeta.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.level);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.goldBulletNum);
        return writer;
    };

    /**
     * Encodes the specified HostageModeLevelMeta message, length delimited. Does not implicitly {@link HostageModeLevelMeta.verify|verify} messages.
     * @function encodeDelimited
     * @memberof HostageModeLevelMeta
     * @static
     * @param {IHostageModeLevelMeta} message HostageModeLevelMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    HostageModeLevelMeta.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a HostageModeLevelMeta message from the specified reader or buffer.
     * @function decode
     * @memberof HostageModeLevelMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {HostageModeLevelMeta} HostageModeLevelMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    HostageModeLevelMeta.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.HostageModeLevelMeta();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.level = reader.int32();
                break;
            case 2:
                message.goldBulletNum = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("level"))
            throw $util.ProtocolError("missing required 'level'", { instance: message });
        if (!message.hasOwnProperty("goldBulletNum"))
            throw $util.ProtocolError("missing required 'goldBulletNum'", { instance: message });
        return message;
    };

    /**
     * Decodes a HostageModeLevelMeta message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof HostageModeLevelMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {HostageModeLevelMeta} HostageModeLevelMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    HostageModeLevelMeta.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a HostageModeLevelMeta message.
     * @function verify
     * @memberof HostageModeLevelMeta
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    HostageModeLevelMeta.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.level))
            return "level: integer expected";
        if (!$util.isInteger(message.goldBulletNum))
            return "goldBulletNum: integer expected";
        return null;
    };

    /**
     * Creates a HostageModeLevelMeta message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof HostageModeLevelMeta
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {HostageModeLevelMeta} HostageModeLevelMeta
     */
    HostageModeLevelMeta.fromObject = function fromObject(object) {
        if (object instanceof $root.HostageModeLevelMeta)
            return object;
        let message = new $root.HostageModeLevelMeta();
        if (object.level != null)
            message.level = object.level | 0;
        if (object.goldBulletNum != null)
            message.goldBulletNum = object.goldBulletNum | 0;
        return message;
    };

    /**
     * Creates a plain object from a HostageModeLevelMeta message. Also converts values to other types if specified.
     * @function toObject
     * @memberof HostageModeLevelMeta
     * @static
     * @param {HostageModeLevelMeta} message HostageModeLevelMeta
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    HostageModeLevelMeta.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.level = 0;
            object.goldBulletNum = 0;
        }
        if (message.level != null && message.hasOwnProperty("level"))
            object.level = message.level;
        if (message.goldBulletNum != null && message.hasOwnProperty("goldBulletNum"))
            object.goldBulletNum = message.goldBulletNum;
        return object;
    };

    /**
     * Converts this HostageModeLevelMeta to JSON.
     * @function toJSON
     * @memberof HostageModeLevelMeta
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    HostageModeLevelMeta.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return HostageModeLevelMeta;
})();

export const SurvivalModeLevelMeta = $root.SurvivalModeLevelMeta = (() => {

    /**
     * Properties of a SurvivalModeLevelMeta.
     * @exports ISurvivalModeLevelMeta
     * @interface ISurvivalModeLevelMeta
     * @property {number} level SurvivalModeLevelMeta level
     * @property {number} goldBulletNum SurvivalModeLevelMeta goldBulletNum
     */

    /**
     * Constructs a new SurvivalModeLevelMeta.
     * @exports SurvivalModeLevelMeta
     * @classdesc Represents a SurvivalModeLevelMeta.
     * @implements ISurvivalModeLevelMeta
     * @constructor
     * @param {ISurvivalModeLevelMeta=} [properties] Properties to set
     */
    function SurvivalModeLevelMeta(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SurvivalModeLevelMeta level.
     * @member {number} level
     * @memberof SurvivalModeLevelMeta
     * @instance
     */
    SurvivalModeLevelMeta.prototype.level = 0;

    /**
     * SurvivalModeLevelMeta goldBulletNum.
     * @member {number} goldBulletNum
     * @memberof SurvivalModeLevelMeta
     * @instance
     */
    SurvivalModeLevelMeta.prototype.goldBulletNum = 0;

    /**
     * Creates a new SurvivalModeLevelMeta instance using the specified properties.
     * @function create
     * @memberof SurvivalModeLevelMeta
     * @static
     * @param {ISurvivalModeLevelMeta=} [properties] Properties to set
     * @returns {SurvivalModeLevelMeta} SurvivalModeLevelMeta instance
     */
    SurvivalModeLevelMeta.create = function create(properties) {
        return new SurvivalModeLevelMeta(properties);
    };

    /**
     * Encodes the specified SurvivalModeLevelMeta message. Does not implicitly {@link SurvivalModeLevelMeta.verify|verify} messages.
     * @function encode
     * @memberof SurvivalModeLevelMeta
     * @static
     * @param {ISurvivalModeLevelMeta} message SurvivalModeLevelMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SurvivalModeLevelMeta.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.level);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.goldBulletNum);
        return writer;
    };

    /**
     * Encodes the specified SurvivalModeLevelMeta message, length delimited. Does not implicitly {@link SurvivalModeLevelMeta.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SurvivalModeLevelMeta
     * @static
     * @param {ISurvivalModeLevelMeta} message SurvivalModeLevelMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SurvivalModeLevelMeta.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SurvivalModeLevelMeta message from the specified reader or buffer.
     * @function decode
     * @memberof SurvivalModeLevelMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SurvivalModeLevelMeta} SurvivalModeLevelMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SurvivalModeLevelMeta.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SurvivalModeLevelMeta();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.level = reader.int32();
                break;
            case 2:
                message.goldBulletNum = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("level"))
            throw $util.ProtocolError("missing required 'level'", { instance: message });
        if (!message.hasOwnProperty("goldBulletNum"))
            throw $util.ProtocolError("missing required 'goldBulletNum'", { instance: message });
        return message;
    };

    /**
     * Decodes a SurvivalModeLevelMeta message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SurvivalModeLevelMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SurvivalModeLevelMeta} SurvivalModeLevelMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SurvivalModeLevelMeta.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SurvivalModeLevelMeta message.
     * @function verify
     * @memberof SurvivalModeLevelMeta
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SurvivalModeLevelMeta.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.level))
            return "level: integer expected";
        if (!$util.isInteger(message.goldBulletNum))
            return "goldBulletNum: integer expected";
        return null;
    };

    /**
     * Creates a SurvivalModeLevelMeta message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SurvivalModeLevelMeta
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SurvivalModeLevelMeta} SurvivalModeLevelMeta
     */
    SurvivalModeLevelMeta.fromObject = function fromObject(object) {
        if (object instanceof $root.SurvivalModeLevelMeta)
            return object;
        let message = new $root.SurvivalModeLevelMeta();
        if (object.level != null)
            message.level = object.level | 0;
        if (object.goldBulletNum != null)
            message.goldBulletNum = object.goldBulletNum | 0;
        return message;
    };

    /**
     * Creates a plain object from a SurvivalModeLevelMeta message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SurvivalModeLevelMeta
     * @static
     * @param {SurvivalModeLevelMeta} message SurvivalModeLevelMeta
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SurvivalModeLevelMeta.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.level = 0;
            object.goldBulletNum = 0;
        }
        if (message.level != null && message.hasOwnProperty("level"))
            object.level = message.level;
        if (message.goldBulletNum != null && message.hasOwnProperty("goldBulletNum"))
            object.goldBulletNum = message.goldBulletNum;
        return object;
    };

    /**
     * Converts this SurvivalModeLevelMeta to JSON.
     * @function toJSON
     * @memberof SurvivalModeLevelMeta
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SurvivalModeLevelMeta.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SurvivalModeLevelMeta;
})();

export { $root as default };
