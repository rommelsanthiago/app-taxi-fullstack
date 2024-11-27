export class CustomError extends Error {
    error_code: number;
    description: string;
    error_description: string;

    constructor(error_code: number, description: string, error_description: string){
        super(description)
        this.error_code = error_code;
        this.description = description;
        this.error_description = error_description;
    }
};

export class InvalidData extends CustomError{ 
    constructor(){
        super(404, "Os dados fornecidos no corpo da requisição são inválidos", "Insira os dados que estão faltando");
    }
};

export class SameData extends CustomError {
    constructor(){
        super(400, "O destino e a origem são iguais", "O destino e a origem devem ser diferentes");
    }
};

export class DriverNotFound extends CustomError {
    constructor(){
        super(404, "Motorista não encontrado", "Verifique se o motorista está cadastrado");
    }
};

export class InvalidDistance extends CustomError {
    constructor(){
        super(400, "Distância inválida", "A distância é muito curta para o motorista selecionado.");
    }
};
