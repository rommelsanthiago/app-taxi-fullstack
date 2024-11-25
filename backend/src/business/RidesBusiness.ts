import { RidesRepository } from "./RidesRepository";


export class RidesBusiness {
    constructor(
        private readonly ridesRepository: RidesRepository,
    ){}

    public checkHealthBusiness = async () => {
        try {
            return await this.ridesRepository.checkHealtDatabase();
        } catch (error) {
            console.error(error);
        }
    }
};
