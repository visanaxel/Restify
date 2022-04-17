import logo from './logo.svg';
import './App.css';
import { Login } from './pages/Login/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ProfileView } from './pages/Profile';
import { ProfileEdit } from './pages/Edit_Profile';
import { Register } from './pages/Login/Register';
import { Menu } from './pages/Menu';
import { Home } from './pages/Home/Home';
import { SearchResult } from  './pages/SearchResult/SearchResult';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<ProfileView />} />
          <Route path="profile_edit" element={<ProfileEdit />} />
          <Route path="register" element={<Register />} />
          <Route path="restaurant/:restaurant_id/menu/" element={<Menu />} />
          <Route path="home" element={<Home />} />
          <Route path="search/:query" element={<SearchResult />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
