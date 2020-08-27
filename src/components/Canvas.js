import React, { useRef, useEffect } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { useIoContext } from './IoContext';

export function Canvas({ width, height }) {

    const { onDraw, onStrokeEvent } = useIoContext();

    const canvas = useRef(); 
    const ctx = useCanvas(canvas, onDraw)
    useEffect(() => {
        onStrokeEvent(ctx);
    })

    return (
        <canvas 
            width={width}
            height={height}
            ref={canvas} 
        /> 
    )
}
