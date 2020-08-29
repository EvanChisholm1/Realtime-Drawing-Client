import { useEffect, useRef } from 'react';

// a hook that lets you draw on an HTML canvas
// it takes in a canvasRef and a custom function to run when you draw
export function useCanvas(canvasRef, customDrawFunc) {
    // setup a ref that will later become the canvas object
    const ctx = useRef(null);

    useEffect(() => {
        // setup a mousedown flag and a last position object
        let isMouseDown = false;
        let lastPos = { x: 0, y: 0 }

        // if there is not canvasRef return
        if(!canvasRef.current) return;
        // some code to makesure the canvas is always the right size        
        canvasRef.current.width = window.innerWidth - 15;
        canvasRef.current.height = window.innerHeight - canvasRef.current.getBoundingClientRect().top;
        window.addEventListener('resize', () => {
            canvasRef.current.width = window.innerWidth - 15;
            canvasRef.current.height = window.innerHeight - canvasRef.current.getBoundingClientRect().top;
        })

        // create the context object and set some properties
        ctx.current = canvasRef.current.getContext('2d');
        ctx.current.lineJoin = 'bevel';
        ctx.current.strokeStyle = '#0000000';
        ctx.current.lineCap = 'round';
        ctx.current.lineWidth = 10;

        function draw(e, eventType) {
            // if the mouse is down don't do anythin
            if(!isMouseDown) return;
            // setup the variables offsetX and offsetY
            let offsetY;
            let offsetX;

            // if the event type is touch then we do some special math to give us the cooridnates on the canvas
            if(eventType === 'touch') {
                console.log('is touch')
                const rect = e.target.getBoundingClientRect()
                offsetX = e.touches[0].pageX - rect.left;
                offsetY = e.touches[0].pageY - rect.top;
            } else {
                offsetX = e.offsetX;
                offsetY = e.offsetY;
            }

            // here we draw the line on our canvas from the last position to the current position
            ctx.current.beginPath();
            ctx.current.moveTo(lastPos.x, lastPos.y);
            ctx.current.lineTo(offsetX, offsetY);
            ctx.current.stroke();
            // A custom draw function that takes in the last and current position
            // I use this to send data through a websocket
            customDrawFunc && customDrawFunc({ offsetX, offsetY }, lastPos);
            // we set the last position to the current position
            lastPos = { x: offsetX, y: offsetY };
        }

        // adding an event listener to mouse down and touch down that sets the flag that the mouse is down to true
        canvasRef.current.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            lastPos = { x: e.offsetX, y: e.offsetY }
        });
        canvasRef.current.addEventListener('touchstart', (e) => {
            // touch events don't have the offsetX and offsetY properties so I have to do some math to match them
            isMouseDown = true;
            console.log(e.targetTouches)
            const rect = e.target.getBoundingClientRect()
            const x = e.targetTouches[0].pageX - rect.left;
            const y = e.targetTouches[0].pageY - rect.top;
            lastPos = { x, y };
        });
        // set the mouse down flag to false when mouseup touch end or when the mouse moves out the window
        canvasRef.current.addEventListener('mouseup', () => isMouseDown = false);
        canvasRef.current.addEventListener('touchend', () => isMouseDown = false);
        canvasRef.current.addEventListener('mouseout', () => isMouseDown = false);
        // when the mouse or pointer moves run the draw function
        canvasRef.current.addEventListener('mousemove', draw);
        // the draw function takes in the argument of 'touch' so we can do some special stuff to make it work on mobile
        canvasRef.current.addEventListener('touchmove', (e) => draw(e, 'touch'));
    }, [customDrawFunc, canvasRef])

    return ctx;
}
