# Development Log

I want to keep notes of interesting things I learn as I go on to develop this
project.

## 08/12/2023

### Learn how to connect containers together using docker compose and nginx

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
stick with the normal dev server options.

I added a call to [freecurrencyapi](https://freecurrencyapi.com/) inside the
`exchange-service` to fetch exchange rates for currencies. It was very easy to
integrate and has a generous free tier.

## 09/12/2023

I'm going to add authentication to the app. It seems that the most sensible
approach is to protect the whole app at the ingress level. It will take care of
all the current services and the ones we may implement in the future.
To do this the nginx that we use as _reverse proxy_<sup>1</sup> before forwarding
requests to corect service has to consult the new `auth` service, that will
determine if the request is authenticated or not. When ingress receives OK from
the `auth` service in will forward the request following the rules in
nginx.conf, otherwise it will return 404 for endpoints and redirect to login for
client requests.

I will try to implement auth via JSON Web Token (JWT). It is a web standard that
allows `auth` service to encode user data as a long string using a
random key known only to the server itself. This way if in the future it receives
a token inside the `Authorization: Bearer <token>` header and can decode
it, the server can be sure that this token has been issued by this server, and
the user data contained in the token payload is valid. The token can also have
an expiration date or be valid indefinitely. JWT only works over secure
connections.

### Plan of action

- add dummy `auth` service to the system and return hardcoded result (200 or 401)
- update nginx.conf to require `auth_jwt` to see if it works
- add login functionality in `auth` service (mock users table with CSV file and
  generate JWT)
- store JWT as a cookie, so it's sent automatically with every request
- figure out how SSL certificates fit in here
- add user registration functionality
- integrate with external provider to manage users, roles and auth methods

## 10/12/2023

### auth_jwt directive does not work in FOSS version of Nginx

I was hoping to use `auth_jwt` in my ingress, but it is not available in free
version of nginx. There is a commercial version called Nginx Plus that
allows to configure JWT auth in this way, but with the open-source version
I will need another approach.

### Plan of action

- add `login` service that will consult DB and generate/store JWT token
  - we want to store in in a cookie with strict same-site policy
  - we can start with CVS file instead of DB
- add `auth proxy` service that will read JWT from cookies and validate it
  - in order to validate created JWT we need to share a key between services
- add `auth_request` and `error_page` directives to nginx ingress
- add user registration functionality

### Still to figure out

- how SSL certificates fit in here

## 18/12/2023 - 24/12/2023

I made a few attempts to design the authentication service, but realized I
miss some key knowledge about the topic. After studying a bit of theory,
reviewing several solutions and going through a few tutorials, I decided
to try to build my own implementations using a combination of NestJS and ReactJS.

I have set up a monorepo (Turbo) that combies the two projects: React (using Vite) for the UI that will display registration and login forms and NestJS for the API that will handle user and JWT validation.

#### Footnotes

- <sup>1</sup> Reverse proxy just means that it controls access from the Internet to a computer,
  rather than from a computer to the Internet, the way a direct proxy does.
