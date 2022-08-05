export interface IncomingWebSocketMessage {
    type: string;
    data: IncomingDataType;
}

export type IncomingDataType = CrossControlInfoMsg

export type OutcomingWebSocketMessage = OutcomingDataType

export type OutcomingDataType = any

export interface CrossControlInfoMsg {
    areaMap: AreaMap;
    deviceIP: string;
    edit: boolean;
    history: History[];
    state: State | undefined;
}

export interface State {
    region: number;
    area: number;
    subarea: number;
    id: number;
    idevice: number;
    dgis: string;
    contype: string;
    numdev: number;
    scale: number;
    name: string;
    phone: string;
    wifi: string;
    status: number;
    Arm: string;
    pk: number;
    ck: number;
    nk: number;
    Model: Model;
    arrays: Arrays;
}

export interface Arrays {
    type: number;
    SetupDK: SetupDK;
    SetDK: SetDK;
    MonthSets: MonthSets;
    WeekSets: WeekSets;
    DaySets: DaySets;
    SetCtrl: SetCtrl;
    SetTimeUse: SetTimeUse;
    timedev: Timedev;
    defstatis: Defstatis;
    pointset: Pointset;
    useinput: Useinput;
    mgrs: Mgr[];
}

export interface AreaMap {
    [index: number]: string
}

export interface History {
    time: Date;
    login: string;
}

export interface Model {
    vpcpdl: number;
    vpcpdr: number;
    vpbsl: number;
    vpbsr: number;
    C12: boolean;
    STP: boolean;
    DKA: boolean;
    DTA: boolean;
}

export interface SetupDK {
    dkn: number;
    tmaxf: number;
    tminf: number;
    tminmax: number;
    dktype: number;
    extn: number;
    tprom: number;
    preset: boolean;
}

export interface St {
    line: number;
    start: number;
    num: number;
    tf: number;
    stop: number;
    plus: boolean;
    trs: boolean;
    dt: number;
}

export interface Pk {
    dk: number;
    pk: number;
    desc: string;
    tpu: number;
    razlen: boolean;
    tc: number;
    shift: number;
    twot: boolean;
    sts: St[];
}

export interface SetDK {
    dk: Pk[];
}

export interface Gk {
    num: number;
    days: number[];
}

export interface MonthSets {
    monthset: Gk[];
}

export interface Nk {
    num: number;
    days: number[];
}

export interface WeekSets {
    wsets: Nk[];
}

export interface Line {
    npk: number;
    hour: number;
    min: number;
}

export interface Sk {
    num: number;
    count: number;
    lines: Line[];
}

export interface DaySets {
    daysets: Sk[];
}

export interface Start {
    hour: number;
    min: number;
}

export interface End {
    hour: number;
    min: number;
}

export interface Stage {
    line: number;
    start: Start;
    end: End;
    lenTVP: number;
    lenMGR: number;
}

export interface SetCtrl {
    Stage: Stage[];
}

export interface Us {
    name: string;
    type: number;
    tvps: number;
    dk: number;
    fazes: string;
    long: number;
}

export interface SetTimeUse {
    uses: Us[];
    ite: number;
    notwork: number[];
}

export interface Timedev {
    tz: number;
    summer: boolean;
    journal: boolean;
    nogprs: boolean;
}

export interface Lv {
    typst: number;
    period: number;
    ninput: number;
    count: number;
}

export interface Defstatis {
    lvs: Lv[];
}

export interface Pt {
    num: number;
    typst: number;
}

export interface Pointset {
    pts: Pt[];
}

export interface Useinput {
    used: boolean[];
}

export interface Mgr {
    phase: number;
    tlen: number;
    tmgr: number;
}