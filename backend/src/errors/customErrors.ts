export class CustomError extends Error {
    constructor(statusCode: string, message: string){
        super(message)
        this.stack = statusCode;
    }
};
