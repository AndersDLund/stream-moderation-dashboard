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
    // Step 1 for placing methods / copy banUser with correct parameters
    banUser: (userID) => {
        // userID is an array
        const url = `${process.env.REACT_APP_BASE_URL}/moderation/user/ban`;
        return axios.post(url, { userID }); 
    },

    banUser24: (userID) => {
        // userID is an array
        const url = `${process.env.REACT_APP_BASE_URL}/moderation/user/ban24`;
        return axios.post(url, { userID }); 
    },

    deleteUser: (userID) => {
        // userID is an array
        const url = `${process.env.REACT_APP_BASE_URL}/moderation/user/delete`;
        return axios.post(url, { userID }); 
    },

    deleteUserAndMessages: (userID) => {
        // userID is an array
        const url = `${process.env.REACT_APP_BASE_URL}/moderation/user/deleteUserAndMessages`;
        return axios.post(url, { userID }); 
    },

    deleteMessage: (messageID) => {
        // userID is an array
        const url = `${process.env.REACT_APP_BASE_URL}/moderation/message/delete`;
        return axios.post(url, { messageID }); 
    },

    unflagMessage: (messageID) => {
        // userID is an array
        const url = `${process.env.REACT_APP_BASE_URL}/moderation/message/unflage`;
        return axios.post(url, { messageID }); 
    }

}