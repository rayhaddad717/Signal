import { db,  query, deleteDoc ,addDoc, auth, collection, doc, collectionGroup, orderBy, where, onSnapshot } from '../firebase'

const call = async ({otherUserID,callerUserID,callerName,isVideo}) => {
    try {
      await addDoc(collection(db, 'callNotifications'), {
        timestamp: new Date().getTime(),
        otherUserID,callerUserID,callerName,isVideo
      });
      
    }

    catch (e) { console.log("Error sending call notification", e) }
  }
const rejectCall = async ({otherUserID,callerUserID,onAnotherCall,incomingCallNotificationID}) =>{
    try {
        await deleteDoc (doc(db,'callNotifications',incomingCallNotificationID));
      await addDoc(collection(db, 'callNotifications'), {
        timestamp: new Date().getTime(),
        otherUserID,callerUserID,onAnotherCall
      });
      
    }

    catch (e) { console.log("Error sending call notification", e) }
}
  export {call,rejectCall};