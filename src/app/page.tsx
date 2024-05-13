'use client'

import { useEffect, useMemo, useState } from "react";
import { InputForm } from "./components/input-form";
import { Loader } from "./components/loader";
import { MetroStopDictionary } from "@/models/metro-stop";
import MetroTransitApiService from "@/services/metro-transit-api-service";
import { MetroTimesTable } from "./components/metro-times-table";
import { DropdownItem } from "./components/dropdown-with-search";
import { useMetroRoutes } from "./context/metro-routes-context";

export default function Home() {

	const metroAppState = useMetroRoutes();

	const setRoute = (route: string) => {
		metroAppState.setRoute(route);
	};

	const addStop = (stop: string) => {
		metroAppState.addStop(stop);
	}

	const availableRoutes = metroAppState.routes.map((route) => {
		return {
			label: route.label,
			value: route.id.toString()
		}
	}).sort( (a,b) => parseInt(a.value) - parseInt(b.value))

	const availableStops = metroAppState.stopSummaries.map((stop) => {
		return {
			label: stop.description,
			value: stop.place_code
		}
	}).sort();

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
					{metroAppState.currentRoute?.id ? metroAppState.currentRoute.id : "--"}
				</div>
			</div>

			<MetroTimesTable data={metroAppState.currentStops}/>
		</main>
	)
}
