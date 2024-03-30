import {useEffect} from "react";

function useOverOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            if (ref.current && !ref.current?.contains(event.target)) {
                handler(event)
            }
        }

        document.addEventListener("mouseover", listener)
        document.addEventListener("touchstart", listener)

        return () => {
            document.removeEventListener("mouseover", listener)
            document.removeEventListener("touchstart", listener)
        }

    }, [ref, handler])
}

export default useOverOutside
