import {create} from 'zustand';

const useConversation = create((set) => ({
    selectedCOnversation: null,
    setSelectedConversation: (conversation) => set({selectedConversation: conversation}),
    message: [],
    setMessages: (messages) => set({messages}),

}));

export default useConversation;