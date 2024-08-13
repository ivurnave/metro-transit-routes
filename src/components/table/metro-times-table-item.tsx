'use client';
import { DataTable } from './data-table';
import { useQuery } from '@tanstack/react-query';
import { getStopForId } from '@/requests/requests';

export function MetroTimesListItem(props: { stopId: string }) {
    const { stopId } = props;

    const { isPending, isError, data, error } = useQuery({
        queryKey: [`stop-${stopId}`],
        queryFn: () => {
            return getStopForId(stopId);
        },
    });

    if (isPending) {
        return <span> Loading... </span>;
    }

    if (isError) {
        return <span> Error! </span>;
    }

    return (
        <li
            key={stopId}
            className="flex flex-col my-3 border-solid rounded-lg border-2 shadow-md p-4"
        >
            <div className="flex flex-row space-x-4">
                <div>
                    <h5>
                        Stop: <strong>{stopId}</strong>
                    </h5>
                </div>
                <div>
                    <h5>
                        Description:{' '}
                        <strong>{data.stops[0].description}</strong>
                    </h5>
                </div>
            </div>
            <div className="flex flex-col mt-3">
                <div>
                    <h5>Departures</h5>
                </div>
                <DataTable data={data.departures} />
            </div>
        </li>
    );
}
