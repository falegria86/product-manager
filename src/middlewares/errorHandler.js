export const errorHandler = (error, req, res, next) => {
    console.log(`Error ${error.message}`);
    const status = error.status || 500;
    res.status(status).send(error.message);
}