import { RideEstimateInput } from "../model/Ride";
import { calculateRoute } from "../util/GoogleMapsUtil";

class RideService {
    async calculateEstimate({ origin, destination }: RideEstimateInput) {
        const routeData = await calculateRoute(origin, destination);

        return {
            origin: routeData.origin,
            destination: routeData.destination,
            distance: routeData.distance,
            duration: routeData.duration,
            routeResponse: routeData.routeResponse,
        };
    }
}

export default new RideService();
