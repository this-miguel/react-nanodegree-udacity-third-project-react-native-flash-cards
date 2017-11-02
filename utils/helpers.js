import { AsyncStorage } from 'react-native'
import { Notifications, Permissions} from 'expo'

const NOTIFICATION_KEY = 'MobileFlashCards:notifications';

const help =  {
  replaceWhiteSpaces: (string) => string.replace(/ /g, '')
};

  export function clearNotifications () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
 }
 function createNotification () {
   return {
     title: 'remember to review your flashcards',
     body:  'Practice makes the master. For every disciplined effort today you will get a multiple reward in the future',
     ios: {
       sound: true,
     },
     android: {
       sound: true,
       priority: 'high',
       sticky: false,
       vibrate: true,
     }
   }
 }

  export function setNotification () {
   AsyncStorage.getItem(NOTIFICATION_KEY)
     .then(JSON.parse)
     .then((data) => {
        if(data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then( ({status}) =>{
              if(status === 'granted'){

                Notifications.cancelAllScheduledNotificationsAsync()

                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1 )
                tomorrow.setHours(17)
                tomorrow.setMinutes(30)

                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                );

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))

              }
            })
        }
     })
 }
export default help