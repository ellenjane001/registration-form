import { ThemeType } from "@/types";
import { signOut } from 'next-auth/react';
import Swal from "sweetalert2";


export const swalwithWarningIcon = (props: { message: string, title: string, theme: boolean }) => {

    const { message, title, theme } = props
    return Swal.fire({
        icon: 'warning',
        title: title,
        text: message,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
            popup: theme ? 'dark-theme' : ''
        }
    })
}

export const swalWithErrorIcon = (props: { message: string, theme: boolean }) => {
    const { message, theme } = props
    return Swal.fire({
        icon: 'error',
        title: 'Warning',
        text: message,
        showConfirmButton: false,
        confirmButtonColor: theme ? '#90caf9' : '#1565c0',
        timer: 1500,
        customClass: {
            popup: theme ? 'dark-theme' : '',
            confirmButton: theme ? 'dark-font' : ''
        }
    })
}

export const swalLogout = ({ theme }: ThemeType) => {

    return (
        Swal.fire({
            title: 'Logout',
            text: 'Do you want to logout?',
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true,
            allowOutsideClick: false,
            confirmButtonColor: theme ? '#90caf9' : '#1565c0',
            cancelButtonColor: theme ? "#fff" : '#6e7881',
            customClass: {
                popup: theme ? 'dark-theme' : '',
                confirmButton: theme ? 'dark-font' : '',
                cancelButton: theme ? 'dark-font' : ''
            }
        }).then(result => {
            if (result.isConfirmed) {
                signOut({
                    callbackUrl: `${window.location.origin}/login`
                })
            }
        }))
}

const swalRegistrationSuccess = ({ theme }: ThemeType) => {
    return (
        Swal.fire({
            icon: 'success',
            title: 'Congratulations',
            text: 'User has been successfully registered',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: theme ? 'dark-theme' : '',
            }
        }))
}

export {swalRegistrationSuccess}