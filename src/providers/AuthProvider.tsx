import { ReactNode, useState } from "react"

import { AuthContext } from "./AuthContext"

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [ token, setToken ] = useState<string | null>(() => {
        return localStorage.getItem("token") || null
    })

    const login = (useToken: string) => {
        localStorage.setItem("token", useToken)
        setToken(useToken)
    }

    const logout = () => {
        localStorage.removeItem("budgetMovements")
        localStorage.removeItem("token")
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}