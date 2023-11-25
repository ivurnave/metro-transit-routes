'use client'

import { useEffect, useMemo, useState } from "react";
import { InputForm } from "./components/input-form";
import { Loader } from "./components/loader";
import { MetroStopDictionary } from "@/models/metro-stop";
import MetroTransitApiService from "@/services/metro-transit-api-service";
import { MetroTimesTable } from "./components/metro-times-table";
import { DropdownItem } from "./components/dropdown-with-search";

export default function Home() {

	const [availableRoutes, setAvailableRoutes] = useState<DropdownItem[]>([]);
	const [availableStops, setAvailableStops] = useState<DropdownItem[]>([]);

	const setRoute = (route: string) => {
		if (route === '') setCurrentRoute('');
		else setCurrentRoute(parseInt(route));
	};

	const addStop = async (stop: string) => {
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

	useEffect(() => {
		if (metroTransitApiService) {
			const fetchRouteData = async () => {
				const routes = await metroTransitApiService.getRoutes();
				console.log(routes)
				setAvailableRoutes(routes.map((route) => {
					return {
						label: route.label,
						value: route.id.toString()
					}
				}).sort( (a,b) => parseInt(a.value) - parseInt(b.value)));
			};
	
			const fetchStopData = async () => {
				const stops = await metroTransitApiService.getStops();
				setAvailableStops(stops.map((stop) => {
					return {
						label: stop.stopId.toString(),
						value: stop.stopDesc
					}
				}).sort());
			};
	
			fetchRouteData();
			fetchStopData();
		}
	}, [metroTransitApiService]);

	const [currentRoute, setCurrentRoute] = useState<number | ''>('');
	const [currentStops, setCurrentStops] = useState<MetroStopDictionary>({});

	return (
		<main className="flex max-h-screen flex-col justify-start m-4">
			{/* Header */}
			<div className="flex flex-row justify-between content-center">
				<h1 className="my-3 text-xl font-semibold">Metro Stop Checker</h1>
			</div>

			<div className="flex flex-row min-w-max justify-left">
				{/* Input Form */}
				<InputForm
					onAddStop={addStop}
					onSetRoute={setRoute}
					routes={availableRoutes}
					stops={availableStops}
					/>
				<Loader />

				{/* Route Number */}
				<div className="flex shadow-md content-center justify-center min-h-full min-w-max w-32 text-4xl font-semibold border-solid rounded-lg border-2 flex-wrap">
					{currentRoute ? currentRoute : "--"}
				</div>
			</div>

			<MetroTimesTable data={currentStops}/>
		</main>
	)
}
