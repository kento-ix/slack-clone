import { getFirestore, query, collection, where, addDoc, onSnapshot, Timestamp, doc, deleteDoc, updateDoc } from "firebase/firestore";
import {firebaseApp} from '../../firebase/firebaseConfig';
import {Message, MessageRef} from "../../type/Message";

const db = getFirestore(firebaseApp);

export const subscribeMessages = (channelID: string, onMessagesUpdated: (messages: MessageRef[]) => void) => {
    const q = query(collection(db, "messages"), where("channel_id", "==", channelID));

    return onSnapshot(q, (querySnapshot) => {
        const messageRefs: MessageRef[] = [];
        querySnapshot.forEach((doc) => {
            messageRefs.push({
                id: doc.id,
                message: doc.data() as Message
            });
        });
        onMessagesUpdated(messageRefs);
    }, (error) => {
        console.error("Failed to subscribe messages:", error);
    });
}

export const postMessage = async (message:Message)=> {
    await addDoc(collection(db, "messages"), message)
}

export const createMessage = (
    userId: string,
    channelId: string,
    messageText: string
): Message => {
    const timestamp = Timestamp.fromDate(new Date());
    return {
        user_id: userId,
        channel_id: channelId,
        text: messageText,
        create_at: timestamp,
        is_edited: false,
        update_at: timestamp,
    };
};

export const deleteMessage = async (messageId: string): Promise<void> => {
    try {
        const messageRef = doc(db, "messages", messageId);
        await deleteDoc(messageRef);
    } catch(error) {
        console.error("Error deleting message:", error);
        throw error;
    }
} 

export const updateMessage = async (messageId: string, newText: string): Promise<void> => {
    try {
        const messageRef = doc(db, "messages", messageId);
        await updateDoc(messageRef, {
            text: newText,
            is_edited: true,
            update_at: Timestamp.fromDate(new Date()),
        });
    } catch (error) {
        console.error("Error updating message:", error);
        throw error;
    }
}