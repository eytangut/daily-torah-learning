
import ReactDOM from 'react-dom/client';
import {default as AppTag} from './App';
import './index.css';
import { scheduleNotifications } from './services/notifications';
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'
import { App } from '@capacitor/app'
let data = {version: ""}
CapacitorUpdater.notifyAppReady()
App.addListener('appStateChange', async(state) => {
     if (state.isActive) {
       // Do the download during user active app time to prevent failed download
       data = await CapacitorUpdater.download({
       version: '0.0.4',
       url: 'eytangut.github.io',
       })
     }
     if (!state.isActive && data.version !== "") {
       // Do the switch when user leave app
       SplashScreen.show()
       try {
         await CapacitorUpdater.set(data)
       } catch (err) {
         console.log(err)
         SplashScreen.hide() // in case the set fail, otherwise the new app will have to hide it
       }
     }
 })
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

    <AppTag />

);
scheduleNotifications()