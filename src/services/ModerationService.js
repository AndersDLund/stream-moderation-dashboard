import { StreamChat } from 'stream-chat';

const axios = require('axios');
const chatClient = StreamChat.getInstance(process.env.REACT_APP_API_KEY);

export const ModerationService = {

    getFlaggedMessages: (filter, options) => {
        const url = `${process.env.REACT_APP_BASE_URL}/moderation/flagged`;
        return axios.post(url, { filter, options });
    }
}