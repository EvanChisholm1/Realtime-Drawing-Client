import React, { createContext, useEffect, useContext } from 'react'
import Io from 'socket.io-client';

const IoContext = createContext()

const socket = Io('http://localhost:4000')

export function IoProvider({ children }) {

    useEffect(() => {
        socket.on('current users', users => {
            console.log(users)
        })
    }, [])

    function onDraw(e, lastPos) {
        socket.emit('stroke', { lastPos, currentPos: { x: e.offsetX, y: e.offsetY } })
    }

    function onStrokeEvent(ctx) {
        socket.on('stroke', ({ lastPos, currentPos }) => {
            ctx.current.beginPath();
            ctx.current.moveTo(lastPos.x, lastPos.y);
            ctx.current.lineTo(currentPos.x, currentPos.y);
            ctx.current.stroke();
        })
    }

    return(
        <IoContext.Provider value={{ onDraw, onStrokeEvent }}>
            {children}
        </IoContext.Provider>
    )
}

export function useIoContext() {
    return useContext(IoContext);
}