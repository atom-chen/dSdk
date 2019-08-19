import * as $protobuf from "./protobufjs";
/** Properties of a ClassicalModeLevelMeta. */
export interface IClassicalModeLevelMeta {

    /** ClassicalModeLevelMeta level */
    level: number;

    /** ClassicalModeLevelMeta goldBulletNum */
    goldBulletNum: number;
}

/** Represents a ClassicalModeLevelMeta. */
export class ClassicalModeLevelMeta implements IClassicalModeLevelMeta {

    /**
     * Constructs a new ClassicalModeLevelMeta.
     * @param [properties] Properties to set
     */
    constructor(properties?: IClassicalModeLevelMeta);

    /** ClassicalModeLevelMeta level. */
    public level: number;

    /** ClassicalModeLevelMeta goldBulletNum. */
    public goldBulletNum: number;

    /**
     * Creates a new ClassicalModeLevelMeta instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ClassicalModeLevelMeta instance
     */
    public static create(properties?: IClassicalModeLevelMeta): ClassicalModeLevelMeta;

    /**
     * Encodes the specified ClassicalModeLevelMeta message. Does not implicitly {@link ClassicalModeLevelMeta.verify|verify} messages.
     * @param message ClassicalModeLevelMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IClassicalModeLevelMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ClassicalModeLevelMeta message, length delimited. Does not implicitly {@link ClassicalModeLevelMeta.verify|verify} messages.
     * @param message ClassicalModeLevelMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IClassicalModeLevelMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ClassicalModeLevelMeta message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ClassicalModeLevelMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ClassicalModeLevelMeta;

    /**
     * Decodes a ClassicalModeLevelMeta message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ClassicalModeLevelMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ClassicalModeLevelMeta;

    /**
     * Verifies a ClassicalModeLevelMeta message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ClassicalModeLevelMeta message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ClassicalModeLevelMeta
     */
    public static fromObject(object: { [k: string]: any }): ClassicalModeLevelMeta;

    /**
     * Creates a plain object from a ClassicalModeLevelMeta message. Also converts values to other types if specified.
     * @param message ClassicalModeLevelMeta
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ClassicalModeLevelMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ClassicalModeLevelMeta to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a CoinRewardMeta. */
export interface ICoinRewardMeta {

    /** CoinRewardMeta rewardNum */
    rewardNum: number;
}

/** Represents a CoinRewardMeta. */
export class CoinRewardMeta implements ICoinRewardMeta {

    /**
     * Constructs a new CoinRewardMeta.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICoinRewardMeta);

    /** CoinRewardMeta rewardNum. */
    public rewardNum: number;

    /**
     * Creates a new CoinRewardMeta instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CoinRewardMeta instance
     */
    public static create(properties?: ICoinRewardMeta): CoinRewardMeta;

    /**
     * Encodes the specified CoinRewardMeta message. Does not implicitly {@link CoinRewardMeta.verify|verify} messages.
     * @param message CoinRewardMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICoinRewardMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CoinRewardMeta message, length delimited. Does not implicitly {@link CoinRewardMeta.verify|verify} messages.
     * @param message CoinRewardMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICoinRewardMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CoinRewardMeta message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CoinRewardMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CoinRewardMeta;

    /**
     * Decodes a CoinRewardMeta message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CoinRewardMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CoinRewardMeta;

    /**
     * Verifies a CoinRewardMeta message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CoinRewardMeta message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CoinRewardMeta
     */
    public static fromObject(object: { [k: string]: any }): CoinRewardMeta;

    /**
     * Creates a plain object from a CoinRewardMeta message. Also converts values to other types if specified.
     * @param message CoinRewardMeta
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CoinRewardMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CoinRewardMeta to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an EnergyMeta. */
export interface IEnergyMeta {

    /** EnergyMeta initialNum */
    initialNum: number;

    /** EnergyMeta upperLimit */
    upperLimit: number;

    /** EnergyMeta recoverInterval */
    recoverInterval: number;

    /** EnergyMeta recoverNum */
    recoverNum: number;

    /** EnergyMeta energyExchange */
    energyExchange: number;

    /** EnergyMeta goldenergyExchange */
    goldenergyExchange: number;

