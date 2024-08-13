'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Loader } from './loader';
import { useState } from 'react';
import { ManualStopForm } from './form/manual-stop-form';
import { MetroTimesList } from './table/metro-times-list';

const queryClient = new QueryClient();

export function MetroRouteDashboard() {
    const [stopsList, setStopsList] = useState<string[]>([]);

    const addStop = (stopId: string) => {
        setStopsList([...stopsList, stopId]);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-row min-w-max justify-left">
                <ManualStopForm onSubmit={addStop} />

                {/* TODO: Add Route Lookup alongside manual entry */}
                <Loader />
            </div>
            <MetroTimesList stops={stopsList} />
        </QueryClientProvider>
    );
}
