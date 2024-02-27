import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './component/Navbar'
import Home from './component/Home'
import About from './component/About'
import NoteState from './context/notes/NoteState';
import Login from './component/Login';
import Signup from './component/Signup';
function App() {
 
  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
            <Switch>
                  <Route path="/login">
                    <Login />
                    </Route>
                    <Route path="/signup">
                    <Signup/>
                  </Route>
                  <Route exact path="/Home">
                    <Home />
                  </Route>
                  
                  <Route path="/about">
                    <About />
                  </Route>
                </Switch>
          </Router>
      </NoteState>
    </>
  );
}

export default App;
