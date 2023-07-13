import "./App.css";
import { useEffect, useState } from "react";

function App() {

  const keyBoard = [
    {
      keyCode: 81,
      text: "Q",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
      srcAlt: 'https://cdn.glitch.com/0966cc53-0935-45e4-9edf-7c4fa500e219%2FRX15%20CLHH.wav?1532352722339',
      name: "Heater Opened",
      nameAlt: 'CLHH',
    },
    {
      keyCode: 87,
      text: "W",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
      srcAlt: 'https://cdn.glitch.com/0966cc53-0935-45e4-9edf-7c4fa500e219%2FRX15%20SNR%20D1.wav?1532352722730',
      name: "Heater Nice",
      nameAlt: 'SNR D1',
    },
    {
      keyCode: 69,
      text: "E",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
      srcAlt: 'https://cdn.glitch.com/0966cc53-0935-45e4-9edf-7c4fa500e219%2FRX15%20RIM%20SHT.wav?1532352722795',
      name: "Heater Awsome",
      nameAlt: 'RIM SHT',
    },
    {
      keyCode: 65,
      text: "A",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
      srcAlt: 'https://cdn.glitch.com/0966cc53-0935-45e4-9edf-7c4fa500e219%2FRX15%20SNR%20D2.wav?1532352722873',
      name: "Heater Slow",
      nameAlt: 'SNR D2',
    },
    {
      keyCode: 83,
      text: "S",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
      srcAlt: 'https://cdn.glitch.com/0966cc53-0935-45e4-9edf-7c4fa500e219%2FRX15%20RIDE.wav?1532352722922',
      name: "Heater Muted",
      nameAlt: 'RIDE',
    },
    {
      keyCode: 68,
      text: "D",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
      srcAlt: 'https://cdn.glitch.com/0966cc53-0935-45e4-9edf-7c4fa500e219%2FRX15%20TOM1.wav?1532352723451',
      name: "Disk Nice",
      nameAlt: 'TOM1',
    },
    {
      keyCode: 90,
      text: "Z",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
      srcAlt: 'https://cdn.glitch.com/0966cc53-0935-45e4-9edf-7c4fa500e219%2FRX15%20TOM2.wav?1532352723760',
      name: "Kick Hat",
      nameAlt: 'TOM2',
    },
    {
      keyCode: 88,
      text: "X",
      src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
      srcAlt: 'https://cdn.glitch.com/0966cc53-0935-45e4-9edf-7c4fa500e219%2FRX15%20COWBELL.wav?1532352724065',
      name: "Kick Awsome",
      nameAlt: 'COWBELL',
    },
    {
      keyCode: 67,
      text: "C",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
      srcAlt: 'https://cdn.glitch.com/0966cc53-0935-45e4-9edf-7c4fa500e219%2FRX15%20OPHH.wav?1532352724689',
      name: "Disk Muted",
      nameAlt: 'OPHH',
    },
  ];

  // Function to control power On or Off
  const[power, setPower] = useState(true);
  
  function handlePower(){
    setPower(prevPower => !prevPower);
    console.log("switched");
  }

  // Function to handle the bank controler
  const[bank, setBank] = useState(true);
  
  function handleBank(){
    setBank(prevBank => !prevBank);
    console.log("switched2");
  }

  //Function to play audio on keypress
  const [activeKey, setActiveKey] = useState("");
  
  function handleClick(selector, name) {
    if(power){
    const audio = document.getElementById(selector);
    audio.volume = (volume/100);
    audio.play();
    setActiveKey(name);
  }
  }

  // Function to set up the volume option
  const [volume, setVolume] = useState(50);
  
  function handleVolume(e) {
    e.preventDefault();
    setVolume(parseInt(e.target.value));
  };

  // Array to verify the correct keys to press on Keyboard
  const validKeys = ["q", "w", "e", "a", "s", "d", "z", "x", "c"];

  // Function to activate sounds with corresponding Key on keyboard
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (validKeys.includes(e.key.toLowerCase())) {
        handleClick(e.key.toUpperCase());
      }
    });
  }, []);

  return (
    <div className="App">
      <div id="header">
        <div id="credits">
          <span>Drum Machine by <strong>Esteban Castro</strong></span>
        </div>
        <div id="app-status">
          <div>
            <span style={{ marginRight: "5px", fontWeight: "bold" }}>{power ? "On" : "Off"}</span>
            <i className={`bi bi-circle-fill ${power ? "app-on" : "app-off"}`}></i>
          </div>
        </div>
      </div>
      <div id="drum-machine">
        <div id="pads">
          {keyBoard.map((i) => (
            <div
              key={i.keyCode}
              id={i.keyCode}
              className="drum-pad"
              onClick={() => {
                handleClick(i.text, bank ? i.name : i.nameAlt);
              }}
            >
              {i.text}
              <audio className="clip" id={i.text} src={bank ? i.src : i.srcAlt} />
            </div>
          ))}
        </div>

        <div id="controls-container">
          <div id="display-container">
            <div id="display" className={power ? "display-on" : "display-off"}><span>{activeKey}</span></div>
          </div>
          <div id="controls">
            <div id="power-control">
              <p>Power</p>
              <div className="select">
                <div id="switch" className="inner" style={{ float: power ? "right" : "left" }} onClick={handlePower}></div>
              </div>
            </div>
            <div id="volume-control">
              <p>Volume</p>
              <input type="range" id="slider" min="1" max="100" step="1" value={volume} onChange={handleVolume} />
            </div>
            <div id="bank-control">
              <p>Bank</p>
              <div className="select">
                <div id="switch2" className="inner" style={{ float: bank ? "right" : "left" }} onClick={handleBank}></div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
