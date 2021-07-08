import { StreamChat } from 'stream-chat';

const chatClient = StreamChat.getInstance(process.env.REACT_APP_API_KEY);

export const ConnectionService = {

    connect: (userObject, token) => {
        return chatClient.connectUser(userObject, token);
    },

    disconnect: () => {
        return chatClient.disconnectUser();
    }
}