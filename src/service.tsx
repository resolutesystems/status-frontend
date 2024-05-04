interface ServiceProps {
    status: ServiceStatus;
}

export function Service({ status }: ServiceProps) {
    return (
        <div class="flex items-center justify-between bg-black p-6 mt-2 first:mt-0">
            <div>
                <h3 class="text-3xl font-bold">{status.label}</h3>
                <div class="flex items-center gap-2 mt-2">
                    <div class={`${status.online ? "online-circle" : "offline-circle"} rounded-full w-7 h-7`}></div>
                    <p class="text-lg">{status.online ? "online" : "offline"}</p>
                </div>
            </div>
            <p class="text-lg">{status.incident ?? "no incident reported."}</p>
        </div>
    );
}