import { Message } from "mpp-api-types";
import Database from "../../core/database/Database";
import { DBMessage } from "../../types/DBTypes";
import { getUser } from "./userModel";

const getMessage = async (id: string): Promise<DBMessage | null> => {
    const messages = (await Database.get("messages", id)) as DBMessage[] | null;
    if (!messages) return null;
    const message = messages[0];
    return message;
};

const getMessagesByListingId = async (listingId: string) => {
    const messages = (await Database.query("SELECT * FROM messages WHERE listing = ?", [
        listingId,
    ])) as DBMessage[] | null;
    if (!messages) return [];
    const fullMessages = Promise.all(
        messages.map(async message => {
            const user = await getUser(message.user);

            return {
                ...message,
                user: user ?? message.user,
            };
        })
    );
    return fullMessages;
};

const addMessage = async (message: Omit<Message, "time">) => {
    const messageId = await Database.insert("messages", message);
    return { ...message, id: messageId };
};

const deleteMessageById = async (messageId: string) => {
    await Database.query("DELETE FROM messages WHERE id = ?", [messageId]);
};

export { getMessage, getMessagesByListingId, addMessage, deleteMessageById };
