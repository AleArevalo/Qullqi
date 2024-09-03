const Summary = () => {
    return (
        <div className="top-0 left-0 w-full shadow-md py-4">
            <div className="grid grid-cols-5 gap-4 max-[500px]:grid-cols-1">
                <div
                    className="group w-full rounded-lg bg-purple-500 p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#2196f3]"
                >
                    <p className="text-white text-2xl">Septiembre</p>
                    <p className="text-white text-sm">Nombre</p>
                </div>
                <div
                    className="group w-full rounded-lg bg-slate-900 p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_rgb(244,67,54)]"
                >
                    <p className="text-white text-2xl">$ 100</p>
                    <p className="text-white text-sm">Saldo anterior</p>
                </div>
                <div
                    className="group w-full rounded-lg bg-purple-500 p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_rgb(244,67,54)]"
                >
                    <p className="text-white text-2xl">$ 1000</p>
                    <p className="text-white text-sm">Total ingresos</p>
                </div>
                <div
                    className="group w-full rounded-lg bg-slate-900 p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_rgb(244,67,54)]"
                >
                    <p className="text-white text-2xl">$ 900</p>
                    <p className="text-white text-sm">Total gastos</p>
                </div>
                <div
                    className="group w-full rounded-lg bg-purple-500 p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_rgb(244,67,54)]"
                >
                    <p className="text-white text-2xl">$ 200</p>
                    <p className="text-white text-sm">Saldo restante</p>
                </div>
            </div>
        </div>
    )
}

export default Summary