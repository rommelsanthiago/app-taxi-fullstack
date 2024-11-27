import { useState } from "react";
import axios from "axios";

import * as S from "./styles";

import { Notify } from "../../services/Notify";
import { api } from "../../utils/api";

const TravelRequest = () => {
    const [userId, setUserId] = useState('');
    const [sourceAddress, setSourceAddress] = useState('');
    const [destinationAddress, setDestinationAddress] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const body = {
                "customer_id": userId, 
                "origin": sourceAddress, 
                "destination": destinationAddress
            }
            
            const estimates = await axios.post(`${api}/estimate`, body);
            
            return estimates;
        } catch (err: any) {
            Notify.error(err.response.data.error_description, "topRight");
        }
    };

    return (
        <S.Container>
          <h1>Solicitação de viagem</h1>
          <S.Form onSubmit={handleSubmit}>
            <S.Input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
            <S.Input
              type="text"
              placeholder="Endereço de origem"
              value={sourceAddress}
              onChange={(e) => setSourceAddress(e.target.value)}
              required
            />
            <S.Input
              type="text"
              placeholder="Endereço de destino"
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
              required
            />
            <S.Button type="submit">Estimativa de viagem</S.Button>
          </S.Form>
        </S.Container>
    );
};

export default TravelRequest;
