export class CustomError extends Error {
    status_code: number;
    error_code: string;
    description: string;
    error_description: string;

    constructor(status_code: number, error_code: string, description: string, error_description: string){
        super(description)
        this.status_code = status_code;
        this.error_code = error_code;
        this.description = description;
        this.error_description = error_description;
    }
};

export class InvalidData extends CustomError{ 
    constructor(){
        super(404, "INVALID_DATA", "Os dados fornecidos no corpo da requisição são inválidos", "Insira os dados que estão faltando");
    }
};

export class SameData extends CustomError {
    constructor(){
        super(400, "INVALID_DATA", "O destino e a origem são iguais", "O destino e a origem devem ser diferentes");
    }
};

export class DriverNotFound extends CustomError {
    constructor(){
        super(404, "DRIVER_NOT_FOUND", "Motorista não encontrado", "Verifique se o motorista está cadastrado");
    }
};

export class InvalidDriver extends CustomError {
    constructor(){
        super(400, "INVALID_DRIVER", "Motorista invalido", "Verifique se o motorista está cadastrado");
    }
};

export class InvalidDistance extends CustomError {
    constructor(){
        super(400, "INVALID_DISTANCE", "Distância inválida", "A distância é muito curta para o motorista selecionado.");
    }
};

export class RidesNotFound extends CustomError {
    constructor(){
        super(404, "NO_RIDES_FOUND", "Nenhum registro encontrado", "Usuário não tem nenhuma viagem cadastrada");
    }
}
