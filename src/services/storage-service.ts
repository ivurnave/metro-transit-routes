import { MetroRoute } from "@/models/metro-route";
import { MetroStop } from "@/models/metro-stop";

export default class StorageService {

    constructor() {}

    public setStopsInStorage(stops: MetroStop[]) {
        let data = JSON.stringify(stops);
        localStorage.setItem('stops', data);
    }
    
    public getStopsFromStorage(): MetroStop[] | null {
        const data = localStorage.getItem('stops');
        if (data) {
            return JSON.parse(data);
        } else {
            return null;
        }
    }
    
    public setRouteInStorage(route: MetroRoute) {
        let data = JSON.stringify(route);
        localStorage.setItem('route', data);
    }
    
    public getRouteFromStorage(): MetroRoute | null {
        const data = localStorage.getItem('route');
        if (data) {
            return JSON.parse(data);
        } else {
            return null
        }
    }
}