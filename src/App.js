import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [second, setSecond] = useState(new Date().getSeconds());
  const [minute, setMinute] = useState(new Date().getMinutes());
  const [hour, setHour] = useState(new Date().getHours());

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      setSecond(currentTime.getSeconds());
      setMinute(currentTime.getMinutes());
      setHour(currentTime.getHours());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const secondDeg = (second / 60) * 360;
  const minuteDeg = (minute / 60) * 360 + (second / 60) * 6;
  const hourDeg = (hour % 12) * 30 + (minute / 60) * 30;

  return (
    <div className="App">
      <h1>Analog Clock</h1>
      <div className="clock-face">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
          const rotateDeg = item>6?((12-item/ 12) * 360):(12-item/ 12) * 360; 
          console.log(rotateDeg,"item")
          return (
            <div
              key={index}
              className="clock-number"
              style={{
                transform: `rotate(${rotateDeg-90}deg) translate(170px) rotate(-${rotateDeg<90?rotateDeg+270:rotateDeg-90}deg)`
              }}
            >
              {item}
            </div>
          );
        })}
        <div
          className="hour-hand"
          style={{ transform: `rotate(${360-hourDeg}deg)` }}
        ></div>
        <div
          className="minute-hand"
          style={{ transform: `rotate(${360-minuteDeg}deg)` }}
        ></div>
        <div
          className="second-hand"
          style={{ transform: `rotate(${360-secondDeg}deg)` }}
        ></div>
        <div className="center-point"></div>
      </div>
    </div>
  );
}

export default App;
