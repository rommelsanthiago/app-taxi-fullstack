import { useState } from "react";

import MapContainer from "../../components/Map";

import * as S from "./styles";

interface Driver {
    id: string;
    name: string;
    description: string;
    vehicle: string;
    rating: number;
    value: number;
}
  

const TravelOptions = () => {
    const [address, setAddress] = useState<any>();
    const [drivers, setDrivers] = useState<Driver[]>([]);

    const estimates = JSON.parse(localStorage.getItem("estimates")!);

    const handleChooseDriver = async (driver: any) => {
        console.log("Driver:", driver);
        const route = {
            origin: driver.origin,
            destination: driver.destination,
        }
        setAddress(route);
        setDrivers(driver);
    }

    return (
        <S.Container>
          <h1>Travel Options</h1>
          <MapContainer address={address}/>
            {/* Here you would integrate a map component, e.g., Google Maps */}
            {/* <img src={estimate.route} alt="Route map" /> */}
          <S.DriverList>
            {estimates.options.map((driver: Driver) => (
              <S.DriverCard key={driver.id}>
                <h2>{driver.name}</h2>
                <p>{driver.description}</p>
                <p>Veiculo: {driver.vehicle}</p>
                <p>Avaliação: {driver.rating}</p>
                <p>Preço: R${driver.value.toFixed(2)}</p>
                <S.Button onClick={() => handleChooseDriver(driver)}>Escolher</S.Button>
              </S.DriverCard>
            ))}
          </S.DriverList>
        </S.Container>
    );
};

export default TravelOptions;
