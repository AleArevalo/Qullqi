import { IconCloud, IconCloudX } from "@tabler/icons-react"

import { useAuth } from "../hooks/useAuth"

const Header = () => {
    const { token, login, logout } = useAuth()

    const handleLogin = () => {
        // TODO: handle click cloud and set token
        login('')
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <div className="grid grid-cols-3">
            <h1 className="col-start-2 text-3xl font-bold text-center text-slate-900 dark:text-white my-6">
                Qullqi
            </h1>
            <div className="col-start-3 content-center px-4">
                <div className="flex gap-4 justify-end">
                    { token ?
                        <button className="text-black dark:text-white" onClick={ handleLogout }>
                            <IconCloudX />
                        </button>
                        :
                        <button className="text-black dark:text-white" onClick={ handleLogin }>
                            <IconCloud />
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header