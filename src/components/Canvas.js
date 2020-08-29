import React, { useRef, useEffect } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { useIoContext } from './IoContext';

export function Canvas({ width, height, className }) {

    const { onDraw, onStrokeEvent } = useIoContext();

    const canvas = useRef(); 
    const ctx = useCanvas(canvas, onDraw)

    // I use this hook to draw on the canvas whenever there is websocket event for It
    useEffect(() => {
        onStrokeEvent(ctx);
    })

    return (
        <canvas 
            className={className}
            width={width}
            height={height}
            ref={canvas} 
        /> 
    )
}
