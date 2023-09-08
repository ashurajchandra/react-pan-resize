
import './App.css';
import React, {useRef} from 'react'
import mainImg from './Assets/test.jpeg'
import LeftContainer from './Left';
import RightContainer from './Right';
import ResizeWindow from './ResizeWindow/ResizeWindow';

function App() {
  return (
    <div className="App">
      <ResizeWindow id="hii" leftWidth = {20} middleWidth={20} rightWidth={60}  minWidth = {200}  >
      <ResizeWindow.Slot name="leftActions">
        <div className='left-wrapper'> <LeftContainer/></div>
        </ResizeWindow.Slot>
        <ResizeWindow.Slot name="middleActions">
        <div className='middle-wrapper'> <RightContainer/></div>
        </ResizeWindow.Slot>
    
    <ResizeWindow.Slot name="rightActions">
    <div >
       <div className='viewer'></div>
    </div>
    </ResizeWindow.Slot>
    </ResizeWindow>
    </div>
  );
}

export default App;
