import { createContext} from 'react'

// Define el tipo para el contexto
export interface AuthContextType {
    token: string | null
    id_user: string | null
    login: (token: string, id_user: string) => void
    logout: () => void
}

// Crea el contexto con un valor predeterminado
const defaultAuthContext: AuthContextType = {
    token: null,
    id_user: null,
    login: () => {},
    logout: () => {}
}

// Crea el contexto con un valor predeterminado
export const AuthContext = createContext<AuthContextType>(defaultAuthContext)