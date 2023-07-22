

type UseDebounceFunc = () => (callback: (() => void) | undefined, duration: number) => void

const useDebounce: UseDebounceFunc = () => {
    let interval: undefined | any = undefined
    return (callback = undefined, duration): void => {
        if (interval)
            clearInterval(interval)
        interval = setInterval(() => {
            if (callback) {
                callback()
                clearInterval(interval)
            }
        }, duration)
    }
}

export default useDebounce