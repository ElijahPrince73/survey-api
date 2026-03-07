# survey-api

## API Routes Documentation

### Authentication Routes (`/api/authentication`)

#### 1. User Sign Up
- **Endpoint:** `POST /api/authentication/signup`
- **Middleware:** None
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "passwordConfirm": "string",
    "role": "user|admin"
  }
  ```
- **Response:** `201 Created`
  - Returns JWT token in response body and httpOnly cookie
  - User object (password excluded)
- **Controller:** `signUp` in `authController.ts`

#### 2. User Login
- **Endpoint:** `POST /api/authentication/login`
- **Middleware:** None
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:** `200 OK`
  - Returns JWT token in response body and httpOnly cookie
  - User object (password excluded)
- **Controller:** `login` in `authController.ts`

---

### Survey Routes (`/api/surveys`)

#### 1. Create Survey Template
- **Endpoint:** `POST /api/surveys/`
- **Middleware:** 
  - `protect` - Requires valid JWT token
  - `restrictTo('admin')` - Only admin users can access
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "questions": "array",
    "isActive": "boolean"
  }
  ```
- **Response:** `201 Created`
  - Returns newly created survey template
  - Automatically deactivates any previously active survey
- **Controller:** `createSurveyTemplate` in `surveyTemplateController.ts`

#### 2. Activate Survey
- **Endpoint:** `POST /api/surveys/:surveyId/activate`
- **Middleware:** 
  - `protect` - Requires valid JWT token
  - `restrictTo('admin')` - Only admin users can access
- **URL Parameters:**
  - `surveyId` - MongoDB ObjectId of the survey to activate
- **Response:** `201 Created`
  - Returns the activated survey template
  - Automatically deactivates any previously active survey
- **Controller:** `activateSurvey` in `surveyTemplateController.ts`

#### 3. Get Active Survey
- **Endpoint:** `GET /api/surveys/active`
- **Middleware:** 
  - `protect` - Requires valid JWT token
- **Response:** `200 OK` (or `201 Created` as per current code)
  - Returns the currently active survey template
  - Returns `null` if no survey is active
- **Controller:** `getActveSurvey` in `surveyTemplateController.ts`

---

### Survey Responses Routes (`/api/surveys/:surveyId/responses`)

#### 1. Submit Survey Response
- **Endpoint:** `POST /api/surveys/:surveyId/responses`
- **Middleware:** 
  - `protect` - Requires valid JWT token
- **URL Parameters:**
  - `surveyId` - MongoDB ObjectId of the survey
- **Request Body:**
  ```json
  {
    "answers": "array"
  }
  ```
- **Response:** `201 Created`
  - Returns newly created survey response
  - Prevents duplicate submissions from the same user
- **Controller:** `createSurveyResponse` in `surveyResponsesController.ts`
- **Error Handling:**
  - Returns 400 if user has already submitted a response for this survey

#### 2. Get Survey Responses
- **Endpoint:** `GET /api/surveys/:surveyId/responses`
- **Middleware:** 
  - `protect` - Requires valid JWT token
  - `restrictTo('admin')` - Only admin users can access
- **Response:** `200 OK`
  - Returns array of all survey responses
  - Includes result count
- **Controller:** `getSurveyResponses` in `surveyResponsesController.ts`

---

## Middleware Documentation

### `protect` Middleware
- Located in: `authController.ts`
- **Purpose:** Validates JWT token from Authorization header
- **Token Format:** `Authorization: Bearer <token>`
- **Behavior:**
  - Extracts token from `Authorization` header
  - Verifies token signature using `JWT_SECRET`
  - Handles token expiration with appropriate error message
  - Attaches user object to `req.user` if token is valid
  - Returns 401 errors for missing or invalid tokens

### `restrictTo(...roles)` Middleware
- Located in: `authController.ts`
- **Purpose:** Restricts route access to specific user roles
- **Parameters:** Variable number of role strings (e.g., `'admin'`, `'user'`)
- **Behavior:**
  - Checks if `req.user.role` is included in allowed roles
  - Returns 403 Forbidden if user role is not authorized
  - Must be used after `protect` middleware

---

## Unused Code

### Unmounted Route File
- **File:** `routes/userRoutes.ts`
- **Status:** Defined but NOT mounted in `app.ts`
- **Routes:** 
  - `POST /signup`
  - `POST /login`
  - `GET /all` (protected + restricted to 'user' and 'admin' roles)
- **Note:** These routes are duplicates of authentication routes; consider removing or mounting properly

### Unused Controller Function
- **Function:** `getAllActiveSurveyTempalates` in `surveyTemplateController.ts`
- **Status:** Exported but not used in any route
- **Purpose:** Retrieves all survey templates (ignores `isActive` filter)
- **Response:** `201 Created` with array of all survey templates
- **Suggested Route:** Could be added as `GET /api/surveys` with admin restriction

---

## Environment Variables Required

- `JWT_SECRET` - Secret key for signing JWT tokens
- `JWT_EXPIRES_IN` - Token expiration time (e.g., '24h')
- `NODE_ENV` - Environment ('development' or 'production')
  - Affects HTTPS requirement for secure cookies