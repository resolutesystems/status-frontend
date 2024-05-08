interface DataPoints {
    id: number;
    cpu: number;
    memory: number;
    transmitted: number;
    received: number;
    created_at: string;
}

interface ServiceStatus {
    label: string;
    online: boolean;
    incident?: string;    
}
