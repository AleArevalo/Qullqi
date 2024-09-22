import { useEffect, useRef, useState } from 'react'

import { IconTableFilled } from '@tabler/icons-react'

import { PropsPieChart } from '../interfaces/props'
import { ECharts, EChartsOption, init } from 'echarts'
import { Movement } from '../interfaces/movement'
import { allCategories } from '../utils/movement'

const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

const PieChart = (props: PropsPieChart) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
    const [ myChart, setMyChart ] = useState<ECharts | null>(null)

    const groupByAndSumAmount = () => {
        const movements: { [key: string]: Movement[] } = Object.groupBy(props.values, ({ category }: Movement) => category)

        return Object.entries(movements).map(([ category, movements ]) => {
            return {
                value: movements.reduce((total, { amount }) => total + Number(amount?.replace(/\$|\./g, '')), 0),
                name: allCategories.find(({ id, type }) => id === Number(category) && type === props.type)?.name
            }
        })
    }

    useEffect(() => {
        const chartDom = chartRef.current!
        const chartInstance = init(chartDom)

        setMyChart(chartInstance)

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
                        name: (props.type === 'incomes' ? 'Ingresos' : 'Gastos'),
                        type: 'pie',
                        radius: ['40%', '70%'],
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
                            },
                        },
                        labelLine: {
                            show: false
                        },
                        data: groupByAndSumAmount()
                    }
                ],
                darkMode: darkMode, // Activa o desactiva el modo oscuro
            }

            // Establece las opciones del gráfico
            myChart.setOption(option)
        }
    }, [ myChart ])

    return (
        <div className="relative flex overflow-x-auto shadow-md sm:rounded-lg mt-4">
            <div className="absolute z-10 p-4">
                <button className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-1.5" onClick={ () => props.setChangeChart(!props.isChart) }>
                    <IconTableFilled />
                </button>
            </div>
            <div ref={ chartRef } style={ { height: 400, width: '100%' } } />
        </div>
    )
}

export default PieChart