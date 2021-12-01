const axios = require('axios');

export const ModerationService = {

    getFlaggedMessages: (filter, options) => {
        const url = `${process.env.REACT_APP_BASE_URL}/moderation/flagged`;
        return axios.post(url, { filter, options });
    },
    getMessageSentiment: (text) => {
        const url = `${process.env.REACT_APP_BASE_URL}/moderation/sentiment`;
        return axios.post(url, { text });
    },
    banUser: (userID) => {
        // userID is an array
        const url = `${process.env.REACT_APP_BASE_URL}/moderation/user/ban`;
        return axios.post(url, { userID }); 
    }
}