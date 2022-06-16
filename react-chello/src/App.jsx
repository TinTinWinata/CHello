import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Home from './Page/home';
import Register from './Page/register';
import Login from './Page/login';
import Workspace from './Page/workspace';
import Board from './Page/board';
import { UserAuthContextProvider } from './Library/UserAuthContext';
import ProtectedRoute from './Library/ProtectedRoute';



function App() {
  return (
    <BrowserRouter>
    <UserAuthContextProvider>
      <Routes>
        <Route path="/home" element={<ProtectedRoute>
          <Home>
            </Home>
            </ProtectedRoute>} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/workspace/:id" element={<Workspace/>}/>
        <Route path="/board/:id" element={<Board/>}/>
      </Routes>
    </UserAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

