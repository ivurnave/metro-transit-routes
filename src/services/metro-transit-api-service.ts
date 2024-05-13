import { MetroStop, MetroStopDeparture, MetroStopResponse, MetroStopSummary } from "@/models/metro-stop";
import HttpService from "./http-service";
import { MetroRoute, MetroRouteResponse } from "@/models/metro-route";

export default class MetroTransitApiService {

    private apiUrl: string = "https://svc.metrotransit.org/nextripv2/";

    constructor() {}

    async getRoutes(): Promise<MetroRoute[]> {
        const response = await HttpService.get<MetroRouteResponse[]>(this.apiUrl + 'routes');

        return response.map( routeRaw => this.getRouteFromResponse(routeRaw));
    }

    // To load stops for route, a route id and direction are required
    async getStopsForRoute(routeId: string, direction = '0'): Promise<MetroStopSummary[]> {
        const response = await HttpService.get<MetroStopSummary[]>(this.apiUrl + `stops/${routeId}/${direction}`);
        return response;
    }

    async getTimeForId(id: number | string): Promise<MetroStop> {
        const response = await HttpService.get<MetroStopResponse>(this.apiUrl + id);
        
        return this.getStopFromResponse(id, response);
    }

    async getTimeForIdWithRoute(stopId: string, routeId: string, direction: string): Promise<MetroStop> {
        const response = await HttpService.get<MetroStopResponse>(this.apiUrl + `${routeId}/${direction}/${stopId}`);

        return this.getStopFromResponse(stopId, response);
    }

    private getRouteFromResponse(response: MetroRouteResponse): MetroRoute {
        return {
            id: response.route_id,
            label: response.route_label
        };
    }

    private getStopFromResponse(id: number | string, response: MetroStopResponse): MetroStop {
        const departures = response.departures.map((departure): MetroStopDeparture => {
            return {
                routeId: departure.route_id,
                arrivalTime: departure.departure_text,
                description: departure.description
            };
        });
    
        return {
            stopId: id,
            stopDesc: response.stops[0].description,
            departures: departures
        };
    }
}
