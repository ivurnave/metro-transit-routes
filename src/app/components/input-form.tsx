'use client'

import { useState } from "react";
import { DropdownItem, DropdownWithSearch } from "./dropdown-with-search";

export interface InputFormProps {
    routes: DropdownItem[];
    stops: DropdownItem[];
    onSetRoute: (route: string) => void;
    onAddStop: (stop: string) => void;
}

export function InputForm(props: InputFormProps) {

    const clearRoute = (_event: React.MouseEvent<HTMLButtonElement>) => {
        props.onSetRoute('');
    }

    const handleRouteSelection = (route: DropdownItem) => {
        props.onSetRoute(route.value);
    }

    const handleNewStop = (option: DropdownItem) => {
        props.onAddStop(option.value);
    }

    return (
        <div className="mr-3 grow">
            <div className="flex mb-3">
                <DropdownWithSearch placeholder={"Route number..."} options={props.routes} onSelected={handleRouteSelection} />
                <button className="btn btn-danger sm:ml-1" type="button" id="btnClearRoute" onClick={clearRoute}>Clear</button>
            </div>
            <div className="flex mb-3">
                <DropdownWithSearch placeholder={"Stop number..."} options={props.stops} onSelected={handleNewStop}/>
            </div>
            <div className="col-sm-12 col-lg-4">
              <div className="flex flex-col ms-lg-2">
                  <button className="btn btn-secondary ms-lg-2" type="button" id="updateTime">Update times</button>
              </div>
            </div>
        </div>
    )
}