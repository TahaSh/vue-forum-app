# Vue Forum App — Frontend

A fullstack application built with Vue on the frontend and Node/Express on the backend.

### [Demo](https://vue-forum-app.herokuapp.com/)&nbsp;&nbsp;&nbsp;&nbsp;[Backend](https://github.com/TahaSh/vue-forum-app-backend)

This repo demonstrates almost everything you need to know to build a complete fullstack application using Vue and Node/Express. This demo covers things like:
- Authentication/Authorization with JWT
- Routing
- Communicating with a backend API
- Managing the state of the app with Vuex
- Uploading Images
- Forms Validation
- Handling errors
- Loading states
- More stuff

# Running the demo

1. Install and run [the backend project](https://github.com/TahaSh/vue-forum-app-backend)
2. Download this repo
3. Create `.env` in the root directory, and add:
```
VUE_APP_API_CLIENT='server'
VUE_APP_API_SERVER_BASE_URL='http://localhost:5000'
```
I'm here assuming that the backend will run on `localhost:5000`. If you set `VUE_APP_API_CLIENT` to `mock`, you'll use data from the mock store, which means you won't need the backend running.

5. Run `npm install`
6. Run `npm run serve`

To build it and run it in production mode:
1. Run `npm run build`
2. Run `npm run start`
