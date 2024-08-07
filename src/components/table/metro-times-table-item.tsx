'use client'
import { MetroStop } from "@/models/metro-stop";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import { getStopForId } from "@/requests/requests";

export function MetroTimesListItem(props: { stopId: string }) {

    const { stopId } = props;

    const { isPending, isError, data, error } = useQuery({
        queryKey: [`stop-${stopId}`],
        queryFn: () => {
            console.log('props passed to MetroTimesListItem ', props)
            return getStopForId(stopId)
        }
    });

    if (isPending) {
        return (<span> Loading... </span>)
    }

    if (isError) {
        return (<span> Error! </span>)
    }

    return (
        <li key={stopId} className="flex flex-col my-3 border-solid rounded-lg border-2 shadow-md p-4">
            <div className="flex flex-row">
                <div>
                    <h5>Stops: {stopId}</h5>
                </div>
                <div>
                    <h5>Description: {data.stopDesc}</h5>
                </div>
            </div>
            <div className="flex flex-col mt-3">
                <div>
                    <h5>Departures</h5>
                </div>
                <DataTable data={data.departures} />
            </div>
        </li>
    )
}