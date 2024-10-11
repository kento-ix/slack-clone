import {
    getFirestore,
    query,
    collection,
    onSnapshot,
    Timestamp,
    addDoc,
    doc,
    deleteDoc, 
    updateDoc,
} from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebaseConfig";
import { Channel, ChannelRef } from "../../type/Channel";

const db = getFirestore(firebaseApp);

export const subscribeChannels = (
    onChannelsUpdated: (channels: ChannelRef[]) => void
) => {
    const q = query(collection(db, "channels"));

    return onSnapshot(
        q,
        (querySnapshot) => {
            const channelRefs: ChannelRef[] = [];
            querySnapshot.forEach((doc) => {
                channelRefs.push({
                    id: doc.id,
                    channel: doc.data() as Channel,
                });
            });
            onChannelsUpdated(channelRefs);
        },
        (error) => {
            console.error("Failed to subscribe channels:", error);
        }
    );
};
export const postChannel = async (channel: Channel) => {
    await addDoc(collection(db, "channels"), channel);
};

export const createChannel = (name: string, color: string): Channel => {
    const timestamp = Timestamp.fromDate(new Date());
    return {
        name: name,
        color: color,
        create_at: timestamp,
    };
};

export const deleteChannel = async (channelId: string): Promise<void> => {
    try {
        const channelRef = doc(db, "channels", channelId);
        await deleteDoc(channelRef);
    } catch (error) {
        console.error("Error deleting channel:", error);
        throw error;
    }
}

export const updateChannel = async (channelId: string, newName: string): Promise<void> => {
    try {
        const channelRef = doc(db, "channels", channelId);
        await updateDoc(channelRef, {
            name: newName,
            updated_at: Timestamp.fromDate(new Date()),
        });
    } catch (error) {
        console.error("Error updating channel:", error);
        throw error;
    }
}