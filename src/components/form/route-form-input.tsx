import { getRoutes } from '@/requests/requests';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { DropdownItem, DropdownWithSearch } from '../dropdown-with-search';
import { getDropdownItemFromMetroRoute } from '@/requests/mappers';

export function RouteFormInput(props: {
    onSetRoute: (route: string) => void;
    onClearRoute: () => void;
}) {
    const [selectedRoute, setSelectedRoute] = useState<
        DropdownItem | undefined
    >(undefined);
    const routesQuery = useQuery({ queryKey: ['routes'], queryFn: getRoutes });

    if (routesQuery.isLoading) {
        console.log('Loading routes...');
        return;
    }

    const routes: DropdownItem[] =
        routesQuery.data
            ?.map((route) => getDropdownItemFromMetroRoute(route))
            .sort((a, b) => parseInt(a.value) - parseInt(b.value)) || [];

    const handleRouteSelection = (route: DropdownItem) => {
        setSelectedRoute(route);
        props.onSetRoute(route.value);
    };

    const clearRoute = () => {
        setSelectedRoute(undefined);
    };

    return (
        <div className="flex mb-3">
            <DropdownWithSearch
                placeholder={'Route number...'}
                options={routes}
                onSelected={handleRouteSelection}
                selectedValue={selectedRoute}
            />
            <button
                className="btn btn-danger sm:ml-1"
                type="button"
                id="btnClearRoute"
                onClick={clearRoute}
            >
                Clear
            </button>
        </div>
    );
}
