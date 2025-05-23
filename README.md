# GitHub repository search application

This is a test task for FullStack Developer position.

Table of contents:
1. [Task description](#task-description)
    - [Intro](#intro)
    - [Task description](#the-task)
    - [Frontend Requirements](#frontend-requirements)
    - [Backend Requirements](#backend-requirements)
    - [Criteria](#criteria)
    - [How to submit your work](#how-to-submit-your-work)
2. [Solution description](#solution-description)
    - [Stack Used](#-stack-used)
    - [Key Features](#-key-features)
        - [Frontend](#frontend)
        - [Backend](#backend)
    - [Running Locally](#running-locally)


## Task description
### Intro
Build a GitHub repository search application

This case study aims to assess how you approach a problem starting from the high level solution to the low level implementation details and code quality. You will not be penalized for asking questions, so don't hesitate to ask us if you need any clarification.

### The Task

You are required to build a fullstack single page application built with
- React.js
- Django DRF
- REDIS
- Vanilla CSS, Sass, Styled Components or any other CSS-in-JS but no frameworks allowed
- Optional: TypeScript
- Optional: Redux and redux-persist
- Optional: React Router

### Frontend Requirements
There will be two input fields, on search field for the user to type the text and a dropdown where user can either pick "User" or "Repository" to define the entities that they want to search. When the user doesn't have any input or clears the input, the input fields should be shown in the middle of the page.

When the user starts typing into the input, make an Backend API call to fetch the results and display them in the form of grid below it. The data should be cached and no more API calls should be made if we already have the results for the search term.

Here are some of the items that you should take care of
- Add debounce (feel free to import from lodash). Make the API calls only if the user has typed 3 or more characters.
- If the user changes the "Entity type" value in the dropdown and user has 3 or more characters in the input already, it should refresh the results.
- If the user clears the input or types less than three characters, clear the results and show the empty screen.

For each repository display the repository user details returned from API and the repository name, author, stars and other statistics below it. For the users, show the profile picture, name, location, any other data you have and link to their profile.

On smaller screens (width <= 768px), the grid will be 2 columns and it could look like below:

Consider all the states: initial, loading, error,... and inform the user about it.

### Backend Requirements
Write a "Search" Backend API endpoint which eventually collects the data from Github & stores it in REDIS.

Create two API Endpoints:
1. "/api/search"
    - Receives a POST request with search type(users or repositories or issues) & search text(mandatory).
    - The results will be fetched from the GitHub API & cache it for atleast 2 hours.
    - [GitHub Search API Docs](https://docs.github.com/en/rest/search?apiVersion=2022-11-28)
2. "/api/clear-cache" : Clear Backend Caching

Here are some of the items that you should take care of
- Add Caching so that the same request is not called again.
- Write unit tests for the backend code
- Optional Bonus: 
    - Write Swagger documentation with clear description, request, response & example for the endpoints
    - Deploy it anywhere and share the URL

### Criteria
Your work will be evaluated primarily on:
- Cleanliness of the code
- Use of modern ES6+ syntax, async/await, elegant & readable code
- All the edge cases have been handled
- README.md file explaining your high level solution and any decisions you made and the reasons behind them

### How to submit your work

Create a public repo on GitHub and push your code on it then share the link back with the team.

## Solution description

This solution implements a fullstack GitHub repository search application using **React.js**, **Django REST Framework**, **Redis**, and **Docker**. It fulfills all the requirements outlined in the task description, with several enhancements for performance, usability, and maintainability.

### Stack Used

- **Frontend**:
  - React.js with TypeScript
  - Sass for styling
  - Redux with redux-persist for global state management and caching
  - `lodash.debounce` for input debouncing

- **Backend**:
  - Django with Django REST Framework
  - Redis for caching GitHub API results
  - `requests` for consuming GitHub’s public API
  - DRF-Spectacular for Swagger documentation
  - Unit tests with `Pytest`

- **DevOps**:
  - Docker and docker-compose for isolated development and deployment
  - Nginx to serve frontend

### Key Features

#### Frontend
- **Responsive UI** with a clean and centered initial state
- **Debounced search input** (minimum 3 characters) to avoid excessive backend calls
- **Cached results** in Redux (persisted) to avoid unnecessary requests
- **User feedback** for all application states: initial, loading, error, empty

#### Backend
- **Two API endpoints**:
  - `POST /api/search/`: Accepts `search_type` and `search_text` and returns cached or fresh data from GitHub
  - `POST /api/clear-cache/`: Clears Redis cache manually
- **Caching logic**:
  - Results are cached using Redis with a TTL of **2 hours**
  - Cached key is based on a combination of `search_type` and `search_text`
- **Error handling** for failed GitHub requests or malformed input
- **Swagger documentation** available at `/api/docs/`
- **Unit tests** for search logic

### Running Locally

1. Clone the repository
2. Add a `.env` file in both `frontend/` and `backend/` directories with necessary configuration
3. Start the project with:

```bash
docker-compose up --build
