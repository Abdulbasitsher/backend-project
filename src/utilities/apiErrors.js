class ApiErrors extends Error {
    constructor(statusCode, message = "Internal server error", errors =[], statck= "") {
        super(message);
        this.data = null;
        this.succes = false;
        this.errors = errors;
        this.statusCode = statusCode;
        this.message = message;
    

    
    if (statck){
        this.stack = statck;
    } else{
        Error.captureStackTrace(this, this.constructor);
    }
}}

export default ApiErrors;