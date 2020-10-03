# PWSched

This app is being built to provide an easy means of scheduling public witnessing activities. Volunteers create an account and are associated with only their congregation. The app is designed to make it easy for volunteers to request shifts.
1. Service Overseers or other admins create a shift
2. Volunteers request the shifts they would like
3. Admin assigns shifts as appropriate and volunteers are notified via email.

This app is currently in development, and is being refactored from a full-stack Ruby on Rails app (found at https://github.com/dvfleet413/PWSched) during the COVID-19 pandemic, while ther's no need for it in production!  The refactored app will be written with a much cleaner, more scalable, more performant codebase.

## Technologies Used

- For the backend  
  - Flask
  - MongoDB
- For the frontend
  - React
  - Redux
- Containerized with Docker

## Installing

First, fork and Clone this repo.  
Next, the easiest way to get up and running is with Docker

- Make sure you have [Docker](https://www.docker.com/get-started) installed  
- run `$ docker-compose up` in the project directory.  This creates a Docker image form both the frontend and the backend, and exposes the expected ports locally (5000 for the Flask backend, 3000 for the React frontend)

If you prefer not to use Docker, you can still run the frontend and backend separately.

- Backend  
  - In `./backend` perform the following steps: 
    - If you so desire (recommended), set up a virtual environment with `$ python3 -m venv venv`
    - Start your newly created virtual env with `$ . venv/bin/activate`
    - `$ pip install -r requirements.txt`
    - `$ flask run`
  - You now can navigate to `localhost:5000` to see the Flask app
- Frontend
  - In `./frontend` perform the following steps:
    - `$ npm install` (may take a minute to install all dependencies)
    - `$ npm start` to run the project
  - You can now navigate to `localhost:3000` to see the frontend

## Tests

Tests for the Flask backend can be found in `.backend//Tests`  
Test suite is written with `pytest` and can be run using `$ pytest` in backend directory.

To view test coverage:  
- `$ coverage run -m pytest`
- `$ coverage report`

## Documentation

Swagger docs can be found by installing and running the app, then navigating to `/api/docs`.  All endpoints should be documented.
Or you can view the static swagger docs at `./static/json`

## Contributing

Contributions are always welcome.  Please check for any open issues when submitting PRs.  If you find a bug or have a feature request please submit it as a new issue. Please check for any open issues when submitting PRs.  If you find a bug or have a feature request please submit it as a new issue. Please also include tests an documentation as appropriate.