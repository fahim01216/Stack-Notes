import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null);
  // const [mode, setMode] = useState('light');
  // const [textMode, setTextMode] = useState('dark');

  const showAlert = (type, message) => {
    setAlert({
      type: type,
      message: message
    })
    setTimeout(() => {
      setAlert(null)
    }, 1000);
  }

  // const toggleMode = () => {
  //   if(mode === 'light') {
  //     setMode('dark');
  //     setTextMode('light');
  //     document.body.style.color = 'white';
  //     document.body.style.backgroundColor = '#060B23';
  //     showAlert('success', 'Dark mode has been enabled!!');
  //   }
  //   else {
  //     setMode('light');
  //     setTextMode('dark');
  //     document.body.style.color = 'black';
  //     document.body.style.backgroundColor = 'white';
  //     showAlert('success', 'Light mode has been enabled!!');
      
  //   }
  // }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home/>} />
              <Route exact path='/about' element={<About/>} />
              <Route exact path='/login' element={<Login showAlert={showAlert} />} />
              <Route exact path='/signup' element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
