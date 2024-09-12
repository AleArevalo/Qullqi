import Swal from "sweetalert2"

export const ToastSwal = (icon: 'success' | 'warning' | 'error' | 'info', title: string) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        customClass: {
            popup: 'rounded-3xl'
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    });

    (async () => {
        await Toast.fire({
            icon,
            title
        })
    })()
}