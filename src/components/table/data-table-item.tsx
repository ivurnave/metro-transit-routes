import { MetroStopDeparture } from '@/models/metro-stop';

interface DataTableItemProps {
    data: MetroStopDeparture;
}

export function DataTableItem(props: DataTableItemProps) {
    const { data } = props;

    return (
        <tr className="odd:bg-white even:bg-gray-200">
            <th className="p-4" scope="row">
                {data.route_id}
            </th>
            <td className="p-4">{data.departure_text}</td>
            <td className="p-4">{data.description}</td>
        </tr>
    );
}
