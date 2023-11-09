export interface MetroStop {
    stopId: number;
    stopDesc: string;
    departures: MetroStopDeparture[];
}

export interface MetroStopDeparture {
    routeId: string;
    arrivalTime: string;
    description: string;
}

export interface MetroStopRequest {

}

export interface MetroStopResponse {
    alerts: any[];
    stops: MetroStopResponseDetails[];
    departures: MetroStopResponseDeparture[];
}

export interface MetroStopResponseDetails {
    stop_id: string;
    description: string;
}

export interface MetroStopResponseDeparture {
    departure_text: string;
    route_id: string;
    description: string;
}

export interface MetroStopDictionary {
    [key: number]: MetroStop;
}