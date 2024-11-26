import { RideEstimateInput } from "../model/Ride";
import { CustomError } from "../errors/customErrors";
import { calculateRoute } from "../util/GoogleMapsUtil";

class RideService {
    async calculateEstimate({ customer_id, origin, destination }: RideEstimateInput) {
        if (!customer_id || !origin || !destination) {
            throw new CustomError("428", "All fields (customer_id, origin, and destination) are required.");
        }

        if (origin === destination) {
            throw new CustomError("400", "Origin and destination cannot be the same.");
        }

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
