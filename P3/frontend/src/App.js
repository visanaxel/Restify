import logo from './logo.svg';
import './App.css';
import { Register } from './pages/Register/Register';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Register } from './pages/Register';
import { ProfileView } from './pages/Profile';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {/* <Route path="register" element={<Register />} /> */}
          <Route path="profile" element={<ProfileView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
