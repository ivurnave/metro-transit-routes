'use client'
import { useState } from "react";
import { DropdownItem, DropdownWithSearch } from "../dropdown-with-search";
import { useQuery } from "@tanstack/react-query";
import { getRoutes, getStopsForRouteAndDirection } from "@/requests/requests";
import { getDropdownItemFromMetroRoute, getDropdownItemFromMetroStopSummary } from "@/requests/mappers";
import { RouteFormInput } from "./route-form-input";

export interface RouteLookupFormProps {
    onSetRoute: (route: string) => void;
    onAddStop: (stop: string) => void;
}

export function RouteLookupForm(props: RouteLookupFormProps) {

    const [selectedRoute, setSelectedRoute] = useState<DropdownItem | undefined>(undefined);
    const [selectedStop, setSelectedStop] = useState<DropdownItem | undefined>(undefined);
    const [selectedDirection, setSelectedDirection] = useState<string>('0');
    const routesQuery = useQuery({ queryKey: ['routes'], queryFn: getRoutes});
    const stopsQuery = useQuery({
        queryKey: ['stopsForRoute'],
        queryFn: () => getStopsForRouteAndDirection(selectedRoute?.value || '')
    })

    if (routesQuery.isLoading) {
        console.log('Loading routes...');
        return;
    }

    console.log(routesQuery.data);
    
    const routes: DropdownItem[] = routesQuery.data?.map(route => getDropdownItemFromMetroRoute(route))
                                              .sort( (a,b) => parseInt(a.value) - parseInt(b.value)) || [];

    // const stops: DropdownItem[] = [];
    const stops: DropdownItem[] = stopsQuery.data?.map(stop => getDropdownItemFromMetroStopSummary(stop))
                                            .sort( (a,b) => parseInt(a.value) - parseInt(b.value)) || [];


    // const clearRoute = (_event: React.MouseEvent<HTMLButtonElement>) => {
    //     setSelectedRoute(undefined);
    //     setSelectedStop(undefined);
    //     props.onSetRoute('');
    // }

    const handleRouteSelection = (route: DropdownItem) => {
        setSelectedRoute(route);
        props.onSetRoute(route.value);
    }

    const handleNewStop = (option: DropdownItem) => {
        setSelectedStop(option);
        props.onAddStop(option.value);
    }

    return (
        <div className="mr-3 grow">
            {/* <div className="flex mb-3">
                <DropdownWithSearch placeholder={"Route number..."} options={routes} onSelected={handleRouteSelection} selectedValue={selectedRoute} />
                <button className="btn btn-danger sm:ml-1" type="button" id="btnClearRoute" onClick={clearRoute}>Clear</button>
            </div> */}
            <RouteFormInput onSetRoute={props.onSetRoute} onClearRoute={() => props.onSetRoute('')} />
            <div className="flex mb-3">
                <DropdownWithSearch placeholder={"Stop number..."} options={stops} onSelected={handleNewStop} selectedValue={selectedStop}/>
            </div>
            <div className="col-sm-12 col-lg-4">
              <div className="flex flex-col ms-lg-2">
                  <button className="btn btn-secondary ms-lg-2" type="button" id="updateTime">Update times</button>
              </div>
            </div>
        </div>
    )
}