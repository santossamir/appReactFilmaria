
import Routes from './routes';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppPrincipal() {
  return (
    <div className="app">
        <Routes/>
        <ToastContainer autoClose={3000} />
    </div>
  );
}
