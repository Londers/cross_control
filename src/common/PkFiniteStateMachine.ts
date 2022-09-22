import {Pk, St} from "./index";
import produce, {immerable} from "immer"

export const minPhaseDuration = 4
export const tvpNums = [2, 3, 4]
export const replaceNums = [5, 6, 7]

export class PkFiniteStateMachine implements Pk {
    private _pointer!: Pointer
    tvpWithRepls: St[]

    [immerable] = true

    desc: string;
    dk: number;
    pk: number;
    razlen: boolean;
    shift: number;
    private _sts: St[];
    lineSegment!: number[];
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
        this.convertStsToLine()
        this.tpu = pk?.tpu ?? 0;
        this.twot = pk?.twot ?? false;

        this.tvpWithRepls = []
        this.pointer = new Pointer(pointer)
    }

    set pointer(value: Pointer) {
        this._pointer = value;
    }

    get pointer(): Pointer {
        return this._pointer;
    }

    convertStsToLine = () => {
        if (this.sts.length === 0) return []
        const line: number[] = [this.sts[0].start]
        let overlap = false

        for (let st of this.sts) {
            if (replaceNums.some(repl => repl === st.tf)) continue
            if (this.razlen && tvpNums.some(tvp => tvp === st.tf)) {
                this.tvpWithRepls = [st]
                const replEnd = st.line + this.getReplCount(st.line - 1)
                for (let i = st.line; i < replEnd; i++) {
                    this.tvpWithRepls.push(this.sts[i])
                    if (this.sts[i].stop > st.stop) st = this.sts[i]
                }
            }

            if ((st.start !== st.stop) || (st.dt !== 0)) {
                if (st.dt !== 0) {
                    overlap = true
                    line.push(st.stop + st.dt)
                } else if ((st.start === 0) && (this.shift !== 0)) {
                    overlap = true
                    line.push(st.stop + this.tc)
                } else if (overlap) {
                    line.push(st.stop + this.tc)
                } else {
                    line.push(st.stop)
                }
            }
        }

        this.lineSegment = line
        console.log(this.sts)
        console.log(this.lineSegment)
    }

    convertLineToSts(size: number, type?: number): St[] {
        // const size = this.getLinesCount()

        const tvpIndexes = this.sts.filter(st => tvpNums.some(tvp => tvp === st.tf))

        const sts = Array.from({length: 12}, (v, i) => {
            return {dt: 0, line: i + 1, num: 0, plus: false, start: 0, stop: 0, tf: 0, trs: false}
        })
        sts[0].start = this.lineSegment[0]
        sts[0].tf = 0
        sts[0].num = 1

        let overlap = false
        for (let i = 0; i < size; i++) {
            sts[i].tf = this.sts[i].tf
            sts[i].num = this.sts[i].num
            sts[i].plus = this.sts[i].plus

            if (!overlap && (this.lineSegment[i + 1] >= this.tc)) {
                overlap = true
                sts[i].stop = this.tc
                sts[i].dt = this.lineSegment[i + 1] - this.tc
                sts[i].trs = sts[i].dt !== 0
                sts[i + 1].start = sts[i].dt
            } else {
                if (overlap) {
                    sts[i].stop = this.lineSegment[i + 1] - this.tc
                    sts[i + 1].start = this.lineSegment[i + 1] - this.tc
                } else {
                    sts[i].stop = this.lineSegment[i + 1]
                    sts[i + 1].start = this.lineSegment[i + 1]
                }
            }

            if (tvpIndexes.some(tvp => tvp.tf === sts[i].tf)) {
                const replCount = this.getReplCount(i)
                for (let j = 1; j < replCount + 1; j++) {
                    sts[i + j].num = this.sts[i + j].num
                    sts[i + j].tf = this.sts[i + j].tf
                    sts[i + j].start = sts[i].start
                    sts[i + j].stop = sts[i].stop
                    sts[i + j].dt = sts[i].dt
                    sts[i + j].trs = sts[i].trs
                    this.lineSegment.splice((i + j), 0, sts[i].stop + sts[i].dt)
                }
                sts[i + replCount + 1].start = sts[i + replCount].stop
                i += replCount
                // } else while (replaceNums.some(repl => repl === this.sts[i].tf)) {
                //     i++
            }
        }
        sts[size].start = 0
        console.log(this.lineSegment)
        console.log(sts)
        return sts
    }

    getReplCount(line: number): number {
        if (line === -1) return -1
        let count = 0
        for (let i = line + 1; i < 12; i++) {
            if (replaceNums.some(repl => repl === this.sts[i].tf)) {
                count++
            } else if (count > 0) break
        }
        return count
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

    getPrevReplCount(): number {
        let count = 0
        for (let i = 0; i < this.pointer.current; i++) {
            if (replaceNums.some(repl => repl === this.sts[i].tf)) count++
        }
        return count
    }

    changeDesc(desc: string): Pk {
        return {...this.getPk(), desc}
    }

    changeTc(newTc: number): Pk {
        return produce(this, draft => {
            if (newTc < 3) {

            } else {
                draft.pointer = new Pointer(draft.pointer.current, draft.lineSegment.length)
                if (newTc > 255) newTc = 255
                if (newTc < minPhaseDuration * draft.getLinesCount()) newTc = minPhaseDuration * draft.getLinesCount()

                if (newTc <= draft.shift) {
                    const shiftDiff = newTc - (draft.shift + 1)
                    draft.shift += shiftDiff
                    draft.lineSegment = draft.lineSegment.map(dot => dot + shiftDiff)
                }

                let diff = newTc - draft.tc
                draft.tc = newTc

                if ((minPhaseDuration + draft.lineSegment[draft.pointer.current]) - draft.lineSegment[draft.pointer.next] > diff) {
                    while ((draft.lineSegment[draft.pointer.next] + diff) < (draft.lineSegment[draft.pointer.current] + minPhaseDuration)) {
                        const partialReduction = minPhaseDuration + draft.lineSegment[draft.pointer.current] - draft.lineSegment[draft.pointer.next]
                        diff -= partialReduction
                        for (let i = draft.pointer.next; i < draft.lineSegment.length; i++) {
                            draft.lineSegment[i] += partialReduction
                        }
                        draft.pointer.increment()
                        if (draft.pointer.next === 0) draft.pointer.increment()
                    }
                }
                for (let i = draft.pointer.next; i < draft.lineSegment.length; i++) {
                    draft.lineSegment[i] += diff
                }
                draft.sts = draft.convertLineToSts(draft.getLinesCount())
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
            if (newShift >= draft.tc) newShift = draft.tc - 1
            const shiftDiff = newShift - draft.shift
            draft.shift = newShift
            draft.lineSegment = draft.lineSegment.map(dot => dot + shiftDiff)
            draft.sts = draft.convertLineToSts(draft.getLinesCount())
        }).getPk()
    }

    changeTpu(tpu: number): Pk {
        return produce(this, draft => {
            if (tpu === 1) { // ЛПУ
                draft.lineSegment = draft.lineSegment.map(dot => dot - draft.shift)
                draft.shift = 0
                draft.sts = draft.convertLineToSts(draft.getLinesCount())
            }
            draft.tpu = tpu
        }).getPk()
    }

    changeRazlen(razlen: boolean): Pk {
        return {...this.getPk(), razlen}
    }

    insertLine(type: number, customNum?: number): Pk {
        return produce(this, draft => {
            if ((draft.pointer.current === 11) || (draft.pointer.current > draft.lineSegment.length - 2)) return draft

            let linesCount = draft.getLinesCount() + 1

            if (!replaceNums.some(repl => repl === type)) {
                if ((draft.shift !== 0) && (draft.pointer.current === draft.getLinesCount() - 1)) {
                    if (draft.sts[draft.pointer.current].trs) {
                        draft.lineSegment.splice(draft.pointer.next, 0,
                            draft.sts[draft.pointer.current].stop + draft.sts[draft.pointer.current].dt - minPhaseDuration
                        )
                    } else {
                        draft.lineSegment.splice(draft.pointer.next, 0, draft.sts[draft.pointer.current].stop + draft.tc - minPhaseDuration)
                    }
                } else {
                    draft.lineSegment.splice(draft.pointer.next, 0, draft.sts[draft.pointer.current].stop - minPhaseDuration)
                }
            }

            draft.sts.splice(draft.pointer.next, 0, {
                    line: 0,
                    num: customNum ? customNum : 1,
                    plus: false,
                    start: 0,
                    stop: 0,
                    tf: type,
                    trs: false,
                    dt: 0
                }
            )
            draft.sts.pop()

            if (tvpNums.some(tvp => tvp === type)) {
                if (type === 4) {
                    draft.sts.splice(draft.pointer.next + 1, 0, {tf: 5, num: 2} as St)
                    draft.sts.splice(draft.pointer.next + 2, 0, {tf: 6, num: 3} as St)
                    draft.sts.splice(draft.pointer.next + 3, 0, {tf: 7, num: 4} as St)
                    draft.sts.pop()
                    draft.sts.pop()
                    draft.sts.pop()
                    linesCount += 3
                } else {
                    draft.sts.splice(draft.pointer.next + 1, 0, {tf: 7, num: 2} as St)
                    draft.sts.pop()
                    linesCount++
                }
            }

            draft.sts = draft.convertLineToSts(linesCount, type)
        }).getPk()
    }

    deleteLine(): Pk {
        return produce(this, draft => {
            if (draft.pointer.current === 0) return draft

            if (replaceNums.some(repl => repl === draft.sts[draft.pointer.current].tf)) {
                const currentSave = draft.pointer.current
                while (!tvpNums.some(tvp => tvp === draft.sts[draft.pointer.current].tf)) {
                    draft.pointer.decrement()
                    if (draft.pointer.current === currentSave) {
                        while (replaceNums.some(repl => repl === draft.sts[draft.pointer.current].tf)) {
                            draft.sts.splice(draft.pointer.current, 1)
                            draft.sts.push({dt: 0, line: 0, num: 0, plus: false, start: 0, stop: 0, tf: 0, trs: false})
                        }
                        draft.sts = draft.convertLineToSts(draft.getLinesCount())
                        return
                    }
                }
            }

            if (tvpNums.some(tvp => tvp === draft.sts[draft.pointer.current].tf)) {
                const replCount = draft.getReplCount(draft.pointer.current)
                for (let i = 0; i < replCount + 1; i++) {
                    draft.sts.splice(draft.pointer.current, 1)
                    draft.sts.push({dt: 0, line: 0, num: 0, plus: false, start: 0, stop: 0, tf: 0, trs: false})
                }
            } else {
                draft.sts.splice(draft.pointer.current, 1)
                draft.sts.push({dt: 0, line: 0, num: 0, plus: false, start: 0, stop: 0, tf: 0, trs: false})
            }
            draft.lineSegment.splice(draft.pointer.current, 1)
            draft.sts = draft.convertLineToSts(draft.getLinesCount())
        }).getPk()
    }

    changeStart(newStart: number): Pk {
        return produce<PkFiniteStateMachine>(this, draft => {
            if (draft.pointer.current === 0) {
                const shiftDiff = draft.shift - newStart
                draft.shift = newStart
                draft.lineSegment = draft.lineSegment.map(dot => dot - shiftDiff)
            } else {
                const diff = newStart - draft.sts[draft.pointer.current].start
                draft.lineSegment[draft.pointer.current] += diff
            }
            draft.sts = draft.convertLineToSts(draft.getLinesCount())
        }).getPk()
    }

    changeType(type: number): Pk {
        return produce<PkFiniteStateMachine>(this, draft => {
            draft.sts[draft.pointer.current].tf = type
        }).getPk()

        // this.sts[this.pointer.current].tf = type
        // if (this.sts[this.pointer.current].num === 0) this.sts[this.pointer.current].num = 1
        // switch (type) {
        //     case 1:
        //     case 8:
        //         this.sts[this.pointer.current].num = 0
        //         break
        //     case 2:
        //     case 3:
        //         // твп 1, твп2
        //         break
        //     case 4:
        //         // твп 1,2
        //         break
        //     default:
        //         break
        // }
        // return this.getPk()
    }

    changePhaseNum(num: number): Pk {
        return produce<PkFiniteStateMachine>(this, draft => {
            draft.sts[draft.pointer.current].num = num
        }).getPk()
    }

    doMagic(diff: number): number[] {
        if (isNaN(diff)) return this.lineSegment

        if (this.razlen) {
            let maxStop = 0
            let maxStopId: number[] = []
            this.tvpWithRepls.forEach(st => {
                if (st.stop >= maxStop) {
                    maxStop = st.stop
                    maxStopId.push(st.line - 1)
                }
            })
            if (!maxStopId.some(id => id === this.pointer.current)) {

                return this.lineSegment
            }
        }

        const prevReplCount = this.getPrevReplCount()

        for (let i = 0; i < prevReplCount; i++) {
            this.pointer.decrement()
        }

        // todo: delete this variable
        let endlessLoop = 0

        if (diff > (this.tc - (this.lineSegment.length - 2) * minPhaseDuration - this.lineSegment[this.pointer.next]) + this.lineSegment[this.pointer.current]) {
            diff = (this.tc - (this.lineSegment.length - 2) * minPhaseDuration - this.lineSegment[this.pointer.next]) + this.lineSegment[this.pointer.current]
        }

        let overlap = (this.lineSegment.length - 1) === this.pointer.next

        const preOverlapIndexes = []

        const newLine = [...this.lineSegment]
        const tempPointer = new Pointer(this.pointer.current, newLine.length)

        if (overlap) tempPointer.setCurrent(1)

        while ((diff !== 0) && (endlessLoop++ < 500)) {
            if ((tempPointer.current === 0) && overlap) {
                tempPointer.increment()
            }

            let prev = newLine[tempPointer.previous]
            let curr = newLine[tempPointer.current]
            let next = newLine[tempPointer.next]

            if (overlap) {
                const maxI = (this.pointer.next !== 0) ? this.pointer.next : this.pointer.current

                if (curr - diff >= prev + minPhaseDuration) {
                    for (let i = tempPointer.current; i < maxI; i++) {
                        newLine[i] -= diff
                    }
                    break
                } else if (maxI > tempPointer.current) {
                    diff -= (curr - prev - minPhaseDuration)
                    for (let i = tempPointer.current; i < maxI; i++) {
                        newLine[i] -= (curr - prev - minPhaseDuration)
                    }
                }
            } else {
                if ((newLine.length - 1) !== tempPointer.next) {
                    curr = next
                    next = newLine[tempPointer.next + 1]

                    if (next - diff >= curr + minPhaseDuration) {
                        preOverlapIndexes.push(tempPointer.next)
                        preOverlapIndexes.forEach(i => {
                            newLine[i] += diff
                        })
                        break
                    } else {
                        diff -= (next - curr - minPhaseDuration)
                        preOverlapIndexes.push(tempPointer.next)
                        preOverlapIndexes.forEach(i => {
                            newLine[i] += next - curr - minPhaseDuration
                        })
                    }
                }
            }

            tempPointer.increment()
            if (tempPointer.next === 0) {
                overlap = true
            }
            console.log(newLine)
        }
        if (endlessLoop >= 500) {
            alert("Ошибка алгоритма расчёта ПК")
            return this.lineSegment
        }
        return newLine
    }

    changeDuration(diff: number): Pk {
        return produce<PkFiniteStateMachine>(this, draft => {
            // draft.pointer.increment()
            // if ((diff + draft.lineSegment[draft.pointer.current]) > (draft.lineSegment[draft.pointer.next] - minPhaseDuration)) {
            //     diff = draft.lineSegment[draft.pointer.next] - draft.lineSegment[draft.pointer.current] - minPhaseDuration
            // }
            // draft.pointer.decrement()
            draft.lineSegment = draft.doMagic(diff)

            // if ((diff + draft.lineSegment[draft.pointer.current]) > (draft.lineSegment[draft.pointer.next] - minPhaseDuration)) {
            //     draft.lineSegment = draft.doMagic(diff)
            // } else if ((diff + draft.lineSegment[draft.pointer.current]) < (draft.lineSegment[draft.pointer.previous] + minPhaseDuration)) {
            //     if ((draft.lineSegment.length - 1) === draft.pointer.next) {
            //         draft.lineSegment[draft.pointer.current] = draft.lineSegment[draft.pointer.next] - minPhaseDuration
            //     }
            //     draft.lineSegment[draft.pointer.next] = draft.lineSegment[draft.pointer.current] + minPhaseDuration
            // } else {
            //     if (draft.pointer.next === (draft.lineSegment.length - 1)) {
            //         draft.lineSegment[draft.pointer.current] -= diff
            //     } else {
            //         draft.lineSegment[draft.pointer.next] += diff
            //     }
            // }
            draft.sts = draft.convertLineToSts(draft.getLinesCount())
        }).getPk()
    }

    changePlus(plus: boolean): Pk {
        return produce<PkFiniteStateMachine>(this, draft => {
            draft.sts[draft.pointer.current].plus = plus
        }).getPk()
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