    /** EnergyMeta goldPrice */
    goldPrice: number;
}

/** Represents an EnergyMeta. */
export class EnergyMeta implements IEnergyMeta {

    /**
     * Constructs a new EnergyMeta.
     * @param [properties] Properties to set
     */
    constructor(properties?: IEnergyMeta);

    /** EnergyMeta initialNum. */
    public initialNum: number;

    /** EnergyMeta upperLimit. */
    public upperLimit: number;

    /** EnergyMeta recoverInterval. */
    public recoverInterval: number;

    /** EnergyMeta recoverNum. */
    public recoverNum: number;

    /** EnergyMeta energyExchange. */
    public energyExchange: number;

    /** EnergyMeta goldenergyExchange. */
    public goldenergyExchange: number;

    /** EnergyMeta goldPrice. */
    public goldPrice: number;

    /**
     * Creates a new EnergyMeta instance using the specified properties.
     * @param [properties] Properties to set
     * @returns EnergyMeta instance
     */
    public static create(properties?: IEnergyMeta): EnergyMeta;

    /**
     * Encodes the specified EnergyMeta message. Does not implicitly {@link EnergyMeta.verify|verify} messages.
     * @param message EnergyMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IEnergyMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified EnergyMeta message, length delimited. Does not implicitly {@link EnergyMeta.verify|verify} messages.
     * @param message EnergyMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IEnergyMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an EnergyMeta message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns EnergyMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): EnergyMeta;

    /**
     * Decodes an EnergyMeta message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns EnergyMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): EnergyMeta;

    /**
     * Verifies an EnergyMeta message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an EnergyMeta message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns EnergyMeta
     */
    public static fromObject(object: { [k: string]: any }): EnergyMeta;

    /**
     * Creates a plain object from an EnergyMeta message. Also converts values to other types if specified.
     * @param message EnergyMeta
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: EnergyMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this EnergyMeta to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a GameMeta. */
export interface IGameMeta {

    /** GameMeta classicalModeLevelMeta */
    classicalModeLevelMeta?: (IClassicalModeLevelMeta[]|null);

    /** GameMeta metaVer */
    metaVer: (number|Long);

    /** GameMeta signInMeta */
    signInMeta?: (ISignInMeta[]|null);

    /** GameMeta coinRewardMeta */
    coinRewardMeta?: (ICoinRewardMeta[]|null);

    /** GameMeta imageUpgradeMeta */
    imageUpgradeMeta?: (IImageUpgradeMeta[]|null);

    /** GameMeta settlementRewardMeta */
    settlementRewardMeta?: (ISettlementRewardMeta[]|null);

    /** GameMeta miniGameMeta */
    miniGameMeta?: (IMiniGameMeta[]|null);

    /** GameMeta welfareCentreMeta */
    welfareCentreMeta?: (IWelfareCentreMeta[]|null);

    /** GameMeta keyRewardMeta */
    keyRewardMeta?: (IKeyRewardMeta[]|null);

    /** GameMeta newModeUnlockMeta */
    newModeUnlockMeta?: (INewModeUnlockMeta[]|null);

    /** GameMeta energyMeta */
    energyMeta?: (IEnergyMeta[]|null);

    /** GameMeta grenadeModeLevelMeta */
    grenadeModeLevelMeta?: (IGrenadeModeLevelMeta[]|null);

    /** GameMeta hostageModeLevelMeta */
    hostageModeLevelMeta?: (IHostageModeLevelMeta[]|null);

    /** GameMeta survivalModeLevelMeta */
    survivalModeLevelMeta?: (ISurvivalModeLevelMeta[]|null);
}

/** Represents a GameMeta. */
export class GameMeta implements IGameMeta {

    /**
     * Constructs a new GameMeta.
     * @param [properties] Properties to set
     */
    constructor(properties?: IGameMeta);

    /** GameMeta classicalModeLevelMeta. */
    public classicalModeLevelMeta: IClassicalModeLevelMeta[];

    /** GameMeta metaVer. */
    public metaVer: (number|Long);

    /** GameMeta signInMeta. */
    public signInMeta: ISignInMeta[];

    /** GameMeta coinRewardMeta. */
    public coinRewardMeta: ICoinRewardMeta[];

    /** GameMeta imageUpgradeMeta. */
    public imageUpgradeMeta: IImageUpgradeMeta[];

