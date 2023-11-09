'use client'

import { useMemo, useState } from "react";
import { InputForm } from "./components/input-form";
import { Loader } from "./components/loader";
import { MetroStopDictionary } from "@/models/metro-stop";
import MetroTransitApiService from "@/services/metro-transit-api-service";
import { MetroTimesTable } from "./components/metro-times-table";

export default function Home() {

	const setRoute = (route: string) => {
		console.log(route);
		if (route === '') setCurrentRoute('');
		else setCurrentRoute(parseInt(route));
	};

	const addStop = async (stop: string) => {
		console.log('should re-render')
		const stopNumber = parseInt(stop);
		if (Number.isNaN(stopNumber)) return;
		else {
			const newStops: MetroStopDictionary = currentStops;
			if (newStops[stopNumber] === undefined) {
				newStops[stopNumber] = {
					stopId: stopNumber,
					stopDesc: '',
					departures: []
				};
			}
			setCurrentStops({...newStops});

			// Update the state once we get the data
			const stopData = await metroTransitApiService.getTimeForId(stopNumber);
			newStops[stopNumber] = stopData;
			setCurrentStops({...newStops});
		}
	};

	const metroTransitApiService = useMemo(() => new MetroTransitApiService(), []);

	const [currentRoute, setCurrentRoute] = useState<number | ''>('');
	const [currentStops, setCurrentStops] = useState<MetroStopDictionary>({});

	return (
		<main className="flex min-h-screen flex-col justify-start m-4">
			{/* Header */}
			<div className="flex flex-row justify-between content-center">
				<h1 className="my-3 text-xl font-semibold">Metro Stop Checker</h1>
			</div>

			<div className="flex flex-row justify-left">
				{/* Input Form */}
				<div>
					<InputForm onAddStop={addStop} onSetRoute={setRoute} />
					<Loader />
				</div>

				{/* Route Number */}
				<div className="flex shadow-md content-center justify-center min-h-full min-w-max w-32 text-4xl font-semibold border-solid rounded-lg border-2 flex-wrap">
					{currentRoute ? currentRoute : "--"}
				</div>
			</div>

			<MetroTimesTable data={currentStops}/>
		</main>
	)
}
