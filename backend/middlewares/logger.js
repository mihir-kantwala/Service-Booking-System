export const logger = async (req, res, next) => {
  console.log(
    `${req.method} - ${req.originalUrl} - ${res.statusCode} - ` +
      new Date().toLocaleDateString() +
      ' - ' +
      new Date().toLocaleTimeString(),
  );

  next();
};
