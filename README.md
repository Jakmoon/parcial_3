# Doctor-Patient Appointment API

## Overview
A REST API for managing doctor-patient appointments. Features secure JWT-based authentication, role-based access, and input validation.

## Features
- **Doctor Login**: Authenticate and receive a JWT (1-hour validity).
- **Appointments**:
  - View, create, update, and delete doctor appointments.
  - Fetch patient-specific appointments.
- **Validation**: `express-validator` ensures valid inputs.
- **Security**: JWT protects endpoints.

## Setup
1. Clone the repository.
2. Add a `.env` file with:

DB_HOST=db DB_PORT=5432 DB_USER=myuser DB_PASSWORD=mypassword DB_NAME=mydatabase JWT_SECRET=myjwtsecret

3. Run:
docker-compose up --build


API runs at http://localhost:3000