

import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface TimerProps {
    createdAt: string | Date;
}

const Timer: React.FC<TimerProps> = ({ createdAt }) => {
    const [timeRemaining, setTimeRemaining] = useState<number>(calculateTimeRemaining());

    function calculateTimeRemaining() {
        const createdTime = new Date(createdAt).getTime();
        const currentTime = Date.now();
        const diffInSeconds = Math.floor((currentTime - createdTime) / 1000);
        return Math.max(60 - diffInSeconds, 0);
    }


    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => clearInterval(timer);
    }, [createdAt]);

    return (
        <>
            {timeRemaining > 0 ?
                (
                    <CountdownCircleTimer
                        isPlaying
                        duration={60}
                        initialRemainingTime={timeRemaining}
                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[50, 30, 10, 0]}
                        size={40}

                    >
                        {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>




                )
                :
                (<div className="item">
                    <div className="loader-pulse bg-red-500"></div>
                </div>)

            }

        </>
    );
};

export default Timer;