    /** GameMeta settlementRewardMeta. */
    public settlementRewardMeta: ISettlementRewardMeta[];

    /** GameMeta miniGameMeta. */
    public miniGameMeta: IMiniGameMeta[];

    /** GameMeta welfareCentreMeta. */
    public welfareCentreMeta: IWelfareCentreMeta[];

    /** GameMeta keyRewardMeta. */
    public keyRewardMeta: IKeyRewardMeta[];

    /** GameMeta newModeUnlockMeta. */
    public newModeUnlockMeta: INewModeUnlockMeta[];

    /** GameMeta energyMeta. */
    public energyMeta: IEnergyMeta[];

    /** GameMeta grenadeModeLevelMeta. */
    public grenadeModeLevelMeta: IGrenadeModeLevelMeta[];

    /** GameMeta hostageModeLevelMeta. */
    public hostageModeLevelMeta: IHostageModeLevelMeta[];

    /** GameMeta survivalModeLevelMeta. */
    public survivalModeLevelMeta: ISurvivalModeLevelMeta[];

    /**
     * Creates a new GameMeta instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GameMeta instance
     */
    public static create(properties?: IGameMeta): GameMeta;

    /**
     * Encodes the specified GameMeta message. Does not implicitly {@link GameMeta.verify|verify} messages.
     * @param message GameMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IGameMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GameMeta message, length delimited. Does not implicitly {@link GameMeta.verify|verify} messages.
     * @param message GameMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IGameMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GameMeta message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GameMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GameMeta;

    /**
     * Decodes a GameMeta message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GameMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GameMeta;

    /**
     * Verifies a GameMeta message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a GameMeta message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GameMeta
     */
    public static fromObject(object: { [k: string]: any }): GameMeta;

    /**
     * Creates a plain object from a GameMeta message. Also converts values to other types if specified.
     * @param message GameMeta
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: GameMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this GameMeta to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a SignInMeta. */
export interface ISignInMeta {

    /** SignInMeta days */
    days: number;

    /** SignInMeta coinNum */
    coinNum: number;
}

/** Represents a SignInMeta. */
export class SignInMeta implements ISignInMeta {

    /**
     * Constructs a new SignInMeta.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISignInMeta);

    /** SignInMeta days. */
    public days: number;

    /** SignInMeta coinNum. */
    public coinNum: number;

    /**
     * Creates a new SignInMeta instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SignInMeta instance
     */
    public static create(properties?: ISignInMeta): SignInMeta;

    /**
     * Encodes the specified SignInMeta message. Does not implicitly {@link SignInMeta.verify|verify} messages.
     * @param message SignInMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISignInMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SignInMeta message, length delimited. Does not implicitly {@link SignInMeta.verify|verify} messages.
     * @param message SignInMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISignInMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SignInMeta message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SignInMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SignInMeta;

    /**
     * Decodes a SignInMeta message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SignInMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SignInMeta;

    /**
     * Verifies a SignInMeta message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SignInMeta message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SignInMeta
     */
    public static fromObject(object: { [k: string]: any }): SignInMeta;

    /**
     * Creates a plain object from a SignInMeta message. Also converts values to other types if specified.
     * @param message SignInMeta
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SignInMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SignInMeta to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an ImageUpgradeMeta. */
export interface IImageUpgradeMeta {

    /** ImageUpgradeMeta grade */
    grade: number;

    /** ImageUpgradeMeta imageId */
    imageId: string;

    /** ImageUpgradeMeta name */
    name: string;

    /** ImageUpgradeMeta backgroundId */
    backgroundId: string;

    /** ImageUpgradeMeta starsNum */
    starsNum: number;
}

/** Represents an ImageUpgradeMeta. */
export class ImageUpgradeMeta implements IImageUpgradeMeta {

    /**
     * Constructs a new ImageUpgradeMeta.
     * @param [properties] Properties to set
     */
    constructor(properties?: IImageUpgradeMeta);

    /** ImageUpgradeMeta grade. */
    public grade: number;

    /** ImageUpgradeMeta imageId. */
    public imageId: string;

    /** ImageUpgradeMeta name. */
    public name: string;

    /** ImageUpgradeMeta backgroundId. */
    public backgroundId: string;

    /** ImageUpgradeMeta starsNum. */
    public starsNum: number;

