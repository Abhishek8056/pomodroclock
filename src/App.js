import React, { useState, useEffect } from 'react';

const PomodoroClock = () => {
  const [cyclesLimit, setCyclesLimit] = useState(1);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [sessionType, setSessionType] = useState('Work');
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes === 0) {
            // Switch session type
            if (sessionType === 'Work') {
              setSessionType('Break');
              setMinutes(5);
            } else {
              setSessionType('Work');
              setMinutes(25);
              setCurrentCycle(currentCycle + 1);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // Check if cycles limit reached
    if (currentCycle > cyclesLimit) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds, sessionType, cyclesLimit, currentCycle]);

  const toggleClock = () => {
    setIsRunning(!isRunning);
  };

  const resetClock = () => {
    setIsRunning(false);
    setCurrentCycle(1);
    setSessionType('Work');
    setMinutes(25);
    setSeconds(0);
  };

  const formatTime = time => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div class="wrapper">
      <div data-reactroot>
        <div>
          <div class="container">
            <div>
              <h2>Pomodoro Clock</h2>
              <div>
                <label>Cycles Limit:</label>
                <input
                  type="number"
                  value={cyclesLimit}
                  onChange={e => setCyclesLimit(parseInt(e.target.value))}
                />
              </div>
              <div>
                <h3>{sessionType} Session</h3>
                <div>
                  <span>{formatTime(minutes)}</span>:
                  <span>{formatTime(seconds)}</span>
                </div>
                <div>
                  {isRunning ? (
                    <button onClick={toggleClock}>Pause</button>
                  ) : (
                    <button onClick={toggleClock}>Start</button>
                  )}
                  <button onClick={resetClock}>Reset</button>
                </div>
              </div>
              <div>
                <h3>Cycles Completed: {currentCycle - 1}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroClock;
