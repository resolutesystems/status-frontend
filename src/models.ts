interface DataSet {
    label: string;
    data: number[];

    // not included in api response
    lineColor?: string;
    fillColor?: string;
}

interface DataPoints {
    timestamps: string[];
    datasets: DataSet[];
}

interface AllDataPoints {
    cpu: DataPoints;
    memory: DataPoints;
    network: DataPoints;
}

interface ServiceStatus {
    label: string;
    online: boolean;
    incident?: string;    
}
