import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './page/Home';
import Seacrh from './page/Search';

function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:query" element={<Seacrh/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
