import express from "express";

/**
 * Apply middlewares to the provided Express application.
 * @param {express.Express} api The Express application instance.
 */
const injectMiddlewares = (api) => {
  api.use(express.json({ limit: "200mb" }));
};

export default injectMiddlewares;
