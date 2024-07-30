import React, { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';

const socket = io('http://localhost:8000');


function App() {


  const [temp, setTemp] = useState(null);
  const [ultrasonic, setUltrasonic] = useState(null);
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    // Listen for temperature updates
    socket.on('temp', (data) => {
      setTemp(data);
    });

    // Listen for ultrasonic updates
    socket.on('ultrasonic', (data) => {
      setUltrasonic(data);
    });

    socket.on('humidity', (data) => {
      setHumidity(data);
    });

    return () => {
      socket.off('temp');
      socket.off('ultrasonic');
      socket.off('humidity')
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'w') {
        console.log('w pressed')
        sendDirection('forward')
      } else if (event.key === 's') {
        console.log('s pressed');
        sendDirection('backward')
      } else if (event.key === 'a') {
        console.log('a pressed');
        sendDirection('left')
      } else if (event.key === 'd') {
        console.log('d pressed');
        sendDirection('right')
      }
      if (event.key === 'i') {
        console.log('i pressed')
        sendArmValue('forward')
      } else if (event.key === 'j') {
        console.log('j pressed');
        sendArmValue('backward')
      } else if (event.key === 'k') {
        console.log('k pressed');
        sendArmValue('left')
      } else if (event.key === 'l') {
        console.log('l pressed');
        sendArmValue('right')
      }
      else if (event.key === 'q') {
        console.log('q pressed');
        sendArmValue('up')
      }
      else if (event.key === 'e') {
        console.log('e pressed');
        sendArmValue('down')
      }
      else if (event.key === '9') {
        console.log('9 pressed');
        sendArmValue('levelup')
      }
      else if (event.key === '0') {
        console.log('0 pressed');
        sendArmValue('leveldown')
      }
      else if (event.key === 'u') {
        console.log('u pressed');
        sendArmValue('in')
      }
      else if (event.key === 'o') {
        console.log('o pressed');
        sendArmValue('out')
      }
    };
  

  
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  const handleKeyUp = () => {
    
    sendDirection('stop')
  };

  const sendDirection = (direction) => {
    socket.emit('send-direction', direction);
  };

  const sendArmValue = (value) => {
    socket.emit('send-arm-value', value);
  };

  
  return (
    <div className="App">
      <p>Write your code here!</p>
    </div>
  );
}

export default App;
