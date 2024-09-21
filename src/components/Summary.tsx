import { IconCalendarEvent, IconPigMoney, IconCoins, IconBusinessplan, IconWallet } from '@tabler/icons-react'

import { formatMoney } from '../utils/money'
import { PropsSummary } from '../interfaces/props'

const Summary = (props: PropsSummary) => {
    return (
        <div className="top-0 left-0 w-full py-4">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                <div
                    className="group w-full rounded-lg bg-purple-500 p-4 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#2196f3]"
                >
                    <p className="text-white text-2xl font-bold">
                        { props.name }
                    </p>
                    <div className="flex items-center space-x-2">
                        <IconCalendarEvent className="text-white" />
                        <p className="text-white text-sm">{ props.subName }</p>
                    </div>
                </div>
                <div
                    className="group w-full rounded-lg bg-slate-900 p-4 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_rgb(244,67,54)]"
                >
                    <p className="text-white text-2xl font-bold">
                        { formatMoney(props.amount) }
                    </p>
                    <div className="flex items-center space-x-2">
                        <IconPigMoney className="text-white" />
                        <p className="text-white text-sm">Saldo anterior</p>
                    </div>
                </div>
                <div
                    className="group w-full rounded-lg bg-purple-500 p-4 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#2196f3]"
                >
                    <p className="text-white text-2xl font-bold">
                        { formatMoney(props.totalIncomes) }
                    </p>
                    <div className="flex items-center space-x-2">
                        <IconCoins className="text-white" />
                        <p className="text-white text-sm">Total ingresos</p>
                    </div>
                </div>
                <div
                    className="group w-full rounded-lg bg-slate-900 p-4 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_rgb(244,67,54)]"
                >
                    <p className="text-white text-2xl font-bold">
                        { formatMoney(props.totalExpenses) }
                    </p>
                    <div className="flex items-center space-x-2">
                        <IconBusinessplan className="text-white" />
                        <p className="text-white text-sm">Total gastos</p>
                    </div>
                </div>
                <div
                    className="group w-full rounded-lg bg-purple-500 p-4 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#2196f3]"
                >
                    <p className="text-white text-2xl font-bold">
                        { formatMoney(props.amount + props.totalIncomes - props.totalExpenses) }
                    </p>
                    <div className="flex items-center space-x-2">
                        <IconWallet className="text-white" />
                        <p className="text-white text-sm">Saldo restante</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Summary