    /**
     * Creates a new ImageUpgradeMeta instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ImageUpgradeMeta instance
     */
    public static create(properties?: IImageUpgradeMeta): ImageUpgradeMeta;

    /**
     * Encodes the specified ImageUpgradeMeta message. Does not implicitly {@link ImageUpgradeMeta.verify|verify} messages.
     * @param message ImageUpgradeMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IImageUpgradeMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ImageUpgradeMeta message, length delimited. Does not implicitly {@link ImageUpgradeMeta.verify|verify} messages.
     * @param message ImageUpgradeMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IImageUpgradeMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ImageUpgradeMeta message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ImageUpgradeMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ImageUpgradeMeta;

    /**
     * Decodes an ImageUpgradeMeta message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ImageUpgradeMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ImageUpgradeMeta;

    /**
     * Verifies an ImageUpgradeMeta message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ImageUpgradeMeta message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ImageUpgradeMeta
     */
    public static fromObject(object: { [k: string]: any }): ImageUpgradeMeta;

    /**
     * Creates a plain object from an ImageUpgradeMeta message. Also converts values to other types if specified.
     * @param message ImageUpgradeMeta
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ImageUpgradeMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ImageUpgradeMeta to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a SettlementRewardMeta. */
export interface ISettlementRewardMeta {

    /** SettlementRewardMeta lose */
    lose: number;

    /** SettlementRewardMeta oneStarsReward */
    oneStarsReward: number;

    /** SettlementRewardMeta extraBonus */
    extraBonus: number;

    /** SettlementRewardMeta videoRefreshNum */
    videoRefreshNum: number;

    /** SettlementRewardMeta shareRefreshNum */
    shareRefreshNum: number;

    /** SettlementRewardMeta bulletReboundNum */
    bulletReboundNum: number;
}

/** Represents a SettlementRewardMeta. */
export class SettlementRewardMeta implements ISettlementRewardMeta {

    /**
     * Constructs a new SettlementRewardMeta.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISettlementRewardMeta);

    /** SettlementRewardMeta lose. */
    public lose: number;

    /** SettlementRewardMeta oneStarsReward. */
    public oneStarsReward: number;

    /** SettlementRewardMeta extraBonus. */
    public extraBonus: number;

    /** SettlementRewardMeta videoRefreshNum. */
    public videoRefreshNum: number;

    /** SettlementRewardMeta shareRefreshNum. */
    public shareRefreshNum: number;

    /** SettlementRewardMeta bulletReboundNum. */
    public bulletReboundNum: number;

    /**
     * Creates a new SettlementRewardMeta instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SettlementRewardMeta instance
     */
    public static create(properties?: ISettlementRewardMeta): SettlementRewardMeta;

    /**
     * Encodes the specified SettlementRewardMeta message. Does not implicitly {@link SettlementRewardMeta.verify|verify} messages.
     * @param message SettlementRewardMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISettlementRewardMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SettlementRewardMeta message, length delimited. Does not implicitly {@link SettlementRewardMeta.verify|verify} messages.
     * @param message SettlementRewardMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISettlementRewardMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SettlementRewardMeta message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SettlementRewardMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SettlementRewardMeta;

    /**
     * Decodes a SettlementRewardMeta message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SettlementRewardMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SettlementRewardMeta;

    /**
     * Verifies a SettlementRewardMeta message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SettlementRewardMeta message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SettlementRewardMeta
     */
    public static fromObject(object: { [k: string]: any }): SettlementRewardMeta;

    /**
     * Creates a plain object from a SettlementRewardMeta message. Also converts values to other types if specified.
     * @param message SettlementRewardMeta
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SettlementRewardMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SettlementRewardMeta to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a MiniGameMeta. */
export interface IMiniGameMeta {

    /** MiniGameMeta type */
    type: number;

    /** MiniGameMeta num */
    num: number;

    /** MiniGameMeta probability */
    probability: number;
}

/** Represents a MiniGameMeta. */
export class MiniGameMeta implements IMiniGameMeta {

    /**
     * Constructs a new MiniGameMeta.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMiniGameMeta);

    /** MiniGameMeta type. */
    public type: number;

    /** MiniGameMeta num. */
    public num: number;

    /** MiniGameMeta probability. */
    public probability: number;

