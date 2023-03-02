import Swal from "sweetalert2"

export const swalwithWarningIcon = (props: { message: string ,title:string}) => {
    const { message,title } = props
    return Swal.fire({
        icon: 'warning',
        title: title,
        text: message,
        showConfirmButton: false,
        timer: 1500
    })
}

export const swalWithErrorIcon = (props: { message: string }) => {
    const { message } = props
    return Swal.fire({
        icon: 'error',
        title: 'Warning',
        text: message,
        showConfirmButton: false,
        timer: 1500
    })
}