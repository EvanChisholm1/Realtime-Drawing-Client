import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

export default function Home() {
    const history = useHistory();

    const [textInput, setTextInput] = useState('');

    function createRoom() {
        const roomId = uuid();
        history.push(`/${roomId}`);
    }

    function joinRoom() {
        history.push(`/${textInput}`)
    }

    function handleChange(e) {
        setTextInput(e.currentTarget.value)
    }

    return (
        <div className="flex flex-col text-center items-center">
            <h1 className="text-6xl">A virtual whiteboard for you and your friends</h1>
            <button className="p-6 pt-3 pb-3 bg-blue-300 m-5 mt-2 mb-2 rounded-lg" onClick={createRoom} >Create New Canvas</button>
            <form onSubmit={joinRoom}>
                <label htmlFor="code">enter a code to join a friend</label>
                <input value={textInput} onChange={handleChange} className="border-4 border-red-500" placeholder="your code" name="code" type="text"/>
                <button className="p-6 pt-3 pb-3 bg-blue-300 m-5 mt-2 mb-2 rounded-lg">Join</button>
            </form>
        </div>
    )
}