import { useEffect, useRef, useState } from 'react'

import { IconTableFilled } from '@tabler/icons-react'
import { groupBy } from 'lodash'

import { PropsPieChart } from '../interfaces/props'
import { ECharts, EChartsOption, init } from 'echarts'
import { Movement } from '../interfaces/movement'
import { allCategories, allStates, allTypes } from '../utils/movement'
import { formatMoney } from '../utils/money'
import { Category } from '../interfaces/category'

const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

const isMobile = window.innerWidth < 768

const PieChart = (props: PropsPieChart) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
    const [ myChart, setMyChart ] = useState<ECharts | null>(null)
    const [ allMovements, setAllMovements ] = useState<any[]>([])
    const [ filterSelected, setFilterSelected ] = useState<string>('Categoría')
    const [ filterTypes ] = useState<string[]>([
        'Categoría',
        'Tipo',
        'Estado'
    ])
    const [ totalAmount, setTotalAmount ] = useState(0)

    const groupByAndSumAmount = () => {
        let allTypeCustom: Category[] = [];

        if (filterSelected === 'Categoría') {
            allTypeCustom = allCategories
        } else if (filterSelected === 'Tipo') {
            allTypeCustom = allTypes
        } else if (filterSelected === 'Estado') {
            allTypeCustom = allStates
        }

        allTypeCustom = allTypeCustom.filter(({ type }) => type === props.type)

        const movements: { [key: string]: Movement[] } = groupBy(props.values, ({ category, type, state }: Movement) => filterSelected === 'Categoría' ? category : filterSelected === 'Tipo' ? type : state)

        const data = Object.entries(movements).map(([ typeKey, movements ]) => {
            return {
                value: movements.reduce((total, { amount }) => total + Number(amount?.replace(/\$|\./g, '')), 0),
                name: allTypeCustom.find(({ id }) => id === Number(typeKey))?.name ?? 'Sin clasificar'
            }
        })

        setAllMovements(data)
    }

    const calculateTotalAmount = (excludeCategories: string[] = []) => {
        const movements = allMovements.filter(({ name }) => !excludeCategories.includes(name))

        setTotalAmount(movements.reduce((total, { value }) => total + value, 0))
    }

    useEffect(() => {
        const chartDom = chartRef.current!
        const chartInstance = init(chartDom)

        setMyChart(chartInstance)

        groupByAndSumAmount()

        return () => {
            chartInstance.dispose()
        }
    }, [ filterSelected ])

    useEffect(() => {
        if (myChart) {
            const option: EChartsOption = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    left: 'right',
                    top: isMobile ? allMovements.length < 10 ? 'center' : '27%' : allMovements.length < 10 ? 'center' : '16%',
                    orient: 'vertical',
                    textStyle: {
                        color: darkMode ? '#FFFFFF' : '#000000'
                    }
                },
                series: [
                    {
                        name: ( props.type === 'incomes' ? 'Ingresos' : 'Gastos' ),
                        type: 'pie',
                        radius: [ '40%', isMobile ? '60%' :'70%' ],
                        center: [ isMobile ? '30%' : '50%', isMobile ? '60%' : '55%' ], // Esto mueve el gráfico a la izquierda 
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 15,
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 20
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: allMovements
                    }
                ],
                darkMode: darkMode, // Activa o desactiva el modo oscuro
            }

            // Calcula el total del gráfico
            calculateTotalAmount()

            // Establece las opciones del gráfico
            myChart.setOption(option)

            // Agrega el listener para el evento legendselectchanged
            const handleLegendSelectChanged = (params: any) => {
                // Aquí puedes ejecutar tu lógica callback
                const excludeCategories: string[] = [];
                for (const key in params.selected) {
                    if (params.selected[key] === false) {
                        excludeCategories.push(key);
                    }
                }
                calculateTotalAmount(excludeCategories)
            }

            myChart.on('legendselectchanged', handleLegendSelectChanged)

            // Limpia el listener cuando el componente se desmonte o myChart cambie
            return () => {
                myChart.off('legendselectchanged', handleLegendSelectChanged)
            }
        }
    }, [ myChart, isMobile ])

    return (
        <div className="relative flex border border-gray-400 dark:border-gray-700 overflow-x-auto shadow-md rounded-lg mt-4">
            <div className="sm:flex justify-between items-center absolute w-full z-10 p-4">
                <button className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-1.5" onClick={ () => props.setChangeChart(!props.isChart) }>
                    <IconTableFilled />
                </button>
                <span className="ms-6">
                    <b className="text-purple-500 me-2">Total:</b> { formatMoney(totalAmount) }
                </span>
                <div className="flex justify-end mt-3 sm:mt-0 gap-2">
                    <b className="text-purple-500 me-2">Filtrar por:</b>
                    { filterTypes.map((type, index) => (
                        <button
                            key={ `custom-filter-${index}` }
                            className={`${type === filterSelected ? 'bg-purple-500 text-white' : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600'} text-black dark:text-white text-sm rounded-lg px-2`}
                            onClick={ () => setFilterSelected(type) }
                            disabled={ type === filterSelected }
                        >
                            { type }
                        </button>
                    ))}
                </div>
            </div>
            <div ref={ chartRef } style={ { height: (isMobile && allMovements.length > 10 ? 500 : 400), width: '100%', padding: '0 16px' } } />
        </div>
    )
}

export default PieChart