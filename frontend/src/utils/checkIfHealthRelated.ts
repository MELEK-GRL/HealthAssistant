import { API_BASE_URL } from '@env';

export const checkIfHealthRelated = async (
    messageText: string
): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/check`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: messageText }),
        });
        if (!response.ok) {
            return false;
        }
        const result = await response.json();

        return result.isHealthRelated === true;
    } catch (error) {
        return false;
    }
};
