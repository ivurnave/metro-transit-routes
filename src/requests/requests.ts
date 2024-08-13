import { MetroRoute } from '@/models/metro-route';
import { MetroStopSummary, MetroStop } from '@/models/metro-stop';

const METRO_TRANSIT_API_URL = 'https://svc.metrotransit.org/nextripv2';

export async function getRoutes(): Promise<MetroRoute[]> {
    const response = await fetch(`${METRO_TRANSIT_API_URL}/routes`);
    return response.json();
}

export async function getStopsForRouteAndDirection(
    routeId: string,
    direction = '0'
): Promise<MetroStopSummary[]> {
    const response = await fetch(
        `${METRO_TRANSIT_API_URL}/stops/${routeId}/${direction}`
    );
    return response.json();
}

export async function getStopForId(id: number | string): Promise<MetroStop> {
    const response = await fetch(`${METRO_TRANSIT_API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Bad stop id!');
    }
    return response.json();
}

export async function getStopForIdWithRouteAndDirection(
    stopId: string,
    routeId: string,
    direction: string
): Promise<MetroStop> {
    const response = await fetch(
        `${METRO_TRANSIT_API_URL}/${routeId}/${direction}/${stopId}`
    );
    return response.json();
}
