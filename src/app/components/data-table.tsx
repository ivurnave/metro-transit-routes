'use client'

import { MetroStopDeparture } from "@/models/metro-stop"

interface DataTableProps {
    data: MetroStopDeparture[]
}

export function DataTable(props: DataTableProps) {
    
        const { data } = props;
    
        return (
            <table className="table-auto border-collapse rounded-lg border-slate-500">
                <thead>
                    <tr>
                        <th className="border-b-2 border-slate-600 p-4" scope="col">Route</th>
                        <th className="border-b-2 border-slate-600 p-4" scope="col">Departure Time</th>
                        <th className="border-b-2 border-slate-600 p-4" scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    { data.map((departure: MetroStopDeparture) => {
                        return <DataTableItem key={departure.arrivalTime} data={departure} />
                    })}
                </tbody>
            </table>
        )
}

interface DataTableItemProps {
    data: MetroStopDeparture
}

export function DataTableItem(props: DataTableItemProps) {

    const { data } = props;

    return (
        <tr className="odd:bg-white even:bg-gray-200">
            <th className="p-4" scope="row">{data.routeId}</th>
            <td className="p-4">{data.arrivalTime}</td>
            <td className="p-4">{data.description}</td>
        </tr>
    )
}