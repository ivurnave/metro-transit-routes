'use client';
import { MetroTimesListItem } from './metro-times-table-item';

export function MetroTimesList(props: { stops: string[] }) {
    return (
        <ul>
            {props.stops.map((stopId: string) => {
                return <MetroTimesListItem key={stopId} stopId={stopId} />;
            })}
        </ul>
    );
}
