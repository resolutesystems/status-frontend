import { render } from "preact";

import "./style.css";
import { MetricChart } from "./chart";
import { useEffect, useState } from "preact/hooks";
import { Service } from "./service";

export function App() {
    const [datapoints, setDatapoints] = useState(undefined as AllDataPoints);
    const [services, setServices] = useState([] as ServiceStatus[])

    useEffect(() => {
        // fetch datapoints
        fetch("http://127.0.0.1:3000/datapoints")
        .then(res => res.json())
        .then(res => setDatapoints(res));

        // fetch services
        fetch("http://127.0.1:3000/services")
        .then(res => res.json())
        .then(res => setServices(res));
    }, []);

    return (
        <div class="my-4">
            <h1 class="text-center text-6xl font-bold">Status Page</h1>
            <div class="flex gap-4 mt-10">
                {datapoints !== undefined && <MetricChart title="CPU" datapoints={datapoints.cpu} max={100} lineColors={["#b16286"]} fillColors={["#d3869b64"]}/>}
                {datapoints !== undefined && <MetricChart title="Memory" datapoints={datapoints.memory} max={100} lineColors={["#d79921"]} fillColors={["#fabd2f64"]}/>}
                {datapoints !== undefined && <MetricChart title="Network" datapoints={datapoints.network} lineColors={["#458588", "#98971a"]} fillColors={["#83a59864", "#b8bb2664"]}/>}
            </div>
            <div class=" mt-5">
                {services.map(service => <Service status={service}/>)}
            </div>
        </div>
    );
}

render(<App/>, document.getElementById("app"));
