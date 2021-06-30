import { StreamChat } from 'stream-chat';

const chatClient = StreamChat.getInstance(process.env.REACT_APP_API_KEY);

export const ConnectionService = {

    connect: async (userObject, token) => {
        try {
            const response = await chatClient.connectUser(userObject, token);
            return response;
        } catch (error) {
            return `[ERROR]: ${error}`;
        };
    },

    disconnect: async () => {
        try {
            const response = await chatClient.disconnectUser();
            return response;
        } catch (error) {
            return `[ERROR]: ${error}`;
        };
    }
}