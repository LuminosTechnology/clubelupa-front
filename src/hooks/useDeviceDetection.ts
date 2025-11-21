import { useState, useEffect } from "react";

const useDeviceDetection = () => {
    const [isIOSLike, setIsIOSLike] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent;
        const isIOS = /iPhone|iPad|iPod/.test(userAgent) && !("MSStream" in window);
        setIsIOSLike(isIOS);
    }, []);

    return { isIOSLike };
};

export default useDeviceDetection;