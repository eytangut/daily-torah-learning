import { LocalNotifications } from '@capacitor/local-notifications';

async function scheduleNotifications() {
  // Request permission
  await LocalNotifications.requestPermissions();

  // Define notification hours (24-hour format)
  const notificationHours = [7, 14, 19, 22];

  // Get all pending notifications
  const pendingNotifications = await LocalNotifications.getPending();

  // Schedule notifications for each hour if not already scheduled
  for (let i = 0; i < notificationHours.length; i++) {
    const notificationId = i + 1;
    
    // Check if this notification is already scheduled
    const isScheduled = pendingNotifications.notifications.some(
      notification => notification.id === notificationId
    );

    if (!isScheduled) {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: notificationId,
            title: "Reminder",
            body: "This is your scheduled notification!",
            schedule: { 
              on: { 
                hour: notificationHours[i], 
                minute: 0
              },
              repeats: true,
              every: 'day'
            },
            sound: 'default',
            actionTypeId: '',
            extra: null
          }
        ]
      });
    }
  }
}

export { scheduleNotifications };