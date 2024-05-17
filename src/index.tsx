import { render } from "preact";

import "./style.scss";
import { MetricChart } from "./chart";
import { useEffect, useState } from "preact/hooks";
import { Service } from "./service";
import { API_URL } from "./consts";

export function App() {
    const [datapoints, setDatapoints] = useState(undefined as DataPoints[]);
    const [services, setServices] = useState([] as ServiceStatus[])

    useEffect(() => {
        // fetch datapoints
        fetch(`${API_URL}/datapoints`)
        .then(res => res.json())
        .then(res => setDatapoints(res));

        // fetch services
        fetch(`${API_URL}/services`)
        .then(res => res.json())
        .then(res => setServices(res));
    }, []);

    return (
        <div class="res flex flex-col justify-center items-center min-h-screen">
            <div class="res">
                <h1 class="text-center text-6xl font-bold"><a class="text-[#E0CCFF]" href="https://cipherfiles.com/">Cipher Files</a> System Monitor</h1>
                <div class="flex flex-col lg:flex-row gap-4 mt-10">
                    {datapoints !== undefined && <MetricChart title="CPU" values={[datapoints.map(dp => dp.cpu)]} timestamps={datapoints.map(dp => dp.created_at)} max={100} valueLabels={["Usage (%)"]} lineColors={["#b16286"]} fillColors={["#d3869b64"]}/>}
                    {datapoints !== undefined && <MetricChart title="Memory" values={[datapoints.map(dp => dp.memory)]} timestamps={datapoints.map(dp => dp.created_at)} valueLabels={["Usage (%)"]} max={100} lineColors={["#d79921"]} fillColors={["#fabd2f64"]}/>}
                    {datapoints !== undefined && <MetricChart title="Network" values={[datapoints.map(dp => dp.received), datapoints.map(dp => dp.transmitted)]} timestamps={datapoints.map(dp => dp.created_at)} valueLabels={["Received (mbit/s)", "Transmitted (mbit/s)"]} lineColors={["#458588", "#98971a"]} fillColors={["#83a59864", "#b8bb2664"]}/>}
                </div>
                <div class="mt-5">
                    {services.map(service => <Service status={service}/>)}
                </div>
            </div>
            <p class="text-center mt-5 text-neutral-600">Want to make your own website monitor thing that looks like this?<br/><a class="text-neutral-500 underline" href="https://github.com/resolutesystems/status-frontend">We’ve open sourced this one!</a></p>
        </div>
    );
}

render(<App/>, document.getElementById("app"));
