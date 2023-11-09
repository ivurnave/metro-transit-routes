import { MetroStop, MetroStopDeparture, MetroStopResponse } from "@/models/metro-stop";

export default class MetroTransitApiService {

    private apiUrl: string = "https://svc.metrotransit.org/nextripv2/";

    constructor() {}

    async getTimeForId(id: number): Promise<MetroStop> {
        const responsePromise = await fetch(this.apiUrl + id, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        });
        const responseJson = await responsePromise.json();
        const response: MetroStopResponse = responseJson;
        

        return getStopFromResponse(id, response);
    }
}

function getStopFromResponse(id: number, response: MetroStopResponse): MetroStop {
    const departures = response.departures.map((departure): MetroStopDeparture => {
        return {
            routeId: departure.route_id,
            arrivalTime: departure.departure_text,
            description: departure.description
        }
    });

    return {
        stopId: id,
        stopDesc: response.stops[0].description,
        departures: departures
    };
}