    /**
     * Creates a new MiniGameMeta instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MiniGameMeta instance
     */
    public static create(properties?: IMiniGameMeta): MiniGameMeta;

    /**
     * Encodes the specified MiniGameMeta message. Does not implicitly {@link MiniGameMeta.verify|verify} messages.
     * @param message MiniGameMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMiniGameMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MiniGameMeta message, length delimited. Does not implicitly {@link MiniGameMeta.verify|verify} messages.
     * @param message MiniGameMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMiniGameMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MiniGameMeta message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MiniGameMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MiniGameMeta;

    /**
     * Decodes a MiniGameMeta message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MiniGameMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MiniGameMeta;

    /**
     * Verifies a MiniGameMeta message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MiniGameMeta message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MiniGameMeta
     */
    public static fromObject(object: { [k: string]: any }): MiniGameMeta;

    /**
     * Creates a plain object from a MiniGameMeta message. Also converts values to other types if specified.
     * @param message MiniGameMeta
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MiniGameMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MiniGameMeta to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a WelfareCentreMeta. */
export interface IWelfareCentreMeta {

    /** WelfareCentreMeta coinReward */
    coinReward: number;
}

/** Represents a WelfareCentreMeta. */
export class WelfareCentreMeta implements IWelfareCentreMeta {

    /**
     * Constructs a new WelfareCentreMeta.
     * @param [properties] Properties to set
     */
    constructor(properties?: IWelfareCentreMeta);

    /** WelfareCentreMeta coinReward. */
    public coinReward: number;

    /**
     * Creates a new WelfareCentreMeta instance using the specified properties.
     * @param [properties] Properties to set
     * @returns WelfareCentreMeta instance
     */
    public static create(properties?: IWelfareCentreMeta): WelfareCentreMeta;

    /**
     * Encodes the specified WelfareCentreMeta message. Does not implicitly {@link WelfareCentreMeta.verify|verify} messages.
     * @param message WelfareCentreMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IWelfareCentreMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified WelfareCentreMeta message, length delimited. Does not implicitly {@link WelfareCentreMeta.verify|verify} messages.
     * @param message WelfareCentreMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IWelfareCentreMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a WelfareCentreMeta message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns WelfareCentreMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WelfareCentreMeta;

    /**
     * Decodes a WelfareCentreMeta message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns WelfareCentreMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): WelfareCentreMeta;

    /**
     * Verifies a WelfareCentreMeta message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a WelfareCentreMeta message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns WelfareCentreMeta
     */
    public static fromObject(object: { [k: string]: any }): WelfareCentreMeta;

    /**
     * Creates a plain object from a WelfareCentreMeta message. Also converts values to other types if specified.
     * @param message WelfareCentreMeta
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: WelfareCentreMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this WelfareCentreMeta to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a KeyRewardMeta. */
export interface IKeyRewardMeta {

    /** KeyRewardMeta num */
    num: number;

    /** KeyRewardMeta price */
    price: number;
}

/** Represents a KeyRewardMeta. */
export class KeyRewardMeta implements IKeyRewardMeta {

    /**
     * Constructs a new KeyRewardMeta.
     * @param [properties] Properties to set
     */
    constructor(properties?: IKeyRewardMeta);

    /** KeyRewardMeta num. */
    public num: number;

    /** KeyRewardMeta price. */
    public price: number;

    /**
     * Creates a new KeyRewardMeta instance using the specified properties.
     * @param [properties] Properties to set
     * @returns KeyRewardMeta instance
     */
    public static create(properties?: IKeyRewardMeta): KeyRewardMeta;

    /**
     * Encodes the specified KeyRewardMeta message. Does not implicitly {@link KeyRewardMeta.verify|verify} messages.
     * @param message KeyRewardMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IKeyRewardMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified KeyRewardMeta message, length delimited. Does not implicitly {@link KeyRewardMeta.verify|verify} messages.
     * @param message KeyRewardMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IKeyRewardMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a KeyRewardMeta message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns KeyRewardMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): KeyRewardMeta;

    /**
     * Decodes a KeyRewardMeta message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns KeyRewardMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): KeyRewardMeta;

    /**
     * Verifies a KeyRewardMeta message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a KeyRewardMeta message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns KeyRewardMeta
     */
    public static fromObject(object: { [k: string]: any }): KeyRewardMeta;

