// 'use client'

// import { MetroRoute } from "@/models/metro-route";
// import { MetroStopDictionary, MetroStopSummary } from "@/models/metro-stop";
// import React, { useState, useContext } from "react";

// /** The value we provide via context (i.e. the value and a setter of state) */
// export interface MetroRoutesState {
//     routes: MetroRoute[];
//     // stops: MetroStop[];
//     currentRoute?: MetroRoute;
//     currentStops: MetroStopDictionary;
//     stopSummaries: MetroStopSummary[];
//     setRoute: (route: string) => void;
//     addStop: (stop: string) => void;
// }

// export const MetroRoutesConfigContext = React.createContext<MetroRoutesState>({
//     routes: [],
//     stops: [],
//     stopSummaries: [],
//     currentStops: {},
//     currentRoute: undefined,
//     setRoute: (route: string) => { throw new Error('setRoute callback not defined') },
//     addStop: (stop: string) => { throw new Error('addStop callback not defined') },
// });

// export interface MetroRoutesConfigProviderProps { children?: React.ReactNode }
// export function MetroRoutesConfigProvider(props: MetroRoutesConfigProviderProps) {
//     const [routes, setRoutes] = useState<MetroRoute[]>([]);
//     const [stops, setStops] = useState<MetroStop[]>([]);
//     const [currentRoute, setCurrentRoute] = useState<MetroRoute>();
//     const [stopSummaries, setStopSummaries] = useState<MetroStopSummary[]>([]);
//     const [currentStops, setCurrentStops] = useState<MetroStopDictionary>({});

//      /** Update globally loaded routes, return them */
//     //  const getRoutes = async () => {
//     //     const routes = await metroTransitService.getRoutes();
//     //     setRoutes(routes);

//     //     return routes;
//     // };

//     // const getStopsForCurrentRoute = async () => {
//     //     if (currentRoute) {
//     //         return await metroTransitService.getStopsForRoute(currentRoute.id.toString(), '1');
//     //     }
//     //     return [];
//     // };

//     const setRoute = (route: string) => {
//         if (route === '') {
//             setCurrentRoute(undefined);
//             setStopSummaries([]);
//         } else {
//             setCurrentRoute(routes.find((r) => r.route_id.toString() === route));
//         }
//     };

//     const addStop = async (stop: string) => {
//         // if (!currentRoute) return;

//         // const newStops: MetroStopDictionary = currentStops;
//         // if (newStops[stop] === undefined) {
//         //     newStops[stop] = {
//         //         stopId: stop,
//         //         stopDesc: '',
//         //         departures: []
//         //     };
//         // }
//         // setCurrentStops({...newStops});

//         // // Update the state once we get the data
//         // const stopData = await metroTransitService.getTimeForIdWithRoute(stop, currentRoute.id.toString() || '', '1');
//         // newStops[stop] = stopData;
//         // setCurrentStops({...newStops});
// 	};

//     return (
//         <MetroRoutesConfigContext.Provider value={{
//             routes,
//             stops,
//             currentStops,
//             addStop,
//             currentRoute,
//             stopSummaries,
//             setRoute,
//         }}>
//             {props.children}
//         </MetroRoutesConfigContext.Provider>
//     )
// }

// export function useMetroRoutes(): MetroRoutesState {
//     return useContext(MetroRoutesConfigContext);
// }
