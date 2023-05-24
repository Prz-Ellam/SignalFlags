import Swal from 'sweetalert2';

export const showErrorMessage = async (message) => {
    let text = 'Parece que algo salió mal';
    if (typeof message === 'object') {
        text = '';
        for (const value of Object.values(message)) {
            text += `${value}<br>`;
        }
    } else if (typeof message === 'string') {
        text = message;
    }
    await Swal.fire({
        icon: 'error',
        title: 'No se pudo realizar la operación',
        html: `<div class="text-light">${text}</div>`,
        confirmButtonColor: '#F23F43',
        background: '#38393B',
        customClass: {
            title: 'text-light',
            text: 'text-light',
            confirmButton: 'btn btn-danger text-light shadow-none rounded-pill'
        },
    });
}
