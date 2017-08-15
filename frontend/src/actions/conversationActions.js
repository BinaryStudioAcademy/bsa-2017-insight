export const getAllConversations = () => ({ type: 'GET_ALL_CONVERSATIONS' });

export const setConversation = (id) => {
    return {
        type: "SET_CONVERSATION",
        payload:{
            id
        }
    }
}
