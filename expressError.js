class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = messsage;
        this.status = status;
        console.log(this.stack);
    }
}

module.exports = ExpressError;