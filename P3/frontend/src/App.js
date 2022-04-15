import logo from './logo.svg';
import './App.css';
import { Register } from './pages/Register';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
