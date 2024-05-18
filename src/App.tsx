import './styles.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from "./Routes/Routes";


function App() {
  
  return (
    <>
      <BrowserRouter>
          <ToastContainer />
          <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App
