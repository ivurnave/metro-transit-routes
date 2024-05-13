'use client'

import { MetroRoute } from "@/models/metro-route";
import { MetroStop, MetroStopDictionary, MetroStopSummary } from "@/models/metro-stop";
import metroTransitApiService from "@/services/metro-transit-api-service";
import MetroTransitApiService from "@/services/metro-transit-api-service";
import React, { useState, useContext, useEffect, useCallback, useMemo } from "react";

export const MetroRoutesContext = React.createContext<MetroRoutesState>({
    routes: [],
    // stops: [],
    stopSummaries: [],
    currentStops: {},
    currentRoute: undefined,
    setRoute: (route: string) => { },
    getRoutes: () => { return new Promise<MetroRoute[]>(() => { }) },
    getStopsForCurrentRoute: () => { return new Promise<MetroStopSummary[]>(() => { }) },
    addStop: (stop: string) => { },
});

/** The value we provide via context (i.e. the value and a setter of state) */
export interface MetroRoutesState {
    routes: MetroRoute[];
    // stops: MetroStop[];
    currentRoute?: MetroRoute;
    currentStops: MetroStopDictionary;
    stopSummaries: MetroStopSummary[];
    setRoute: (route: string) => void;
    getRoutes: () => Promise<MetroRoute[]>;
    getStopsForCurrentRoute: () => Promise<MetroStopSummary[]>;
    addStop: (stop: string) => void;
}

export interface MetroRoutesContextProps { children?: React.ReactNode }
export function MetroRoutesConfigProvider(props: MetroRoutesContextProps) {
    const metroTransitService = useMemo(() => new MetroTransitApiService(), []);

    const [routes, setRoutes] = useState<MetroRoute[]>([]);
    // const [stops, setStops] = useState<MetroStop[]>([]);
    const [currentRoute, setCurrentRoute] = useState<MetroRoute>();
    const [stopSummaries, setStopSummaries] = useState<MetroStopSummary[]>([]);
    const [currentStops, setCurrentStops] = useState<MetroStopDictionary>({});

     /** Update globally loaded routes, return them */
     const getRoutes = async () => {
        const routes = await metroTransitService.getRoutes();
        setRoutes(routes);

        return routes;
    };

    const getStopsForCurrentRoute = async () => {
        if (currentRoute) {
            return await metroTransitService.getStopsForRoute(currentRoute.id.toString(), '1');
        }
        return [];
    };

    const setRoute = (route: string) => {
        if (route === '') {
            setCurrentRoute(undefined);
            setStopSummaries([]);
        } else {
            setCurrentRoute(routes.find((r) => r.id.toString() === route));
        }
    };

    const addStop = async (stop: string) => {
        if (!currentRoute) return;
		
        const newStops: MetroStopDictionary = currentStops;
        if (newStops[stop] === undefined) {
            newStops[stop] = {
                stopId: stop,
                stopDesc: '',
                departures: []
            };
        }
        setCurrentStops({...newStops});

        // Update the state once we get the data
        const stopData = await metroTransitService.getTimeForIdWithRoute(stop, currentRoute.id.toString() || '', '1');
        newStops[stop] = stopData;
        setCurrentStops({...newStops});
	};

    // Load routes on first render
    useEffect(() => {
        getRoutes();
    }, [])

    // Update available stops when the current route changes
    useEffect(() => {
        getStopsForCurrentRoute().then((stops) => {
            setStopSummaries(stops);
        });
    }, [currentRoute])

    return (
        <MetroRoutesContext.Provider value={{
            routes,
            // stops,
            currentStops,
            addStop,
            currentRoute,
            stopSummaries,
            setRoute,
            getRoutes,
            getStopsForCurrentRoute
        }}>
            {props.children}
        </MetroRoutesContext.Provider>
    )
}

export function useMetroRoutes(): MetroRoutesState {
    return useContext(MetroRoutesContext);
}