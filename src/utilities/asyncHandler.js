const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch(next)
        .catch((error) => error(next))
    }
}

export default asyncHandler;