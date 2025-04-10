import './App.css';

import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    return (
        <div className="app">
            <AppRoutes />
            <ToastContainer autoClose={3000} position='top-right' />
        </div>
    );
}