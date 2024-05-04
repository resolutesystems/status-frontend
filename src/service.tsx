interface ServiceProps {
    status: ServiceStatus;
}

export function Service({ status }: ServiceProps) {
    return (
        <div class="flex items-center justify-between bg-transparent mt-4 border border-white rounded-lg p-6 mt-2 whiteshadow first:mt-0">
            <div>
                <h3 class="text-3xl font-bold">{status.label}</h3>
                <div class="flex items-center gap-2 mt-2">
                    <div class={`${status.online ? "online-circle" : "offline-circle"} rounded-full w-2 h-2`}></div>
                    <p class="text-lg">{status.online ? "online" : "offline"}</p>
                </div>
            </div>
            <p class="text-lg">{status.incident ?? "no incident reported."}</p>
        </div>
    );
}