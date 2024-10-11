import React, {useState} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {selectChannel} from "../../feature/channel/channelSlice";
import {Channel} from "../../type/Channel";
import EditIcon from '@mui/icons-material/Edit';  
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteChannel, updateChannel} from "../../feature/channel/channelAPI";

type Props = {
    channel: Channel
    id: string
}

const ChannelCell = ({channel, id}:Props) => {
    const dispatch = useAppDispatch();
    const [editedName, setEditedName] = useState(channel.name);
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteChannel(id);
        } catch (error) {
            console.error('Error deleting channel:', error);
        }
    };

    const handleEdit = async () => {
        if (editedName.trim() !== "") {
            try {
                await updateChannel(id, editedName);
                setIsEditing(false);
            } catch (error) {
                console.error('Error updating channel:', error);
            }
        }
    };

    const handleChannelName = () => {
        dispatch(selectChannel(id))
    }



    return (
        <div className="channel-cell p-2 flex justify-between items-center" style={{ color : channel.color }}>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="p-1 bg-gray-600 text-white"
                    />
                    <button onClick={handleEdit} className="text-green-700">保存</button>
                    <button onClick={() => setIsEditing(false)} className="text-red-700">キャンセル</button>
                </div>
            ) : (
                <div className="flex justify-between items-center w-full">
                    <span onClick={handleChannelName} className="cursor-pointer"># {channel.name}</span>
                    <div>
                        <button onClick={() => setIsEditing(true)} className="mr-2">
                            <EditIcon />
                        </button>
                        <button onClick={handleDelete}>
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChannelCell;