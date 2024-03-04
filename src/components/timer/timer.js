import React, { useState, useEffect } from 'react';
import './timer.css';
import soundFile from './media/sound.mp3';

const Timer = () => {
    const [time, setTime] = useState(3600000);
    const [isActive, setIsActive] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        let interval;

        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime - 10);
            }, 10);
        } else if (time === 0) {
            clearInterval(interval);
            alert("Timer has ended!");
            playSound();
        }

        return () => clearInterval(interval);
    }, [isActive, time]);

    useEffect(() => {
        setAudio(new Audio(soundFile));
    }, []);

    const handleStartTimer = () => {
        setIsActive(true);
        setShowReset(true);
    };

    const handleStopTimer = () => {
        setIsActive(false);
    };

    const handleResetTimer = () => {
        setIsActive(false);
        setTime(3600000);
        setShowReset(false);
        pauseSound();
    };

    const formatTime = (milliseconds) => {
        const hours = Math.floor(milliseconds / (1000 * 3600));
        const minutes = Math.floor((milliseconds % (1000 * 3600)) / (1000 * 60));
        const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
        const remainingMilliseconds = milliseconds % 1000;

        return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}.${remainingMilliseconds.toString().padStart(3, '0')}`;
    };

    const playSound = () => {
        audio.play();
    };

    const pauseSound = () => {
        if (audio) {
            audio.pause();
        }
    };

    return (
        <div className="timer">
            <div className="container">
                <div className="timer_container">
                    <h1 className='title'>Stopwatch</h1>
                    <h1 className='running_time'>{formatTime(time)}</h1>
                    <div className="buttons">
                        {!isActive && <button className='stop' onClick={handleStartTimer}>Start</button>}
                        {isActive && <button className='stop' onClick={handleStopTimer}>Stop</button>}
                        {showReset && <button className='reset' onClick={handleResetTimer}>Reset</button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timer;