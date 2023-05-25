import { ToastTopEnd } from "./toast";

export const showErrorToast = async (message) => {
    let text = 'Parece que algo salió mal';
    if (typeof message === 'object') {
        text = '';
        for (const value of Object.values(message)) {
            text += `${value}<br>`;
        }
    } else if (typeof message === 'string') {
        text = message;
    }
    await ToastTopEnd.fire({
        icon: 'error',
        title: text
    });
}