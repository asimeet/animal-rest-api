const catchServerError = (err, req, res, next) => {
    if (err) {
        let errorHtml = `
        <h2> Error: ${err.message}</h2>
        <h3> Kindly contact support@restapiapp.com for further assistance.</h3>
        `;
        if (err.stack) {
            errorHtml += `<p> Stack: ${err.stack} </p>`;
        }
        const errStatus = err?.status || err?.response?.status || err?.statusCode || 500;
        res.status(errStatus).send(errorHtml);
    }
}

module.exports = { catchServerError };