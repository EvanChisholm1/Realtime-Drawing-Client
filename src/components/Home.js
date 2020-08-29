import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

export default function Home() {
    const history = useHistory();

    const [textInput, setTextInput] = useState('');

    // when I create a room I generate a uuid and push the current user to that url
    function createRoom() {
        const roomId = uuid();
        history.push(`/${roomId}`);
    }

    // when you submit the form it sends you to the room of the code you entered
    function joinRoom() {
        history.push(`/${textInput}`)
    }

    // simple function for handling my input
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