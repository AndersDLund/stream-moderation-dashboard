import { StreamChat } from 'stream-chat';

const chatClient = StreamChat.getInstance(process.env.REACT_APP_API_KEY);

export const ChannelService = {

    getChannels: (filter, sort, options) => {
        return chatClient.queryChannels(filter, sort, options);
    },

    getMessageContext: (cid, mid) => {
        const channelType = cid.split(':')[0];
        const channelID = cid.split(':')[1];

        const lesser = chatClient.channel(channelType, channelID).query({
            messages: { limit: 6, id_lte: mid }
        });

        const greater = chatClient.channel(channelType, channelID).query({
            messages: { limit: 5, id_gt: mid }
        });

        return Promise.all([lesser, greater]);
    }
}