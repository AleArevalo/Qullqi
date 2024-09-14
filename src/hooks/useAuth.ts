import { useContext } from "react"

import { AuthContext } from "../providers/AuthContext"

// Hook para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context
}