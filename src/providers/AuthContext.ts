import { createContext} from 'react'

// Define el tipo para el contexto
export interface AuthContextType {
    token: string | null
    idUser: string | null
    login: (token: string, idUser: string) => void
    logout: () => void
}

// Crea el contexto con un valor predeterminado
const defaultAuthContext: AuthContextType = {
    token: null,
    idUser: null,
    login: () => {},
    logout: () => {}
}

// Crea el contexto con un valor predeterminado
export const AuthContext = createContext<AuthContextType>(defaultAuthContext)