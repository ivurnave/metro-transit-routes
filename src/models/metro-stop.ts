export interface MetroStopSummary {
    place_code: string;
    description: string;
}

export interface MetroStop {
    alerts: any[];
    stops: MetroStopResponseDetails[];
    departures: MetroStopDeparture[];
}

export interface MetroStopResponseDetails {
    stop_id: string;
    description: string;
}

export interface MetroStopDeparture {
    actual: boolean;
    trip_id: string;
    stop_id: number;
    departure_text: string;
    departure_time: number;
    description: string;
    route_id: string;
    route_short_name: string;
    direction_id: number;
    direction_text: string;
    terminal: string;
    schedule_relationship: string;
}
