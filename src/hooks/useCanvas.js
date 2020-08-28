import { useEffect, useRef } from 'react';

export function useCanvas(canvasRef, customDrawFunc) {
    const ctx = useRef(null)

    useEffect(() => {
        let isMouseDown = false;
        let lastPos = { x: 0, y: 0 }

        if(!canvasRef.current) return;
        console.log(canvasRef.current)
        canvasRef.current.width = window.innerWidth - 15;
        canvasRef.current.height = window.innerHeight - canvasRef.current.getBoundingClientRect().top;
        ctx.current = canvasRef.current.getContext('2d');
        ctx.current.lineJoin = 'bevel';
        ctx.current.strokeStyle = '#0000000';
        ctx.current.lineCap = 'round';
        ctx.current.lineWidth = 10;

        function draw(e, eventType) {
            if(!isMouseDown) return;
            let offsetY;
            let offsetX;
            if(eventType === 'touch') {
                console.log('is touch')
                const rect = e.target.getBoundingClientRect()
                offsetX = e.touches[0].pageX - rect.left;
                offsetY = e.touches[0].pageY - rect.top;
                console.log(e)
            } else {
                offsetX = e.offsetX;
                offsetY = e.offsetY;
            }
            ctx.current.beginPath();
            ctx.current.moveTo(lastPos.x, lastPos.y);
            ctx.current.lineTo(offsetX, offsetY);
            ctx.current.stroke();
            customDrawFunc && customDrawFunc({ offsetX, offsetY }, lastPos);
            lastPos = { x: offsetX, y: offsetY };
        }

        canvasRef.current.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            lastPos = { x: e.offsetX, y: e.offsetY }
        });
        canvasRef.current.addEventListener('touchstart', (e) => {
            isMouseDown = true;
            console.log(e.targetTouches)
            const rect = e.target.getBoundingClientRect()
            const x = e.targetTouches[0].pageX - rect.left;
            const y = e.targetTouches[0].pageY - rect.top;
            lastPos = { x, y };
        });
        canvasRef.current.addEventListener('mouseup', () => isMouseDown = false);
        canvasRef.current.addEventListener('mouseout', () => isMouseDown = false);
        canvasRef.current.addEventListener('mousemove', draw);
        canvasRef.current.addEventListener('touchmove', (e) => draw(e, 'touch'));
    }, [customDrawFunc, canvasRef])

    return ctx;
}
