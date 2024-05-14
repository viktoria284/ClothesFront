import './styles.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from './Context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from "./Routes/Routes";


function App() {
  
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <ToastContainer />
          <AppRoutes />
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App
