# Car Wash Booking System

This is a Node.js application built with Express.js, MongoDB (using Mongoose), and TypeScript also use ZOD for validaton.

## Project Overview

The Car Wash Booking System is designed to streamline the process of booking car wash services. It provides users with an easy way to book services, view available slots, and manage their bookings. The system also allows administrators to manage services, slots, and view all bookings.

### Features

- User authentication and authorization
- Role-based access control (admin and user)
- Booking creation, retrieval, and management
- Service and slot management
- Real-time slot availability check
- Secure password hashing

## Live URL

ou can access the live version of the application [here](https://car-washing-system-server-rakib.vercel.app/).

## Models

### User Model

- **name**: Full name of the user.
- **email**: Email address used for communication and login.
- **password**: Securely hashed password for authentication.
- **phone**: Contact phone number for notifications and updates.
- **role**: The role of the user, which can be one of the following: `admin`, `user`.
- **address**: Complete physical address for service delivery or correspondence.

### Service Model

- **name**: Title of the service.
- **description**: Brief description of what the service entails.
- **price**: Cost of the service in the local currency.
- **duration**: Duration of the service in minutes.
- **isDeleted**: Indicates whether the service is marked as deleted (false means it is not deleted).

### Slot Model

- **service**: Reference to the specific service being booked.
- **date**: Date of the booking.
- **startTime**: Start time of the slot.
- **endTime**: Approximate end time of the slot.
- **isBooked**: Status of the slot (available, booked, canceled).

### Booking Model

- **customer**: Reference to the user who made the booking.
- **service**: Reference to the booked service.
- **slot**: Reference to the booking slot.
- **vehicleType**: Type of the vehicle (enum: `car`, `truck`, `SUV`, `van`, `motorcycle`, `bus`, `electricVehicle`, `hybridVehicle`, `bicycle`, `tractor`).
- **vehicleBrand**: Brand or manufacturer of the vehicle.
- **vehicleModel**: Model or variant of the vehicle.
- **manufacturingYear**: Manufacturing year of the vehicle.
- **registrationPlate**: Unique registration number assigned to the vehicle.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/iamRazzakk/Car-washing-system-server

   cd Car-washing-system-server
   ```

## Install Dependencies

### Install the necessary dependencies using npm or yarn:

```bash
npm install
```

### Start in Development Mode

This command runs the application with ts-node-dev, which automatically restarts the server on file changes.

```bash
npm run start:dev
```

### Lint the Code

To check the code for potential errors and style issues, run:

```bash
npm run lint
```
