import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";

export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState(null);
    const [isDetecting, setIsDetecting] = useState(false);
    const [videoReady, setVideoReady] = useState(false);
    const [initStatus, setInitStatus] = useState("loading");
    const [errorMsg, setErrorMsg] = useState("Camera failed to start. Try refreshing.");

    useEffect(() => {
        let cancelled = false;

        async function setup() {
            try {
                setInitStatus("loading");
                await init({ landmarkerRef, videoRef, streamRef });

                if (cancelled) return;

                const waitForDimensions = () =>
                    new Promise((resolve) => {
                        const check = () => {
                            const v = videoRef.current;
                            if (v && v.videoWidth > 0 && v.videoHeight > 0 && v.readyState >= 2) {
                                resolve();
                            } else {
                                setTimeout(check, 100);
                            }
                        };
                        check();
                    });

                await waitForDimensions();

                if (!cancelled) {
                    setVideoReady(true);
                    setInitStatus("ready");
                }
            } catch (err) {
                console.error("Init failed:", err);

                if (!cancelled) {
                    if (err.name === "NotAllowedError") {
                        setErrorMsg("Camera permission denied. Click the camera icon in your browser's address bar, allow access, then refresh.");
                    } else if (err.name === "NotFoundError") {
                        setErrorMsg("No camera found on this device.");
                    } else {
                        setErrorMsg("Camera failed to start. Try refreshing the page.");
                    }
                    setInitStatus("error");
                }
            }
        }

        setup();

        return () => {
            cancelled = true;
            if (landmarkerRef.current) landmarkerRef.current.close();
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
            }
        };
    }, []);

    function handleClick() {
        if (!videoReady) return;

        setIsDetecting(true);
        setExpression(null);

        try {
            const result = detect({ landmarkerRef, videoRef, setExpression });
            console.log("Detected expression:", result);
            if (result) onClick(result);
        } catch (err) {
            console.error("Detection error:", err);
        }

        setTimeout(() => setIsDetecting(false), 800);
    }

    const statusDot = {
        loading: "bg-yellow-400 animate-pulse",
        ready:   "bg-green-400",
        error:   "bg-red-400",
    }[initStatus];

    const statusText = {
        loading: "Initializing camera…",
        ready:   expression ? expression : "Ready to detect",
        error:   "Camera unavailable",
    }[initStatus];

    return (
        <div className="flex flex-col items-center gap-4 w-full">

            {/* Video feed */}
            <div className="relative w-full rounded-xl overflow-hidden bg-[#1a1a1a] border border-[#3f3f3f]">
                <video
                    ref={videoRef}
                    playsInline
                    muted
                    className="w-full aspect-video object-cover"
                />

                {/* Loading overlay */}
                {initStatus === "loading" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a1a1a] gap-3">
                        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <p className="text-[#8e8ea0] text-xs">Starting camera…</p>
                    </div>
                )}

                {/* Error overlay */}
                {initStatus === "error" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a1a1a] gap-3 px-6 text-center">
                        {/* Camera blocked icon */}
                        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-red-400" strokeWidth="1.5">
                            <path d="M23 7l-7 5 7 5V7z"/>
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                            <line x1="1" y1="1" x2="23" y2="23" className="stroke-red-400"/>
                        </svg>
                        <p className="text-red-400 text-xs font-semibold">Camera unavailable</p>
                        <p className="text-[#8e8ea0] text-[11px] leading-relaxed">{errorMsg}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-1 px-4 py-1.5 bg-[#2f2f2f] hover:bg-[#3a3a3a] border border-[#3f3f3f] text-white text-xs rounded-lg transition-colors cursor-pointer"
                        >
                            Refresh page
                        </button>
                    </div>
                )}

                {/* Corner brackets when ready */}
                {initStatus === "ready" && (
                    <>
                        <span className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/30 rounded-tl" />
                        <span className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white/30 rounded-tr" />
                        <span className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white/30 rounded-bl" />
                        <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/30 rounded-br" />
                    </>
                )}
            </div>

            {/* Status label */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#2f2f2f] border border-[#3f3f3f] rounded-xl w-full justify-center">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDot}`} />
                <p className="text-white text-sm font-medium capitalize">{statusText}</p>
            </div>

            {/* Detect button */}
            <button
                onClick={handleClick}
                disabled={!videoReady || isDetecting || initStatus !== "ready"}
                className="
                    w-full py-3 rounded-xl text-sm font-semibold
                    bg-white hover:bg-[#ececec] active:bg-[#d9d9d9]
                    text-[#212121] transition-colors duration-150 cursor-pointer
                    disabled:opacity-50 disabled:cursor-not-allowed
                "
            >
                {initStatus === "loading"
                    ? "Waiting for camera…"
                    : initStatus === "error"
                    ? "Camera unavailable"
                    : isDetecting
                    ? "Detecting…"
                    : "Detect Expression"}
            </button>
        </div>
    );
}