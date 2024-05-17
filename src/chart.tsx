import Chart from "chart.js/auto";
import { createRef } from "preact";
import { useEffect } from "preact/hooks";

interface MetricChartProps {
    title: string;
    values: number[][];
    timestamps: string[];
    max?: number;
    valueLabels?: string[];
    lineColors?: string[];
    fillColors?: string[];
}

export function MetricChart({ title, values, timestamps, max, valueLabels, lineColors, fillColors }: MetricChartProps) {
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
                    labels: timestamps.map(timestamp => {
                        const date = new Date(timestamp);
                        const hour = ("0" + date.getHours()).slice(-2);
                        const minute = ("0" + date.getMinutes()).slice(-2);
                        return `${hour}:${minute}`;
                    }),
                    datasets: values.map((value, index) => {
                        return {
                            label: valueLabels[index],
                            data: value,
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
    }, []);

    return (
        <div class="lg:w-96 border overflow-hidden border-white rounded-lg whiteshadow">
            <h3 class="text-lg py-1 text-center border-b border-white bg-transparent font-bold">{title}</h3>
            <canvas ref={ref}></canvas>
        </div>
    );
}
