import React, { useState, useRef, useEffect } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [isActive, setActive] = useState(false);
  const [isPause, setPause] = useState(false);
  const intervalRef = useRef(null);

  const handleInput = (event) => {
    // Convert the input value (minutes) into seconds
    setTime(parseInt(event.target.value) * 60 || 0);
  };

  const formatTime = () => {
    const min = String(Math.floor(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleStart = () => {
    setActive(true);
    setPause(false);
  };

  useEffect(() => {
    if (isActive && !isPause && time > 0) {
     
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      clearInterval(intervalRef.current);
      setActive(false);
      alert("Your time is up!");
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isPause, time]);

  const handlePause = () => {
    setPause(!isPause);
    clearInterval(intervalRef.current); 
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setActive(false);
    setPause(false);
    setTime(0);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-lime-50">
      <div className="flex flex-col w-80 p-6 bg-white shadow-lg shadow-blue-500 rounded-lg">
        <h1 className="font-serif text-3xl text-green-500 text-center">Countdown Timer</h1>

        <input
          type="number"
          placeholder="Enter time (mins)"
          className="border border-gray-400 hover:border-green-500 focus:border-blue-500 p-2 rounded-md placeholder:text-indigo-950 hover:bg-red-100 mt-4 w-full"
          onChange={handleInput}
        />

        <div className="mt-4 text-2xl text-center">{formatTime()}</div>

        <div className="flex justify-between mt-5">
          <button
            onClick={handleStart}
            className="bg-green-400 text-white rounded-md w-20 py-2 hover:bg-green-800"
          >
            Start
          </button>
          <button
            onClick={handlePause}
            className="bg-blue-400 text-white rounded-md w-20 py-2 hover:bg-blue-800"
          >
            {isPause ? "Resume" : "Pause"}
          </button>
          <button
            onClick={handleReset}
            className="bg-red-400 text-white rounded-md w-20 py-2 hover:bg-red-700"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
