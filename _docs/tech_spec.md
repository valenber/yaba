# Technical specifications

Here we outline how our app will be organised.

## Phase 0 - PoC

In this stage we want to run a simple proof-of-concept app for the architecture
we would like to try. It consist of two docker containers connected to eachother.
The client will present a form that would convert an ammount in one currency to another
and the server will expose and endpoint for this conversion and consult some free
API for exchange rate.

### Things we want to check

- how hard it is to communicate between two containers in a docker compose network
- what is a comfortable way of stucturing a project like this
