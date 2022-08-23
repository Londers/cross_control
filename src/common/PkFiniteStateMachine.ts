import {Pk, St} from "./index";
import produce, {immerable} from "immer"

const minPhaseDuration = 4

export class PkFiniteStateMachine implements Pk {
    private _pointer!: Pointer

    [immerable] = true

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
        console.log("create FSM", pointer)
        this.desc = pk?.desc ?? "";
        this.dk = pk?.dk ?? 0;
        this.pk = pk?.pk ?? 0;
        this.razlen = pk?.razlen ?? false;
        this.shift = pk?.shift ?? 0;
        this._sts = pk?.sts ?? [];
        this.tc = pk?.tc ?? 0;
        this.tpu = pk?.tpu ?? 0;
        this.twot = pk?.twot ?? false;
        this.pointer = new Pointer(pointer, 12)
        // this.pointer = new Pointer(pointer, this.getLinesCount())
    }

    set pointer(value: Pointer) {
        this._pointer = value;
    }

    get pointer(): Pointer {
        return this._pointer;
    }

    getPk(): Pk {
        return {
            desc: this.desc,
            dk: this.dk,
            pk: this.pk,
            razlen: this.razlen,
            shift: this.shift,
            sts: this.sts,
            tc: this.tc,
            tpu: this.tpu,
            twot: this.twot
        }
    }

    getLinesCount(): number {
        let count = 0
        this.sts.forEach(line => {
            if (line.start !== line.stop) count++
        })
        return count
    }

    fillLines() {
        this.sts = this.sts.map((line, index) => {
            return {...line, line: index + 1}
        })
    }

    // private makeTrs() {
    //     produce<Pk>(draft => {
    //         draft.sts.forEach(line => {
    //             if (line.start !== line.stop) {
    //                 if ((line.start < this.tc) && (line.stop > this.tc)) {
    //                     line.trs = true
    //                     line.dt = line.stop - this.tc
    //                     line.stop = 0
    //                 } else {
    //                     if (line.start >= this.tc) line.start -= this.tc
    //                     if (line.stop >= this.tc) line.stop -= this.tc
    //                 }
    //             }
    //         })
    //     })
    //
    // }

    makeTrs() {
        this.sts.forEach(l => console.log(l.start, l.stop, l.trs, l.dt))
        this.sts.forEach((line, index) => {
            if (line.start !== line.stop) {
                if ((line.start < this.tc) && (line.stop > this.tc)) {
                    line.trs = true
                    line.dt = line.stop - this.tc
                    line.stop = 0
                } else {
                    line.stop += line.dt
                    line.trs = false
                    line.dt = 0

                    if (line.start >= this.tc) line.start -= this.tc
                    if (line.stop > this.tc) {
                        line.stop -= this.tc
                    }
                    if (line.start > line.stop) {
                        line.trs = true
                        line.dt = line.stop
                        line.stop = this.tc
                    }

                    if (this.sts[index - 1]?.trs) line.start = this.sts[index - 1].dt

                    if ((line.stop - line.start + line.dt) < minPhaseDuration) {
                        line.stop = line.start + minPhaseDuration
                        if (line.stop >= this.tc) {
                            line.trs = true
                            line.dt = line.stop - this.tc
                            line.stop = 0
                        }
                    }
                }
            }
        })
        this.sts.forEach(l => console.log(l.start, l.stop, l.trs, l.dt))
    }

    changeDesc(desc: string): Pk {
        return {...this.getPk(), desc}
    }

    changeTc(newTc: number): Pk {
        return produce(this, draft => {
            if (draft.tpu === 0) {
                if (newTc < 3) {
                    draft.tc = newTc
                } else {
                    const diff = newTc - draft.tc
                    draft.tc = newTc

                    const linesCount = draft.getLinesCount()

                    draft.sts[draft.pointer.current].stop += diff
                    draft.pointer.increment()

                    for (let i = draft.pointer.current; i < linesCount-1; i++) {
                        draft.sts[i].start += diff
                        draft.sts[i].stop += diff
                    }
                    draft.makeTrs()
                }
            }
        }).getPk()
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
        return produce(this, draft => {
            if (draft.tpu === 0) {
                if (newShift >= draft.tc) newShift = draft.tc - 1
                const shiftDiff = newShift - draft.shift
                draft.shift = newShift
                draft.sts.forEach((line, index) => {
                    if (line.start !== line.stop) {
                        line.start += shiftDiff
                        line.stop += shiftDiff + (line.trs ? line.dt : 0)

                        if (line.start < 0) line.start += draft.tc
                        while (line.stop <= 0) line.stop += draft.tc
                        // while (line.stop <= 0) {
                        //     console.log(line.stop, index)
                        //     line.stop += draft.tc
                        //     console.log(line.stop, index)
                        // }
                    }
                })
                // this.sts = draft.sts
                draft.makeTrs()
                // draft.pointer.setCurrent(0)
                // draft.changeDuration(0)
            }
        }).getPk()
    }

    changeTpu(tpu: number): Pk {
        return {...this.getPk(), tpu}
    }

    changeRazlen(razlen: boolean): Pk {
        return {...this.getPk(), razlen}
    }

    insertLine(type: number): Pk {
        return produce(this, draft => {
            if (draft.pointer.current === 11) return draft
            draft.sts[draft.pointer.current].stop -= minPhaseDuration
            draft.sts.splice(draft.pointer.next, 0, {
                line: 0,
                num: 1,
                plus: false,
                start: draft.sts[draft.pointer.current].stop,
                stop: draft.sts[draft.pointer.current].stop + minPhaseDuration,
                tf: 0,
                trs: false,
                dt: 0
            })
            draft.sts.pop()
            draft.fillLines()

            draft.pointer.increment()
            // draft.changeType(type)
            // return this.changeDuration(minPhaseDuration)

            // draft.makeTrs()
        }).getPk()
    }

    deleteLine(): Pk {
        return produce(this, draft => {
            if (draft.pointer.current === 0) return draft
            const deletedLine = draft.sts.splice(draft.pointer.current, 1)[0]
            draft.sts.push({dt: 0, line: 0, num: 0, plus: false, start: 0, stop: 0, tf: 0, trs: false})
            draft.fillLines()
            draft.pointer = new Pointer(draft.pointer.previous, draft.getLinesCount())
            if (draft.pointer.previous === 0) {
                draft.sts[draft.pointer.current].stop = deletedLine.stop
            } else {
                draft.sts[draft.pointer.previous].start = deletedLine.start
            }
            draft.makeTrs()
        }).getPk()
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
        this.sts[this.pointer.current].tf = type
        if (this.sts[this.pointer.current].num === 0) this.sts[this.pointer.current].num = 1
        switch (type) {
            case 1:
            case 8:
                this.sts[this.pointer.current].num = 0
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
        return produce<PkFiniteStateMachine>(this, draft => {
            const linesCount = draft.getLinesCount()
            draft.pointer = new Pointer(draft.pointer.current, linesCount)

            if (draft.pointer.next === 0) {
                draft.sts[draft.pointer.current].start -= diff
                // if (draft.sts[draft.pointer.current].start < 0) draft.sts[draft.pointer.current].start = 0
                draft.sts[draft.pointer.previous].stop -= diff
            } else {
                draft.sts[draft.pointer.current].stop += diff
                draft.sts[draft.pointer.next].start += diff
                if (draft.sts[draft.pointer.next].start < 0) draft.sts[draft.pointer.next].start = draft.sts[draft.pointer.current].stop
            }
            draft.makeTrs()
        }).getPk()
    }

    changePlus(plus: boolean): Pk {
        this._sts[this.pointer.current].plus = plus
        return this.getPk()
    }
}

class Pointer {
    private _size = 12

    private _previous = -1
    private _current = 0
    private _next = 1

    constructor(pointer: number, size?: number) {
        if (size) {
            this.size = size
        }
        this.setCurrent(pointer)
    }

    get size(): number {
        return this._size;
    }

    set size(value: number) {
        this._size = value;
    }

    increment() {
        this._previous++
        this._current++
        this._next++
        if (this._previous >= this.size) this._previous = 0
        if (this._current >= this.size) this._current = 0
        if (this._next >= this.size) this._next = 0
    }

    decrement() {
        this._previous--
        this._current--
        this._next--
        if (this._previous <= -1) this._previous = this.size - 1
        if (this._current <= -1) this._current = this.size - 1
        if (this._next <= -1) this._next = this.size - 1
    }

    setCurrent(current: number) {
        if (current >= this.size) {
            throw new Error("shit")
        }
        this.increment()
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