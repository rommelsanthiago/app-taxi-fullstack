import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

export const calculateRoute = async (origin: string, destination: string) => {
    const response = await client.directions({
        params: {
            origin,
            destination,
            key: process.env.GOOGLE_API_KEY!,
        },
    });

    const route = response.data.routes[0];

    return {
        origin: route.legs[0].start_location,
        destination: route.legs[0].end_location,
        distance: route.legs[0].distance.value / 1000, // Convert meters to km
        duration: route.legs[0].duration.text,
        routeResponse: response.data,
    };
};
