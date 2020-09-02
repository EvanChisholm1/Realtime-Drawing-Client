import React, { createContext, useEffect, useContext, useState } from 'react';
import Io from 'socket.io-client';

const IoContext = createContext();

// const socket = Io('http://localhost:4000');
const socket = Io('https://virtual-canvas-server.herokuapp.com/');

// I really don't need the context api for this but I will when I want to implement users
export function IoProvider({ children }) {
    const [roomId, setRoomId] = useState();
    const [isNewUser, setNewUser] = useState(false);

    useEffect(() => {
        socket.on('new user', () => {
            console.log('new user');
            setNewUser(true);
            setTimeout(() => {
                setNewUser(false);
            }, 1000);
        });
    }, []);

    function onDraw(e, lastPos) {
        socket.emit('stroke', {
            lastPos,
            currentPos: { x: e.offsetX, y: e.offsetY },
            roomId,
        });
    }

    // a function that accepts an html canvas Ctx and draws on it whenever there is websocket data
    function onStrokeEvent(ctx) {
        socket.on('stroke', ({ lastPos, currentPos }) => {
            ctx.current.beginPath();
            ctx.current.moveTo(lastPos.x, lastPos.y);
            ctx.current.lineTo(currentPos.x, currentPos.y);
            ctx.current.stroke();
        });
    }

    // A hook that takes an Id uses the websocket to change to a different room
    function useChangeId(id) {
        useEffect(() => {
            console.log('changing id');
            setRoomId(id);
            socket.emit('change id', id);
        }, [id]);
    }

    return (
        <IoContext.Provider
            value={{ isNewUser, onDraw, onStrokeEvent, useChangeId }}
        >
            {children}
        </IoContext.Provider>
    );
}

// a hook that lets me only import one function instead of importing useContext and IoContext
export function useIoContext() {
    return useContext(IoContext);
}
