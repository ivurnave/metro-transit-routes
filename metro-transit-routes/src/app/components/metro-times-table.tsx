'use client'

import { MetroStop, MetroStopDictionary } from "@/models/metro-stop";
import { DataTable } from "./data-table";

export interface MetroTimesTableProps {
    data: MetroStopDictionary;
}

export function MetroTimesTable(props: MetroTimesTableProps) {

    return (
        <ul>
            {/* Times table */}
            { Object.keys(props.data).map((stopId: string) => props.data[parseInt(stopId)]).map((stop: MetroStop) => {
                return <MetroTimesTableItem key={stop.stopId} data={stop} />
            })}
        </ul>
    )
}

interface MetroTimesTableItemProps {
    data: MetroStop;
}

export function MetroTimesTableItem(props: MetroTimesTableItemProps) {

    const { data } = props;
    const { departures } = data;

    return (
        <li key={data.stopId} className="flex flex-col my-3 border-solid rounded-lg border-2 shadow-md p-4">
            <div className="flex flex-row">
                <div>
                    <h5>Stops: {data.stopId}</h5>
                </div>
                <div>
                    <h5>Description: {data.stopDesc}</h5>
                </div>
            </div>
            <div className="flex flex-col mt-3">
                <div>
                    <h5>Departures</h5>
                </div>
                <DataTable data={departures} />
            </div>
        </li>
    )
}