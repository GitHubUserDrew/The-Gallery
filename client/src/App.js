import './App.css';
import Login from './components/Login'
import Register from './components/Register';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Gallery from './components/Gallery';
import { useEffect } from 'react';
import { getUser } from './store/authSlice';

function App() {

  const user = useSelector(state => state.auth);
  const dispatch= useDispatch();
  useEffect(() =>{
    dispatch(getUser())

  },[]);

  

 
  return (

    <div className="App">
      <Router>
        <Routes>
          {
            !user && (
              <>
                <Route path="/" element={<Login />} />
                <Route path='/register' element={<Register />} />
              </>
            )
          }
          {
            user &&(
              <>
              <Route path="/" element={<Gallery />} />
              
              </>
            )
          }


        </Routes>
      </Router>




    </div>

  );
}

export default App;
