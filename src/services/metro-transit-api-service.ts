import { MetroStop, MetroStopDeparture, MetroStopResponse } from "@/models/metro-stop";
import HttpService from "./http-service";
import { MetroRoute, MetroRouteResponse } from "@/models/metro-route";

export default class MetroTransitApiService {

    private apiUrl: string = "https://svc.metrotransit.org/nextripv2/";

    constructor() {}

    async getRoutes(): Promise<MetroRoute[]> {
        const response = await HttpService.get<MetroRouteResponse[]>(this.apiUrl + 'routes');

        return response.map( routeRaw => this.getRouteFromResponse(routeRaw));
    }

    async getTimeForId(id: number): Promise<MetroStop> {
        const response = await HttpService.get<MetroStopResponse>(this.apiUrl + id);
        
        return this.getStopFromResponse(id, response);
    }

    private getRouteFromResponse(response: MetroRouteResponse): MetroRoute {
        return {
            id: response.route_id,
            label: response.route_label
        };
    }

    private getStopFromResponse(id: number, response: MetroStopResponse): MetroStop {
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
