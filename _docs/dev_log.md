# Development Log

I want to keep notes of interesting things I learn as I go on to develop this
project.

## 08/12/2023

### TIL how to connect containers together using docker compose and nginx

I used one nginx service to route the requests, another one to serve the web
client, and in the third service I ran a node app that exposed an endpoint. The
web client then was able to send requests to this endpoint and get a reply.

The ingress service that is used to direct requests to the correct services
needs to be configured via nginx.conf file. The syntax seems quite complicated,
but it's an old tech and I expect finding answers will be easy.

To manage the request we need to decide what path will be considered an API call
e.g. `/api/exchange/` and then forward it to the correct service, in this case
the exchange-service. It's important to remember to remove the part of the path
we used to identify the service and redirect with the path to endpoint. So for
example `/api/exchange/rate` becomes `/rate` when it gets to the
exchange-service. Which is one of the endpoints it exposes.

On a different topic, I tried to do local development using docker containers to
be closer to the production environment, but failed. I think for now I will
stick with the normal dev servers options.
