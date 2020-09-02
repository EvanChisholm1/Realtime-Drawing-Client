import React, { useState } from 'react';
import { Canvas } from './Canvas';
import { useIoContext } from './IoContext';
import { AnimatePresence, motion } from 'framer-motion';

export function CanvasPage({ match }) {
    const [isMessageShown, setIsMessageShown] = useState(false);
    const { isNewUser, useChangeId } = useIoContext();

    // when the page loads join the correct websocket room based on your url
    useChangeId(match.params.id);

    // a function that lets you copy the link and share it with friends
    function copyLink() {
        navigator.clipboard.writeText(window.location.href);
        // we set a flag to true that shows you the link was copied
        setIsMessageShown(true);
        setTimeout(() => {
            setIsMessageShown(false);
        }, 2000);
    }

    return (
        <div className="h-screen overflow-hidden flex flex-col items-center">
            <h1 className="text-lg">Invite code: {match.params.id}</h1>
            <button
                className="p-6 pt-3 pb-3 bg-blue-300 m-5 mt-2 mb-2 rounded-lg"
                onClick={copyLink}
            >
                invite friends
            </button>
            <Canvas
                width={750}
                height={300}
                className="border-red-500 border-8 canvas"
            />
            {/* the animate presence component lets us have unmount and mount animations */}
            <AnimatePresence>
                {isMessageShown && (
                    // the motion.div component lets us use very fancy animations with framer motion
                    <motion.div
                        key="copied"
                        initial={{
                            opacity: 0,
                            translateY: -50,
                        }}
                        animate={{
                            opacity: 1,
                            translateY: 0,
                        }}
                        exit={{
                            opacity: 0,
                            translateY: 50,
                        }}
                        className="fixed bottom-0 left-0 m-6 p-3 bg-gray-500 rounded-lg"
                    >
                        The Link To your canvas has been copied to your
                        clipboard
                    </motion.div>
                )}
                {isNewUser && (
                    <motion.div
                        key="new user"
                        initial={{ opacity: 0, translateY: -50 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0, translateY: 50 }}
                        className="fixed bottom-0 left-0 m-6 p-3 bg-gray-500 rounded-lg"
                    >
                        A new Person has arrived
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
