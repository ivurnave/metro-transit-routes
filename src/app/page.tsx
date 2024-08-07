// 'use client'
import { QueryClient } from "@tanstack/react-query";
import { MetroRouteDashboard } from "@/components/metro-route-dashboard";
import { MetroStopCheckerHeader } from "@/components/metro-stop-checker-header";


const queryClient = new QueryClient();

export default function Home() {
	return (
		<main className="flex max-h-screen flex-col justify-start m-4">
			<MetroStopCheckerHeader />
			<MetroRouteDashboard />
		</main>
	)
}
