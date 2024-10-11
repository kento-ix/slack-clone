import React, {useEffect, useState} from 'react';
import {User} from "../../type/User";
import {Message} from "../../type/Message";
import {getUser} from "../../feature/user/userAPI";
import {deleteMessage, updateMessage} from "../../feature/message/messageAPI"; 

interface MessageTileProps {
    message: Message;
    messageId: string; 
}
const MessageTile = ({ message, messageId }: MessageTileProps) => {
    const [owner, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false); 
    const [editedText, setEditedText] = useState(message.text); 

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const ownerData = await getUser(message.user_id);
                if (ownerData) {
                    setUser(ownerData);
                }
            } catch (error) {
                setUser(null);
            }
        };
        fetchUser();
    }, [message.user_id]);


    const handleDelete = async () => {
        try {
            await deleteMessage(messageId); 
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const handleEdit = async () => {
        if (editedText.trim() !== "") {
            try {
                await updateMessage(messageId, editedText); 
                setIsEditing(false); 
            } catch (error) {
                console.error('Error updating message:', error);
            }
        }
    };

    return (
        <div className="bg-gray-700 p-3 m-3 rounded-lg">
            <div className="flex items-center mb-2">
                <img src={owner?.profile_picture || './default-user-icon.webp'} alt="プロフィール画像" className="w-10 h-10 rounded-full mr-2"/>
                <div>
                    <div className="text-sm font-semibold">{owner?.displayName || "unknown"}</div>
                    <div className="text-xs text-gray-400">{message.create_at.toDate().toLocaleString() || ""}</div>
                </div>
            </div>
            
            {isEditing ? (
                <div>
                    <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="w-full p-2 bg-gray-600 text-white rounded-md mb-2"
                    />
                    <button
                        onClick={handleEdit}
                        className="text-green-500 hover:text-green-400 mr-2"
                    >
                        保存
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="text-red-500 hover:text-red-400"
                    >
                        キャンセル
                    </button>
                </div>
            ) : (
                <p className="text-gray-300">{message.text}</p>
            )}

            <div className="mt-2 flex justify-end">
                <button
                    onClick={() => setIsEditing(true)} 
                    className="text-blue-500 hover:text-blue-400 mr-3"
                >
                    編集
                </button>
                <button
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-400"
                >
                    削除
                </button>
            </div>
        </div>
    );
};

export default MessageTile;
