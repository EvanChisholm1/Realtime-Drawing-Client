import { useEffect, useRef } from 'react';

export function useCanvas(canvasRef, customDrawFunc) {
    const ctx = useRef(null)

    useEffect(() => {
        let isMouseDown = false;
        let lastPos = { x: 0, y: 0 }

        if(!canvasRef.current) return;
        console.log(canvasRef.current)
        ctx.current = canvasRef.current.getContext('2d');
        ctx.current.lineJoin = 'bevel';
        ctx.current.strokeStyle = '#0000000';
        ctx.current.lineCap = 'round';
        ctx.current.lineWidth = 20;

        function draw(e) {
            if(!isMouseDown) return;
            ctx.current.beginPath();
            ctx.current.moveTo(lastPos.x, lastPos.y);
            ctx.current.lineTo(e.offsetX, e.offsetY);
            ctx.current.stroke();
            customDrawFunc && customDrawFunc(e, lastPos);
            lastPos = { x: e.offsetX, y: e.offsetY };
        }

        canvasRef.current.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            lastPos = { x: e.offsetX, y: e.offsetY }
        });
        canvasRef.current.addEventListener('mouseup', () => isMouseDown = false);
        canvasRef.current.addEventListener('mouseout', () => isMouseDown = false);
        canvasRef.current.addEventListener('mousemove', draw);
    }, [customDrawFunc, canvasRef])

    return ctx;
}
