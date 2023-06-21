import { useCallback, useEffect, useState } from "react"

const useChrono = () => {
    const [current, setCurrent] = useState<number>(0)
    const [lastStart, setLastStart] = useState<null | Date>(new Date())
    const [cumulate, setCumulate] = useState<number>(0)
    const addCumulate = useCallback((time: number) => {
        setCumulate(cumulate + time)
        return cumulate + time
    }, [cumulate, setCumulate])

    const handleStart = useCallback(
        () => {
            setLastStart(new Date())
        },
        [setLastStart]
    );

    const handlestandaby = useCallback(
        () => {
            setLastStart(null)
            if (lastStart !== null) {
                const diff = (new Date()).getTime() - lastStart.getTime()
                return addCumulate(diff)
            }
            return addCumulate(0)
        },
        [setLastStart, lastStart, addCumulate]
    );

    const handlestop = useCallback(
        () => {
            let time = cumulate
            setLastStart(null)
            setCumulate(0)
            if (lastStart !== null) {
                const diff = (new Date()).getTime() - lastStart.getTime()
                time = time + diff
            }
            return time
        },
        [setLastStart, lastStart, addCumulate]
    );

    useEffect(() => {
        const id = setInterval(() => {
            let chrono = cumulate
            if (lastStart !== null) {
                const diff = (new Date()).getTime() - lastStart.getTime()
                chrono = chrono + diff
                setCurrent(chrono)
            }
        }, 100)
        return () => {
            clearInterval(id)
        }
    }, [cumulate, lastStart])

    return [
        current,
        handleStart,
        handlestandaby,
        handlestop
    ] as const
}

export default useChrono