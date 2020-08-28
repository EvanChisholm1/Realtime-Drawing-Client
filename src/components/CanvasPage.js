import React, { useState } from 'react';
import { Canvas } from './Canvas';
import { useIoContext } from './IoContext';
import { AnimatePresence, motion } from 'framer-motion';

export function CanvasPage({ match }) {

    const [isMessageShown, setIsMessageShown] = useState(false);

    const { useChangeId } = useIoContext();
    useChangeId(match.params.id);

    function copyLink() {
        navigator.clipboard.writeText(window.location.href);
        setIsMessageShown(true);
        setTimeout(() => {
            setIsMessageShown(false)
        }, 2000)
    }

    return (
        <div className="h-screen overflow-hidden flex flex-col items-center">
            <h1 className="text-lg">Invite code: {match.params.id}</h1>
            <button className="p-6 pt-3 pb-3 bg-blue-300 m-5 mt-2 mb-2 rounded-lg" onClick={copyLink}>invite friends</button>
            <Canvas width={750} height={300} className="border-red-500 border-8 canvas" />
            <AnimatePresence>
                {isMessageShown && (
                    <motion.div
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
                        The Link To your canvas has been copied to your clipboard
                    </motion.div>)}
            </AnimatePresence>
        </div>
    )
}