    /**
     * Creates a plain object from a KeyRewardMeta message. Also converts values to other types if specified.
     * @param message KeyRewardMeta
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: KeyRewardMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this KeyRewardMeta to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a NewModeUnlockMeta. */
export interface INewModeUnlockMeta {

    /** NewModeUnlockMeta modeName */
    modeName: string;

    /** NewModeUnlockMeta starsNum */
    starsNum: number;

    /** NewModeUnlockMeta refreshNum */
    refreshNum: number;
}

/** Represents a NewModeUnlockMeta. */
export class NewModeUnlockMeta implements INewModeUnlockMeta {

    /**
     * Constructs a new NewModeUnlockMeta.
     * @param [properties] Properties to set
     */
    constructor(properties?: INewModeUnlockMeta);

    /** NewModeUnlockMeta modeName. */
    public modeName: string;

    /** NewModeUnlockMeta starsNum. */
    public starsNum: number;

    /** NewModeUnlockMeta refreshNum. */
    public refreshNum: number;

    /**
     * Creates a new NewModeUnlockMeta instance using the specified properties.
     * @param [properties] Properties to set
     * @returns NewModeUnlockMeta instance
     */
    public static create(properties?: INewModeUnlockMeta): NewModeUnlockMeta;

    /**
     * Encodes the specified NewModeUnlockMeta message. Does not implicitly {@link NewModeUnlockMeta.verify|verify} messages.
     * @param message NewModeUnlockMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: INewModeUnlockMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified NewModeUnlockMeta message, length delimited. Does not implicitly {@link NewModeUnlockMeta.verify|verify} messages.
     * @param message NewModeUnlockMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: INewModeUnlockMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a NewModeUnlockMeta message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns NewModeUnlockMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): NewModeUnlockMeta;

    /**
     * Decodes a NewModeUnlockMeta message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns NewModeUnlockMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): NewModeUnlockMeta;

    /**
     * Verifies a NewModeUnlockMeta message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a NewModeUnlockMeta message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns NewModeUnlockMeta
     */
    public static fromObject(object: { [k: string]: any }): NewModeUnlockMeta;

    /**
     * Creates a plain object from a NewModeUnlockMeta message. Also converts values to other types if specified.
     * @param message NewModeUnlockMeta
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: NewModeUnlockMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this NewModeUnlockMeta to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a GrenadeModeLevelMeta. */
export interface IGrenadeModeLevelMeta {

    /** GrenadeModeLevelMeta level */
    level: number;

    /** GrenadeModeLevelMeta goldBulletNum */
    goldBulletNum: number;
}

/** Represents a GrenadeModeLevelMeta. */
export class GrenadeModeLevelMeta implements IGrenadeModeLevelMeta {

    /**
     * Constructs a new GrenadeModeLevelMeta.
     * @param [properties] Properties to set
     */
    constructor(properties?: IGrenadeModeLevelMeta);

    /** GrenadeModeLevelMeta level. */
    public level: number;

    /** GrenadeModeLevelMeta goldBulletNum. */
    public goldBulletNum: number;

    /**
     * Creates a new GrenadeModeLevelMeta instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GrenadeModeLevelMeta instance
     */
    public static create(properties?: IGrenadeModeLevelMeta): GrenadeModeLevelMeta;

    /**
     * Encodes the specified GrenadeModeLevelMeta message. Does not implicitly {@link GrenadeModeLevelMeta.verify|verify} messages.
     * @param message GrenadeModeLevelMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IGrenadeModeLevelMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GrenadeModeLevelMeta message, length delimited. Does not implicitly {@link GrenadeModeLevelMeta.verify|verify} messages.
     * @param message GrenadeModeLevelMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IGrenadeModeLevelMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GrenadeModeLevelMeta message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GrenadeModeLevelMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GrenadeModeLevelMeta;

    /**
     * Decodes a GrenadeModeLevelMeta message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GrenadeModeLevelMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GrenadeModeLevelMeta;

    /**
     * Verifies a GrenadeModeLevelMeta message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a GrenadeModeLevelMeta message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GrenadeModeLevelMeta
     */
    public static fromObject(object: { [k: string]: any }): GrenadeModeLevelMeta;

