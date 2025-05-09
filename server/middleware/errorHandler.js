const errorHandler = (err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || 'Server error';
  
    if (process.env.NODE_ENV === 'development') {
        console.error(err.stack);
    }
  
    res.status(status).json({ error: message });
};
  
export default errorHandler;
