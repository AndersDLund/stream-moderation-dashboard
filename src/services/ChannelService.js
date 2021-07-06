import { StreamChat } from 'stream-chat';

const chatClient = StreamChat.getInstance(process.env.REACT_APP_API_KEY);

export const ChannelService = {

    getChannels: (filter, sort, options) => {
        return chatClient.queryChannels(filter, sort, options);
    }
}