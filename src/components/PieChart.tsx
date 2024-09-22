import { useEffect, useRef } from 'react';

import * as echarts from 'echarts';

const PieChart = () => {
    const chartRef = useRef<HTMLDivElement | null>(null); // Referencia al contenedor del gráfico

    useEffect(() => {
        // Inicializa el gráfico solo cuando el componente se monta
        const chartDom = chartRef.current!;
        const myChart = echarts.init(chartDom);

        // Define la opción del gráfico
        const option: echarts.EChartsOption = {
            tooltip: {
                trigger: 'item',
            },
            legend: {
                top: '5%',
                left: 'center',
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                    },
                    label: {
                        show: false,
                        position: 'center',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold',
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' },
                    ],
                },
            ],
        };

        // Establece las opciones del gráfico
        myChart.setOption(option);

        // Limpia el gráfico al desmontar el componente
        return () => {
            myChart.dispose();
        };
    }, []);

    return (
        // El contenedor para el gráfico
        <div ref={chartRef} style={{ height: 400, width: '100%' }} />
    );
};

export default PieChart;