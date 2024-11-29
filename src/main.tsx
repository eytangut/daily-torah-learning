import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { scheduleNotifications } from './services/notifications';
import { CapacitorUpdater } from '@capgo/capacitor-updater';

// Ensure the DOM is fully loaded before rendering
const rootElement = document.getElementById('root') as HTMLElement;

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
    
    // Schedule notifications after the app is rendered
    scheduleNotifications();

    // Notify Capgo that the app is ready for updates
    CapacitorUpdater.notifyAppReady();
} else {
    console.error('Root element not found');
}