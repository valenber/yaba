"use strict";
import Hapi from "@hapi/hapi";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";

const currencyAPI = new Freecurrencyapi(process.env.FC_API_KEY);

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "0.0.0.0",
  });

  server.route({
    method: "GET",
    path: "/rate",
    handler: async () => {
      const response = await currencyAPI.latest({
        base_currency: "EUR",
        currencies: ["USD", "RUB", "GBP", "ILS"],
      });
      return response;
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
