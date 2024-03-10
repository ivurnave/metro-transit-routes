'use client'

import { MetroRoute } from "@/models/metro-route";
import { MetroStop } from "@/models/metro-stop";
import MetroTransitApiService from "@/services/metro-transit-api-service";
import React, { useState, useContext, useEffect, useCallback } from "react";

export const MetroRoutesContext = React.createContext<MetroRoutesState>({
    routes: [],
    stops: [],
    setRoute: (route: string) => { },
    getRoutes: () => { return new Promise<MetroRoute[]>(() => { }) },
    getStops: (id: string, direction: number) => { return new Promise<MetroStop[]>(() => { }) },
});

/** The value we provide via context (i.e. the value and a setter of state) */
export interface MetroRoutesState {
    routes: MetroRoute[];
    stops: MetroStop[];
    setRoute: (route: string) => void;
    getRoutes: () => Promise<MetroRoute[]>;
    getStops: (routeId: string, direction: number) => Promise<MetroStop[]>;
}

export interface MetroRoutesContextProps { children?: React.ReactNode }
export function MetroRoutesConfigProvider(props: MetroRoutesContextProps) {
    const metroTransitService = new MetroTransitApiService();

    const [routes, setRoutes] = useState<MetroRoute[]>([])
    const [stops, setStops] = useState<MetroStop[]>([])
    const [currentRoute, setCurrentRoute] = useState<MetroRoute>();

    /** Update globally loaded routes, return them */
    const getRoutes = useCallback( async () => {
        const routes = await metroTransitService.getRoutes();
        setRoutes(routes);

        return routes;
    }, []);

    /** Update globally loaded stops, return them */
    const getStops = useCallback(async () => {
        const stops = await metroTransitService.getStops();
        setStops(stops);

        return stops;
    }, [routes]);

    const setRoute = useCallback( (route: string) => {
        if (route === '') setCurrentRoute(undefined);
        else setCurrentRoute(routes.find((r) => r.id.toString() === route));
    }, [routes]);

    // Load routes on first render
    useEffect(() => {
        getRoutes();
    }, [])

    useEffect(() => {
        if (currentRoute) {
            // metroTransitService.getStopsForRoute(currentRoute.id.toString(), 1).then((stops) => {
            //     setStops(stops);
            // })
            console.log('current route changed')
        }
    }, [currentRoute])

    return (
        <MetroRoutesContext.Provider value={{ routes, stops, setRoute, getRoutes, getStops }}>
            {props.children}
        </MetroRoutesContext.Provider>
    )
}

export function useMetroRoutes(): MetroRoutesState {
    return useContext(MetroRoutesContext);
}