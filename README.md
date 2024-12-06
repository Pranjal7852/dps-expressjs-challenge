# DPS Backend Coding Challenge Project

## Overview

This is a backend application developed for the Digital Product School (DPS) coding challenge. The project is a web application built with TypeScript and Express.js, focusing on project and report management with a SQLite database.

## Project Description

The application provides a RESTful API for managing company projects and their associated reports. Key features include:

-   CRUD operations for projects and reports
-   A special endpoint to retrieve reports with recurring words
-   hard coded authentication mechanism :-(
-   Health check endpoint

This project came with a custom database schema with projects and reports tables. What I found was there are no foreign key relationships defined between them, and id fields are stored as text rather than auto-incrementing integers. So I implemented these features to maintain the schema

1. Custom Relationship Handling - Due to the lack of foreign key constraints, a custom function was implemented to maintain the relationship between the projects and reports tables during data insertion.

2. ID Management - Id fields are stored as text. A custom script is used to fetch the last ID and auto-increment it by 1 for new entries and convert back it to string.
3. Schema Preservation - The existing database schema is kept intact to avoid altering the original structure while ensuring the project’s functionality.

## Prerequisites

-   Node.js (v14.x or later)
-   npm (v6.x or later)

## Technology Stack

-   TypeScript
-   Express.js
-   SQLite
-   Node.js
-   Swagger (API Documentation)

## Setup and Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

4. The application will be accessible at `http://localhost:3000`

## API Endpoints

### Health Check

-   `GET /ping`: Health check endpoint to verify server status

### Projects

-   `GET /project`: Retrieve all projects
-   `POST /project`: Create a new project
-   `GET /project/id/:id`: Get a specific project
-   `PATCH /project/:id`: Update a project feilds
-   `DELETE /project/:id`: Delete a project

### Reports

-   `GET /report`: Retrieve all reports
-   `POST /report`: Create a new report
-   `GET /report/id/:id`: Get a specific report
-   `PATCH /report/:id`: Update a report
-   `DELETE /report/:id`: Delete a report
-   `GET /report/project/:projectid`: Get all reports associated with the given project ID.

### Special Endpoint

-   `GET /report/repeated`: Retrieve reports with words appearing at least three times

## Authentication

authentication is implemented using a hardcoded token:

-   Token: `Password123`
-   Apply to all API routes

## Documentation and Testing

Comprehensive API documentation and endpoint testing are available through Swagger:

-   **Swagger Documentation**: [https://dps-expressjs-challenge.onrender.com/api-docs](https://dps-expressjs-challenge.onrender.com/api-docs)

**Note:** The documentation link may take a few moments to load as it is hosted on the free tier of Render.

## Deployment

The application is deployed on Render:

-   **Deployment URL**: [https://dps-expressjs-challenge.onrender.com](https://dps-expressjs-challenge.onrender.com)

**Note:** Initial loading might be slower due to the free tier hosting.

## Database

-   Database: SQLite
-   Location: `db/db.sqlite3`
-   Managed through `db.service.ts`

## Submission Details

-   Completed as part of the Digital Product School Backend Coding Challenge
-   Submission deadline: One week from challenge receipt

## Contact

Thank you for giving me the opportunity to work on this challenge! It was a great experience to enhance my skills and showcase my abilities in developing a backend REST API.

If you have any doubts or need further clarifications regarding the project, please feel free to ping me. I'm happy to assist and provide any additional information you may need.

Looking forward to hearing from you!

Best regards,
Pranjal Goyal
