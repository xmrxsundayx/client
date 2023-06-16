import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-scheduler/lib/css/style.css';
import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import TaskList from './components/TaskList';
import Navbar from './components/Navbar';
import Calendar from './components/MyCalendar';

const currentPath='/'

function App() {
  const currentDate = new Date();
  const[allTasks, setAllTasks] = useState([]);


  return (
    <Router>
      <div className='container'>
        <Navbar />
        <Routes>
          <Route path="/calendar" element={<Calendar currentDate={currentDate} allTasks={allTasks} setAllTasks={setAllTasks} />} />
          <Route path="/" element={
            <div className="row">
              <div className="col-6">
                <TaskList allTasks={allTasks} setAllTasks={setAllTasks}/>
              </div>
              <div className="col-6">
                <Calendar currentDate={currentDate} currentPath={currentPath} />
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;