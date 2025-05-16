import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Alert from "./components/Alert";
import AlertState from "./context/notes/AlertSate";
import Logout from "./components/Logout";
import Notfound from "./components/Notfound";

function App() {
  return (
    <>
      <AlertState>
        <NoteState>
          <Router>
            <Navbar />
            <Alert/>
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Home />}></Route> 
                <Route exact path="/about" element={<About />}></Route>
                <Route exact path="/login" element={<Login />}></Route>
                <Route exact path="/logout" element={<Logout/>}></Route>
                <Route exact path="/signup" element={<SignUp />}></Route>
                <Route exact path="*" element={<Notfound/>}></Route>
              </Routes>
            </div>
          </Router>
        </NoteState>
      </AlertState>
    </>
  );
}

export default App;
