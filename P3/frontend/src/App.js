import logo from './logo.svg';
import './App.css';
import { Login } from './pages/Login/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ProfileView } from './pages/Profile';
import { ProfileEdit } from './pages/Edit_Profile';
import { Register } from './pages/Login/Register';
import { Blog_Post } from './pages/Blog_Post/Blog_Post';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<ProfileView />} />
          <Route path="profile_edit" element={<ProfileEdit />} />
          <Route path="register" element={<Register />} />
          <Route path="blog/:blogId" element={<Blog_Post />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
