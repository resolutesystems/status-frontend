import Chart from "chart.js/auto";
import { createRef } from "preact";
import { useEffect } from "preact/hooks";

interface MetricChartProps {
    title: string;
    datapoints: DataPoints;
    max?: number;
    lineColors?: string[];
    fillColors?: string[];
}

export function MetricChart({ title, datapoints, max, lineColors, fillColors }: MetricChartProps) {
    const ref = createRef();

    if (lineColors === undefined) {
        lineColors = [];
    }
    if (fillColors === undefined) {
        fillColors = [];
    }

    useEffect(() => {
        if (ref.current !== undefined) {
            new Chart(ref.current, {
                type: "line",
                options: {
                    scales: {
                        y: {
                            max,
                        },
                    },
                },
                data: {
                    labels: datapoints.timestamps.map(timestamp => {
                        const date = new Date(timestamp);
                        const hour = ("0" + date.getHours()).slice(-2);
                        const minute = ("0" + date.getMinutes()).slice(-2);
                        return `${hour}:${minute}`;
                    }),
                    datasets: datapoints.datasets.map((datas, index) => {
                        return {
                            label: datas.label,
                            data: datas.data,
                            borderColor: lineColors[index],
                            backgroundColor: fillColors[index],
                            fill: true,
                            tension: 0.3,
                        }
                    }),
                }
            });
        } else {
            console.log("canvas is undefined!");
        }
    }, [datapoints]);

    return (
        <div class="w-96 border overflow-hidden border-white rounded-lg whiteshadow">
            <h3 class="text-lg py-1 text-center border-b border-white bg-transparent font-bold">{title}</h3>
            <canvas ref={ref}></canvas>
        </div>
    );
}
