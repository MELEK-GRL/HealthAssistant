
import { create } from 'zustand';
import { Message } from '../screen/chat';

interface ChatStore {
    messages: Message[];
    currentConversationId: string | null;
    setMessages: (messages: Message[]) => void;
    setCurrentConversationId: (id: string | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
    messages: [],
    currentConversationId: null,
    setMessages: (messages) => set({ messages }),
    setCurrentConversationId: (id) => set({ currentConversationId: id }),
}));
