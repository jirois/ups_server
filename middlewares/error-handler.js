const errorHandlerMiddleware = (err, req, res, next) => {
    const customError = {
       statusCode: err.statusCode || 500,
       msg: err.message || 'Something went wrong please try again' 
    }

    if (err.name === 'ValidationError') {
      customError.msg = Object.values(err.errors)
        .map((item) => item.message)
        .join(',')
        customError.statusCode = 400  
    }

    if (err.code && err.code === 11000) {
        customError.msg = ` Duplicate value entered for ${Object.keys(
            err.KeyValue
        )} field, please choose another value`
        customError.statusCode = 400
    }

    if (err.name === 'CastError') {
        customError.msg = `No item found with id: ${err.value}`
        customError.statusCode = 404
    }

    return res.status(customError.statusCode).json({msg: customError.msg})

}

export default errorHandlerMiddleware