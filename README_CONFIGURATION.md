### Configuration
In its current state, the API supports the following env vars:

#### 💫 Required for production usage
- `API_HOST_BASE_URL`: The base url of the api to be used for e.g. HATEOS links. 
  - Example: http://api.example.com
  - Default: http://localhost:5001
- `NODE_ENV`: Indicates the environment: production, or development.
  - Default: **development**

#### 👩‍💻 Required, if used with a frontend application
- `API_FRONTEND_HOST_BASE_URL`: The base url of the frontend application to be used for e.g. cookies. 
  - Example: https://www.example.com
  - Default: http://localhost:8080
- `API_FRONTEND_COOKIE_PREFIX`: The prefix for cookie names. 
  - Default: **api**
