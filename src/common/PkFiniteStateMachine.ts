import {Pk, St} from "./index";
import produce from "immer"

const minPhaseDuration = 4

export class PkFiniteStateMachine implements Pk {
    private _pointer!: Pointer

    desc: string;
    dk: number;
    pk: number;
    razlen: boolean;
    shift: number;
    private _sts: St[];
    tc: number;
    tpu: number;
    twot: boolean;

    constructor(pk: Pk | undefined, pointer: number) {
        console.log("create FSM")
        this.pointer = new Pointer(pointer)
        this.desc = pk?.desc ?? "";
        this.dk = pk?.dk ?? 0;
        this.pk = pk?.pk ?? 0;
        this.razlen = pk?.razlen ?? false;
        this.shift = pk?.shift ?? 0;
        this._sts = pk?.sts ?? [];
        this.tc = pk?.tc ?? 0;
        this.tpu = pk?.tpu ?? 0;
        this.twot = pk?.twot ?? false;
    }

    set pointer(value: Pointer) {
        this._pointer = value;
    }

    get pointer(): Pointer {
        return this._pointer;
    }

    private getPk(): Pk {
        return {
            desc: this.desc,
            dk: this.dk,
            pk: this.pk,
            razlen: this.razlen,
            shift: this.shift,
            sts: this._sts,
            tc: this.tc,
            tpu: this.tpu,
            twot: this.twot
        }
    }

    private getLinesCount(): number {
        let count = 0
        this._sts.forEach(line => {
            if (line.start === line.stop) count++
        })
        return count
    }

    private fillLines() {
        this._sts = this._sts.map((line, index) => {
            return {...line, line: index + 1}
        })
    }

    private makeTrs() {
        // if (this.shift > 0) {
            this._sts.forEach(line => {
                if (line.start !== line.stop) {
                    if ((line.start < this.tc) && (line.stop > this.tc)) {
                        line.trs = true
                        line.dt = line.stop - this.tc
                        line.stop = 0
                    } else {
                        if (line.start >= this.tc) line.start -= this.tc
                        if (line.stop >= this.tc) line.stop -= this.tc
                    }
                }
            })
        // }
    }

    changeDesc(desc: string): Pk {
        return {...this.getPk(), desc}
    }

    changeTc(newTc: number): Pk {
        if (this.tpu === 0) {
            if (newTc < 3) {
                this.tc = newTc
            } else {
                const diff = newTc - this.tc
                this.tc = newTc
                return this.changeDuration(diff)
            }
        }
        return this.getPk()
    }

    changeTwot(twot: boolean): Pk {
        return {...this.getPk(), twot}
    }


    set sts(value: St[]) {
        this._sts = value;
    }

    get sts(): St[] {
        return this._sts;
    }

    changeShift(newShift: number): Pk {
        // produce(this.getPk(), draft => {
            if (this.tpu === 0) {
                if (newShift >= this.tc) newShift = this.tc - 1
                const shiftDiff = newShift - this.shift
                this.shift = newShift
                this.sts.forEach(line => {
                    if (line.start !== line.stop) {
                        line.start += shiftDiff
                        line.stop += shiftDiff
                    }
                })
                // this.sts = draft.sts
                this.makeTrs()
            }
        // })

        return this.getPk()
    }

    changeTpu(tpu: number): Pk {
        return {...this.getPk(), tpu}
    }

    changeRazlen(razlen: boolean): Pk {
        return {...this.getPk(), razlen}
    }

    insertLine(type: number): Pk {
        if (this.pointer.current === 11) return this.getPk()
        this._sts.splice(this.pointer.next, 0, {
            line: 0,
            num: 1,
            plus: false,
            start: this._sts[this.pointer.current].stop,
            stop: this._sts[this.pointer.current].stop,
            tf: 0,
            trs: false,
            dt: 0
        })
        this._sts.pop()
        this.fillLines()

        this.pointer.increment()
        this.changeType(type)
        return this.changeDuration(minPhaseDuration)
    }

    deleteLine(): Pk {
        if (this.pointer.current === 0) return this.getPk()
        const deletedLine = this._sts.splice(this.pointer.current, 1)[0]
        this._sts.push({dt: 0, line: 0, num: 0, plus: false, start: 0, stop: 0, tf: 0, trs: false})
        this.fillLines()
        this.pointer.decrement()
        return this.changeDuration(deletedLine.stop - deletedLine.start)
    }

    changeStart(start: number): Pk {
        if (this.pointer.current === 0) {
            return this.changeShift(start)
        } else {
            this._sts[this.pointer.current].start = start
            this._sts[this.pointer.previous].stop = start
        }
        return this.getPk()
    }

    changeType(type: number): Pk {
        this._sts[this.pointer.current].tf = type
        if (this._sts[this.pointer.current].num === 0) this._sts[this.pointer.current].num = 1
        switch (type) {
            case 1:
            case 8:
                this._sts[this.pointer.current].num = 0
                break
            case 2:
            case 3:
                // твп 1, твп2
                break
            case 4:
                // твп 1,2
                break
            default:
                break
        }
        return this.getPk()
    }

    changePhaseNum(num: number): Pk {
        this._sts[this.pointer.current].num = num
        return this.getPk()
    }

    changeDuration(diff: number): Pk {
        const linesCount = this.getLinesCount()
        this._sts[this.pointer.current].stop += diff

        if (this.pointer.current < (linesCount - 1)) {
            this.pointer.increment()
            this.changeDuration(diff)
        } else {
            this.makeTrs()
        }

        return this.getPk()
    }

    changePlus(plus: boolean): Pk {
        this._sts[this.pointer.current].plus = plus
        return this.getPk()
    }
}


const maxTableSize = 12;

class Pointer {
    private _previous = -1
    private _current = 0
    private _next = 1

    constructor(pointer: number) {
        this.setCurrent(pointer)
    }

    increment() {
        this._previous++
        this._current++
        this._next++
        if (this._previous >= maxTableSize) this._previous = 0
        if (this._current >= maxTableSize) this._current = 0
        if (this._next >= maxTableSize) this._next = 0
    }

    decrement() {
        this._previous--
        this._current--
        this._next--
        if (this._previous <= -1) this._previous = maxTableSize - 1
        if (this._current <= -1) this._current = maxTableSize - 1
        if (this._next <= -1) this._next = maxTableSize - 1
    }

    setCurrent(current: number) {
        while (this.current !== current) this.increment()
    }

    get previous(): number {
        return this._previous;
    }

    get current(): number {
        return this._current;
    }

    get next(): number {
        return this._next;
    }
}