import { ReactNode, useState } from "react"

import { AuthContext } from "./AuthContext"

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [ token, setToken ] = useState<string | null>(null)
    const [ id_user, setIdUser ] = useState<string | null>(null)

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
        <AuthContext.Provider value={{ token, id_user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}