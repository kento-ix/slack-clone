import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import {TextareaAutosize} from '@mui/base/TextareaAutosize';
import SendIcon from '@mui/icons-material/Send';
import {MessageRef} from "../../type/Message";
import {useAppSelector} from "../../app/hooks";
import {createMessage, subscribeMessages, postMessage} from "../../feature/message/messageAPI";
import MessageTile from './MessageTile';

const MessageArea = () => {
    const [messageRefs, setMessageRefs] = useState<MessageRef[]>([]);
    const userId = useAppSelector((state) => state.user.userId);
    const channelId :string = useAppSelector(state => state.channel.currentChannelId);

    const [message, setMessage] = useState('');

    // メッセージ入力時の処理
    const handleInputChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }

    // メッセージ送信処理
    const sendMessage = async () => {
        if (userId && message.trim() !== "") {
            try {
                await postMessage(createMessage(userId, channelId, message));
                setMessage("");  // メッセージ送信後に入力フィールドをクリア
            } catch (e) {
                console.error('Error sending message: ', e);
            }
        }
    }

    // Enter キーでメッセージを送信する処理
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.code === "Enter" && !e.shiftKey) {
            e.preventDefault();  // 改行を無効化
            sendMessage();       // メッセージ送信
        }
    }

    useEffect(() => {
        const unsubscripbe = subscribeMessages(channelId, (messageRefs) => {
            setMessageRefs(messageRefs);
        });
        return () => unsubscripbe();
    }, [channelId]);

    return (
        <div className="flex-1 flex flex-col bg-gray-500 text-white">
            <div className="p-4 m-3 overflow-y-auto">
                {messageRefs.map((messageRef) => (
                    <MessageTile 
                        message={messageRef.message} 
                        messageId={messageRef.id}
                        key={messageRef.id}
                    />
                ))}
            </div>

            <div className="mt-auto px-4 py-2 bottom-0 bg-gray-900">
                <div className="flex items-center">
                    <TextareaAutosize
                        placeholder="メッセージを入力"
                        className="flex-1 bg-gray-700 text-white p-2 mx-2 rounded-lg focus:outline-none"
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        value={message}
                    />
                    <button
                        className="text-gray-400 hover:text-white"
                        onClick={sendMessage}
                        disabled={message.trim() === ""}
                    >
                        <SendIcon/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageArea;
