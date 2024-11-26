import { DriverModel } from "../model/Ride";

const initialDrivers = [
    {
        id: 1,
        name: "Homer Simpson",
        description: "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
        vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
        review: {
            rating: 2,
            comment: "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
        },
        ratePerKm: 2.5,
        minKm: 1,
    },
    {
        id: 2,
        name: "Dominic Toretto",
        description: "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
        vehicle: "Dodge Charger R/T 1970 modificado",
        review: {
            rating: 4,
            comment: "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
        },
        ratePerKm: 5.0,
        minKm: 5,
    },
    {
        id: 3,
        name: "James Bond",
        description: "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
        vehicle: "Aston Martin DB5 clássico",
        review: {
            rating: 5,
            comment: "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
        },
        ratePerKm: 10.0,
        minKm: 10,
    },
];

export const initializeDrivers = async () => {
    try {
        const count = await DriverModel.countDocuments();
        if (count === 0) {
            console.log("Nenhum motorista encontrado. Inserindo dados iniciais...");
            await DriverModel.insertMany(initialDrivers);
            console.log("Dados iniciais de motoristas inseridos com sucesso!");
        } else {
            console.log("Motoristas já estão presentes no banco de dados.");
        }
    } catch (error: any) {
        console.error("Erro ao inicializar os dados de motoristas:", error);
    }
};
