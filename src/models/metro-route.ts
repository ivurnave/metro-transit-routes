export interface MetroRoute {
    id: number;
    label: string;
}

export interface MetroRouteRequest {

}

export interface MetroRouteResponse {
    route_id: number;
    agency_id: number;
    route_label: string;
}