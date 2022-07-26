import logo from './logo.svg';
import './App.css';
import { Login } from './pages/Login/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ProfileView } from './pages/Profile';
import { ProfileEdit } from './pages/Edit_Profile';
import { Register } from './pages/Login/Register';
import { Blog_Post } from './pages/Blog_Post/Blog_Post';
import { Menu } from './pages/Menu';
import { Edit } from './pages/EditMenu';
import { Home } from './pages/Home/Home';
import { SearchResult } from  './pages/SearchResult/SearchResult';
import {Edit_Blog_Post} from './pages/Blog_Post/Edit_Blog_Post';
import { Restaurant_View } from './pages/Restaurant/Restaurant_View';
import { Add } from './pages/AddToMenu'
import { Edit_Restaurant } from './pages/Restaurant/Edit_Restaurant';
import { UserNotif } from './pages/Notification/UserNotif';
import { RestNotif } from './pages/Notification/RestNotif';
import { Add_Restaurant } from './pages/Restaurant/Add_Restaurant';
import { Create_Blog_Post } from './pages/Blog_Post/Create_Blog';
import { UserFeed } from './pages/Notification/UserFeed';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<ProfileView />} />
          <Route path="profile_edit" element={<ProfileEdit />} />
          <Route path="register" element={<Register />} />
          <Route path="blog/:blogId/:restId" element={<Blog_Post />} />
          <Route path="restaurant/:restaurant_id/menu/" element={<Menu />} />
          <Route path="menu/:menu_id/edit/" element={<Edit />} />
          <Route path="home" element={<Home />} />
          <Route path="search/:query" element={<SearchResult />} />
          <Route path="blog/edit/:blogId" element={<Edit_Blog_Post />} />
          <Route path="blog/add" element={<Create_Blog_Post />} />


          <Route path="restaurant/:restId" element={<Restaurant_View />} />
          <Route path="restaurant/edit/:restId" element={<Edit_Restaurant />} />
          <Route path="restaurant/add" element={<Add_Restaurant />} />


          <Route path="/restaurant/:restaurant_id/menu/add/" element={<Add />} />

          <Route path="user_notification" element={<UserNotif />} />
          <Route path="restaurant_notification" element={<RestNotif />} />
          <Route path="feed" element={<UserFeed />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
