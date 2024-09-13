import { IconCloud, IconCloudX } from "@tabler/icons-react"

const Header = () => {
    const handleLogin = () => {
        // TODO: handle click cloud
    }

    const handleLogout = () => {
        // TODO: handle click cloud x
    }

    return (
        <div className="grid grid-cols-3">
            <h1 className="col-start-2 text-3xl font-bold text-center text-slate-900 dark:text-white my-6">
                Qullqi
            </h1>
            <div className="col-start-3 content-center px-4">
                <div className="flex gap-4 justify-end">
                    <button className="text-black dark:text-white" onClick={ handleLogin }>
                        <IconCloud />
                    </button>
                    <button className="text-black dark:text-white" onClick={ handleLogout }>
                        <IconCloudX />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header