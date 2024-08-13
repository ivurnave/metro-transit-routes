import { DropdownItem } from '@/components/dropdown-with-search';
import { MetroRoute } from '@/models/metro-route';
import { MetroStopSummary } from '@/models/metro-stop';

export function getDropdownItemFromMetroRoute(route: MetroRoute): DropdownItem {
    return {
        label: route.route_label,
        value: route.route_id.toString(),
    };
}

export function getDropdownItemFromMetroStopSummary(
    stopSummary: MetroStopSummary
): DropdownItem {
    return {
        label: stopSummary.description,
        value: stopSummary.place_code,
    };
}
