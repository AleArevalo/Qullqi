import { ReactNode, useState } from "react"

import { AuthContext } from "./AuthContext"

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [ token, setToken ] = useState<string | null>(null)
    const [ idUser, setIdUser ] = useState<string | null>(null)

    const login = (useToken: string, useIdUser: string) => {
        setToken(useToken)
        setIdUser(useIdUser)
    }

    const logout = () => {
        localStorage.removeItem("budgetMovements")
        setToken(null)
        setIdUser(null)
    }

    return (
        <AuthContext.Provider value={{ token, idUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}