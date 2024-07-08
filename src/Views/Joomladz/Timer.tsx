import React, { useEffect, useState } from 'react';

const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // Add leading zeros if the number is less than 10
    const addLeadingZero = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

    return `${addLeadingZero(hours)}h : ${addLeadingZero(minutes)}m : ${addLeadingZero(remainingSeconds)}s`;
};

const CountdownTimer: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<number>(6 * 3600); // 6 hours in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {formatTime(timeLeft)}
        </>
    );
};

export default CountdownTimer;
