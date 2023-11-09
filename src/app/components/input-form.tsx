'use client'

import { useState } from "react";

export interface InputFormProps {
    onSetRoute: (route: string) => void;
    onAddStop: (stop: string) => void;
}

export function InputForm(props: InputFormProps) {

    const [routeNumber, setRouteNumber] = useState<string>('');
    const [stopNumber, setStopNumber] = useState<string>('');

    const handleRouteNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setRouteNumber(event.target.value);
    }

    const handleStopNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setStopNumber(event.target.value);
    }

    const clearRoute = (event: React.MouseEvent<HTMLButtonElement>) => {
        setRouteNumber('');
        props.onSetRoute('');
    }

    const addStop = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.onAddStop(stopNumber);
    }

    const setRoute = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.onSetRoute(routeNumber);
    }

    return (
        <div className="mr-3 grow">
            <div className="flex mb-3">
                <input 
                    type="text"
                    id="routeIdInput"
                    className="form-input grow"
                    placeholder="Route Number"
                    autoComplete="off"
                    value={routeNumber}
                    onChange={handleRouteNumberChange} />
                <button className="btn btn-danger sm:ml-1" type="button" id="btnClearRoute" onClick={clearRoute}>Clear</button>
                <button className="btn btn-primary sm:ml-1" type="button" id="btnSetRoute" onClick={setRoute}>Set route</button>
            </div>
            <div className="flex mb-3">
                <input
                    type="text"
                    id="stopIdInput"
                    className="form-input grow"
                    placeholder="Stop number"
                    autoComplete="off"
                    onChange={handleStopNumberChange} />
                <button className="btn btn-primary sm:ml-1" type="button" id="btnAddStop" onClick={addStop}>Add stop</button>
            </div>
            <div className="col-sm-12 col-lg-4">
              <div className="flex flex-col ms-lg-2">
                  <button className="btn btn-secondary ms-lg-2" type="button" id="updateTime">Update times</button>
              </div>
            </div>
        </div>
    )
}