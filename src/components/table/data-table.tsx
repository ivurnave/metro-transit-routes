import { MetroStop, MetroStopDeparture } from '@/models/metro-stop';
import { DataTableItem } from './data-table-item';

interface DataTableProps {
    data: MetroStopDeparture[];
}

export function DataTable(props: DataTableProps) {
    const { data } = props;

    return (
        <table className="table-auto border-collapse rounded-lg border-slate-500">
            <thead>
                <tr>
                    <th className="border-b-2 border-slate-600 p-4" scope="col">
                        Route
                    </th>
                    <th className="border-b-2 border-slate-600 p-4" scope="col">
                        Departure Time
                    </th>
                    <th className="border-b-2 border-slate-600 p-4" scope="col">
                        Description
                    </th>
                </tr>
            </thead>
            <tbody>
                {data?.map((departure: MetroStopDeparture) => {
                    return (
                        <DataTableItem
                            key={departure.departure_time}
                            data={departure}
                        />
                    );
                })}
            </tbody>
        </table>
    );
}
