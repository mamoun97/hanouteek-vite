import React, { useEffect, useState } from 'react';

interface OtpTimerProps {
  duration: number; // Duration of the OTP validity in seconds
  onExpire: () => void; // Callback when the OTP expires
}


const OtpTimer: React.FC<OtpTimerProps> = ({ duration, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onExpire]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <p>{formatTime(timeLeft)}</p>
    </div>
  );
};

export default OtpTimer;
