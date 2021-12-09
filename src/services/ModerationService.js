import { StreamChat } from 'stream-chat';

const axios = require('axios');
const chatClient = StreamChat.getInstance(process.env.REACT_APP_API_KEY);

export const ModerationService = {

    getFlaggedMessages: (filter, options) => {
        const url = `${process.env.REACT_APP_BASE_URL}/moderation/flagged`;
        return axios.post(url, { filter, options });
    },
    getMessageSentiment: (text) => {
        console.log(text, 'TEXT');
        const url = `${process.env.REACT_APP_BASE_URL}/moderation/sentiment`;
        return axios.post(url, { text });
    },
    BanUser: (userIds) => {
        const url = `${process.env.REACT_APP_BASE_URL}/moderation/banUser`;
        console.log(userIds)
        // return axios.post(url, { userIds });
    },
}