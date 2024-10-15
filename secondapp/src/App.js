import './App.css';
import {BrowserRouter ,Routes,Route} from "react-router-dom"
import Home from "./Home"
import Dashboard from './Dashboard';

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/Home' element={<Home/>}/>
        <Route path='Dashboard' element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
