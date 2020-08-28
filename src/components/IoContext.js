import React, { createContext, useEffect, useContext, useState } from 'react'
import Io from 'socket.io-client';

const IoContext = createContext()

// const socket = Io('http://localhost:4000')
const socket = Io('https://virtual-canvas-server.herokuapp.com/')

export function IoProvider({ children }) {

    const [roomId, setRoomId] = useState();

    useEffect(() => {
        socket.on('current users', users => {
            console.log(users)
        })
    }, [])

    function onDraw(e, lastPos) {
        socket.emit('stroke', { lastPos, currentPos: { x: e.offsetX, y: e.offsetY }, roomId })
    }

    function onStrokeEvent(ctx) {
        socket.on('stroke', ({ lastPos, currentPos, }) => {
            ctx.current.beginPath();
            ctx.current.moveTo(lastPos.x, lastPos.y);
            ctx.current.lineTo(currentPos.x, currentPos.y);
            ctx.current.stroke();
        })
    }

    function useChangeId(id) {
        useEffect(() => {
            console.log('changing id')
            setRoomId(id);
            socket.emit('change id', id);
        }, [id])
    }

    return(
        <IoContext.Provider value={{ onDraw, onStrokeEvent, useChangeId }}>
            {children}
        </IoContext.Provider>
    )
}

export function useIoContext() {
    return useContext(IoContext);
}