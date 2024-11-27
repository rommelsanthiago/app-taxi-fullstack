import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const MapContainer = styled.div`
  margin-bottom: 20px;
  img {
    width: 100%;
    height: auto;
  }
`;

export const DriverList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

export const DriverCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;
  padding: 15px;
`;

export const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.success};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

