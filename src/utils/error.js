class ClientError extends Error {
    constructor(message, status){
        super(message);
        this.status = status;
        this.message = `ClientError: ${message}`;
    }
}

class serverError extends Error{
    constructor(message){
        super(message);
        this.message = `ServerError: ${message}`;
        this.status = 500;

    }
}

const globalError = (err, res) => {
    let error = {
        message: err.message,
        status: err.status || 500
    }
    res.status(error.status).json(error.message);
}

export {globalError, ClientError, serverError};