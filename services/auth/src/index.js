"use strict";

import Hapi from "@hapi/hapi";

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "0.0.0.0",
  });

  server.route({
    method: "*",
    path: "/{any*}",
    handler: (_request, h) => {
      return h.response().code(401);
    },
  });

  await server.start();
  console.log("Auth server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
