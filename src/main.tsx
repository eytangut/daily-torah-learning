
import ReactDOM from 'react-dom/client';
import {default as AppTag} from './App';
import './index.css';
import { scheduleNotifications } from './services/notifications';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

    <AppTag />

);
scheduleNotifications()