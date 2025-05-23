"use client";
import { useEffect, useRef } from "react";

interface Props {
    isActive: boolean;
    className?: string;
}

const CircularAudioVisualizer: React.FC<Props> = ({ isActive, className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationRef = useRef<number | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);

    useEffect(() => {
        if (!isActive) return;

        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        const audioCtx = new AudioContext();
        audioContextRef.current = audioCtx;

        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        dataArrayRef.current = dataArray;
        analyserRef.current = analyser;

        // Use microphone input
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);

            const draw = () => {
                const width = canvas.width;
                const height = canvas.height;
                ctx.clearRect(0, 0, width, height);
                analyser.getByteFrequencyData(dataArray);

                const centerX = width / 2;
                const centerY = height / 2;
                const radius = width / 4;

                const bars = dataArray.length;
                for (let i = 0; i < bars; i++) {
                    const angle = (i / bars) * Math.PI * 2;
                    const barHeight = dataArray[i] * 0.4;

                    const x1 = centerX + Math.cos(angle) * radius;
                    const y1 = centerY + Math.sin(angle) * radius;
                    const x2 = centerX + Math.cos(angle) * (radius + barHeight);
                    const y2 = centerY + Math.sin(angle) * (radius + barHeight);

                    ctx.beginPath();
                    ctx.strokeStyle = `hsl(${(i / bars) * 360}, 100%, 70%)`;
                    ctx.lineWidth = 2;
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }

                animationRef.current = requestAnimationFrame(draw);
            };

            draw();
        });

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            audioContextRef.current?.close();
        };
    }, [isActive]);

    return (
        <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className={className}
        />
    );
};

export default CircularAudioVisualizer;




