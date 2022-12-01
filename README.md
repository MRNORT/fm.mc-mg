# CadenceRadio

**Cadence** is an all-in-one web radio suite, allowing anyone to quickly and easily start an internet radio website in minutes.

The project ships with built-in _Icecast_ and _Liquidsoap_ working out-of-the-box, complemented by a UI, music search, song request, artwork, and real-time stream information features.

Your audiences can interact with your Cadence Radio much like a traditional call-in radio station. The project ships all components mostly pre-configured to work with each each other so there is hardly any configuration to do.

To start your own instance of Cadence, set a target directory containing your music, set a few service passwords and hostnames, and you're good to go! Cadence ships which a Compose file that will set the entire radio stack up in a single command.

**See a live demo on [cadenceradio.com](https://cadenceradio.com/)!**

# Image Gallery

*Cadence Browser UI*
![cadence5](https://user-images.githubusercontent.com/17265041/189464889-b6a67b78-8d9d-4aef-a142-2494448f26a4.JPG)

*Cadence Architecture*
![cadence5 architecture](https://user-images.githubusercontent.com/17265041/185465196-66fc2249-e43a-46f7-a12f-dbde9aaf8172.png)

# Start Here

> **Warning**: The way this repo currently handles configuration involves adding passwords to files which you may accidentally commit, so be careful.

## Prerequisites
1. You must have Docker Compose installed.

## Installation
1. Edit the `cadence/config/cadence.env` file:
   1. Set the `CSERVER_MUSIC_DIR` value to an absolute path of a directory on your local system which you want to play music. The target is not recursively searched. The default location is `/music/`.
   2. Set the `CSERVER_REQRATELIMIT` to the number of seconds you wish to timeout users after they make song requests. Setting this value to `0` will disable rate limiting.
2. Configure the `cadence_icecast2/config/cadence.xml` file.
   1. Change all instances of `hackme` to a new password.
   2. Set the `<hostname>` value to the endpoint you expect your audience to connect to. Cadence uses this value to set the stream source in the UI. This can be a DNS name, an IP address, or leave it default `localhost` to run locally.
3. Configure the `cadence_liquidsoap/config/cadence.liq` file.
   1. Change all instances of `hackme` to a new password.
   2. If you changed the music target directory in step 1.1 above, change any instances of the default value `"/music/"` to match it.
4. `docker compose up`. 

That's all. All Cadence services will start up linked with each other.

## Accessing Services
- The UI is accessible in a browser by default at `localhost:8080`.
- API server requests may sent to the `localhost:8080` path by default. See API Documentation below.
- The stream endpoint is accessible at `localhost:8000/cadence1` by default.

## Building the Stack Locally
If you are developing and need to rebuild all services exactly as you have locally:
1. `docker compose up --build`

# API Reference
See [Cadence's GitHub Wiki for API Documentation](https://github.com/kenellorando/cadence/wiki/API-Reference) or the `API` tab on https://cadenceradio.com for complete details and request/response examples.

# Container Repositories
- https://hub.docker.com/r/kenellorando/cadence
- https://hub.docker.com/r/kenellorando/cadence_icecast2
- https://hub.docker.com/r/kenellorando/cadence_liquidsoap
