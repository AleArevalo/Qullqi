import { useEffect, useRef, useState } from 'react'

import { IconTableFilled } from '@tabler/icons-react'

import { PropsPieChart } from '../interfaces/props'
import { ECharts, EChartsOption, init } from 'echarts'
import { Movement } from '../interfaces/movement'
import { allCategories } from '../utils/movement'
import { formatMoney } from '../utils/money'

const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

const isMobile = window.innerWidth < 768

const PieChart = (props: PropsPieChart) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
    const [ myChart, setMyChart ] = useState<ECharts | null>(null)
    const [ allMovements, setAllMovements ] = useState<any[]>([])
    const [ totalAmount, setTotalAmount ] = useState(0)

    const groupByAndSumAmount = () => {
        const movements: { [key: string]: Movement[] } = Object.groupBy(props.values, ({ category }: Movement) => category)

        const data = Object.entries(movements).map(([ category, movements ]) => {
            return {
                value: movements.reduce((total, { amount }) => total + Number(amount?.replace(/\$|\./g, '')), 0),
                name: allCategories.find(({ id, type }) => id === Number(category) && type === props.type)?.name
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
    }, [])

    useEffect(() => {
        if (myChart) {
            const option: EChartsOption = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    left: 'right',
                    top: 'center',
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
                        center: [ isMobile ? '30%' : '50%', '50%' ], // Esto mueve el gráfico a la izquierda 
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
                console.log('Legend item clicked:', params.selected)
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
        <div className="relative flex overflow-x-auto shadow-md sm:rounded-lg mt-4">
            <div className="absolute z-10 p-4">
                <button className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-1.5" onClick={ () => props.setChangeChart(!props.isChart) }>
                    <IconTableFilled />
                </button>
                <span className="ms-6">
                    <b className="text-purple-600 me-2">Total:</b> { formatMoney(totalAmount) }
                </span>
            </div>
            <div ref={ chartRef } style={ { height: 400, width: '100%' } } />
        </div>
    )
}

export default PieChart