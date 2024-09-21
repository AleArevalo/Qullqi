import { useEffect } from "react"

import { IconCloud, IconLogout } from "@tabler/icons-react"
import Swal from "sweetalert2"

import { useAuth } from "../hooks/useAuth"
import { supabase } from "../libs/supabase"
import { getAllBudgets } from "../services/budget"
import { ToastSwal } from "../utils/swal-custom"

const Header = () => {
    const { token, login, logout } = useAuth()

    const handleLogin = async () => {
        Swal.fire({
            title: "Sincroniza con la nube",
            text: "Recibirás un correo electrónico con un código de verificación de 6 dígitos.",
            input: "email",
            inputLabel: "Ingresa tu correo electrónico",
            inputPlaceholder: "ejemplo@ejemplo.com",
            validationMessage: "Ingresa un correo electrónico válido",
            showCancelButton: false,
            confirmButtonText: "Enviar código",
            customClass: {
                popup: "dark:bg-gray-700 text-black dark:text-white rounded-3xl",
                title: "text-purple-500",
                input: "w-3/5 justify-self-center",
                confirmButton: "bg-purple-500 hover:bg-purple-600 text-white",
                validationMessage: "bg-transparent text-red-500 font-bold"
            },
            preConfirm: async (email: string) => {
                Swal.showLoading()

                const { data, error } = await supabase.auth.signInWithOtp({
                    email,
                    options: {
                        // set this to false if you do not want the user to be automatically signed up
                        shouldCreateUser: true
                    }
                })

                return {
                    email,
                    data,
                    error
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                if (!result.value.error) {
                    verifyCode(result.value.email)
                } else {
                    if (result.value.error.code === "over_email_send_rate_limit") {
                        Swal.fire('Demasiados intentos', 'Por favor, inténtalo de nuevo más tarde.', 'error')
                    } else {
                        Swal.fire('Error', result.value.error.message, 'error')
                    }
                }
            }
        })
    }

    const verifyCode = async (email: string) => {
        Swal.fire({
            title: "Verificación de código",
            text: "Ingresa el código que te hemos enviado.",
            input: "text",
            inputLabel: "Ingresa el código de verificación",
            inputPlaceholder: "123456",
            validationMessage: "Ingresa un código de 6 dígitos",
            showCancelButton: false,
            confirmButtonText: "Enviar",
            customClass: {
                popup: "dark:bg-gray-700 text-black dark:text-white rounded-3xl",
                title: "text-purple-500",
                input: "w-2/5 justify-self-center text-center",
                confirmButton: "bg-purple-500 hover:bg-purple-600 text-white",
                validationMessage: "bg-transparent text-red-500 font-bold"
            },
            preConfirm: async (code: string) => {
                Swal.showLoading()

                const {
                    data: { session },
                    error
                } = await supabase.auth.verifyOtp({
                    email,
                    token: code,
                    type: "email"
                })

                if (error) {
                    Swal.showValidationMessage("Código de verificación inválido")
                    return false
                }

                return session
            }
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value.user) {
                    ToastSwal('success', 'Sesión iniciada con éxito. Estamos sincronizando tus datos con la nube.')

                    login(result.value.access_token, result.value.user.id)

                    loadAllBudgets(result.value.user.id)
                }
            }
        })
    }

    const loadAllBudgets = async (userId: string) => {
        if (userId) {
            const { success, message, data } = await getAllBudgets(userId)
    
            if (!success) {
                ToastSwal('error', message)
            }

            if (data) {
                localStorage.setItem('budgetMovements', JSON.stringify(data))
                ToastSwal('success', 'Movimientos actualizados correctamente')
                location.reload()
            }
        }
    }

    const handleLogout = async () => {
        logout()
        await supabase.auth.signOut()
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                login(session.access_token, session.user.id)

                if (token) {
                    loadAllBudgets(session.user.id)
                }
            }
        })

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                login(session.access_token, session.user.id)

                if (token) {
                    loadAllBudgets(session.user.id)
                }
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <div className="grid grid-cols-3">
            <h1 className="col-start-2 text-3xl font-bold text-center text-slate-900 dark:text-white my-6">
                Qullqi
            </h1>
            <div className="col-start-3 content-center sm:px-4">
                <div className="flex sm:gap-4 sm:justify-end">
                    { token ?
                        <button className="flex text-purple-500 dark:text-purple-600" onClick={ handleLogout }>
                            <IconLogout />
                            <span className="ms-2">Cerrar sesión</span>
                        </button>
                        :
                        <button className="flex text-purple-500 hover:text-purple-600" onClick={ handleLogin }>
                            <IconCloud />
                            <span className="ms-2">Sincronizar</span>
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header