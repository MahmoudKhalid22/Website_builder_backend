import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ZWEB ( Zag Website Easy Build ) API Docs",
      description:
        "this is api for the website builder project maintained by backend team",
      version: "1.0.0",
      contact: {
        name: "ZWEB Team",
        email: "zagwebeasybuilder@gmail.com",
      },
    },
    servers: [{ url: `http://locahost:5000/` }],
  },
  apis: ["./src/utils/*.js", "./src/model/*.js"],
};

const spacs = swaggerJSDoc(options);

function docs(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(spacs));
}

export { docs };
