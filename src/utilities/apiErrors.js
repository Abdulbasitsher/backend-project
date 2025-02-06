class ApiErrors extends Error {
    constructor(statusCode, message = "Internal server error", errors =[], stack= "") {
        super(message);
        this.data = null;
        this.succes = false;
        this.errors = errors;
        this.statusCode = statusCode;
        this.message = message;
    

    
    if (stack){
        this.stack = stack;
    } else{
        Error.captureStackTrace(this, this.constructor);
    }
}}

export default ApiErrors;