    /**
     * Creates a plain object from a GrenadeModeLevelMeta message. Also converts values to other types if specified.
     * @param message GrenadeModeLevelMeta
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: GrenadeModeLevelMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this GrenadeModeLevelMeta to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a HostageModeLevelMeta. */
export interface IHostageModeLevelMeta {

    /** HostageModeLevelMeta level */
    level: number;

    /** HostageModeLevelMeta goldBulletNum */
    goldBulletNum: number;
}

/** Represents a HostageModeLevelMeta. */
export class HostageModeLevelMeta implements IHostageModeLevelMeta {

    /**
     * Constructs a new HostageModeLevelMeta.
     * @param [properties] Properties to set
     */
    constructor(properties?: IHostageModeLevelMeta);

    /** HostageModeLevelMeta level. */
    public level: number;

    /** HostageModeLevelMeta goldBulletNum. */
    public goldBulletNum: number;

    /**
     * Creates a new HostageModeLevelMeta instance using the specified properties.
     * @param [properties] Properties to set
     * @returns HostageModeLevelMeta instance
     */
    public static create(properties?: IHostageModeLevelMeta): HostageModeLevelMeta;

    /**
     * Encodes the specified HostageModeLevelMeta message. Does not implicitly {@link HostageModeLevelMeta.verify|verify} messages.
     * @param message HostageModeLevelMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IHostageModeLevelMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified HostageModeLevelMeta message, length delimited. Does not implicitly {@link HostageModeLevelMeta.verify|verify} messages.
     * @param message HostageModeLevelMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IHostageModeLevelMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a HostageModeLevelMeta message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns HostageModeLevelMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): HostageModeLevelMeta;

    /**
     * Decodes a HostageModeLevelMeta message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns HostageModeLevelMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): HostageModeLevelMeta;

    /**
     * Verifies a HostageModeLevelMeta message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a HostageModeLevelMeta message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns HostageModeLevelMeta
     */
    public static fromObject(object: { [k: string]: any }): HostageModeLevelMeta;

    /**
     * Creates a plain object from a HostageModeLevelMeta message. Also converts values to other types if specified.
     * @param message HostageModeLevelMeta
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: HostageModeLevelMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this HostageModeLevelMeta to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a SurvivalModeLevelMeta. */
export interface ISurvivalModeLevelMeta {

    /** SurvivalModeLevelMeta level */
    level: number;

    /** SurvivalModeLevelMeta goldBulletNum */
    goldBulletNum: number;
}

/** Represents a SurvivalModeLevelMeta. */
export class SurvivalModeLevelMeta implements ISurvivalModeLevelMeta {

    /**
     * Constructs a new SurvivalModeLevelMeta.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISurvivalModeLevelMeta);

    /** SurvivalModeLevelMeta level. */
    public level: number;

    /** SurvivalModeLevelMeta goldBulletNum. */
    public goldBulletNum: number;

    /**
     * Creates a new SurvivalModeLevelMeta instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SurvivalModeLevelMeta instance
     */
    public static create(properties?: ISurvivalModeLevelMeta): SurvivalModeLevelMeta;

    /**
     * Encodes the specified SurvivalModeLevelMeta message. Does not implicitly {@link SurvivalModeLevelMeta.verify|verify} messages.
     * @param message SurvivalModeLevelMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISurvivalModeLevelMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SurvivalModeLevelMeta message, length delimited. Does not implicitly {@link SurvivalModeLevelMeta.verify|verify} messages.
     * @param message SurvivalModeLevelMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISurvivalModeLevelMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SurvivalModeLevelMeta message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SurvivalModeLevelMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SurvivalModeLevelMeta;

    /**
     * Decodes a SurvivalModeLevelMeta message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SurvivalModeLevelMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SurvivalModeLevelMeta;

    /**
     * Verifies a SurvivalModeLevelMeta message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SurvivalModeLevelMeta message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SurvivalModeLevelMeta
     */
    public static fromObject(object: { [k: string]: any }): SurvivalModeLevelMeta;

    /**
     * Creates a plain object from a SurvivalModeLevelMeta message. Also converts values to other types if specified.
     * @param message SurvivalModeLevelMeta
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SurvivalModeLevelMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SurvivalModeLevelMeta to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
