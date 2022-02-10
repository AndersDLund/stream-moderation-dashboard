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
    banUser: (userIds) => {
        // userID is an array
        const url = `${process.env.REACT_APP_BASE_URL}/moderation/user/ban`;
        return axios.post(url, { userIds });
    },

    banUser24: (userIds) => {
        // userID is an array
        const url = `${process.env.REACT_APP_BASE_URL}/moderation/user/ban24`;
        return axios.post(url, { userIds });
    },

    deleteUser: (userIds) => {
        // userID is an array
        const url = `${process.env.REACT_APP_BASE_URL}/moderation/user/delete`;
        return axios.post(url, { userIds });
    },

    deleteUserAndMessages: (userIds) => {
        // userID is an array
        const url = `${process.env.REACT_APP_BASE_URL}/moderation/user/deleteUserAndMessages`;
        return axios.post(url, { userIds });
    },

    deleteMessage: (messages) => {
        // messages is an array of message IDs
        const url = `${process.env.REACT_APP_BASE_URL}/moderation/message/delete`;
        return axios.post(url, { messages });
    },

    unflagMessage: (messages) => {
        // messageIds is an array of message IDs
        const url = `${process.env.REACT_APP_BASE_URL}/moderation/message/unflag`;
        return axios.post(url, { messages });
    }

}