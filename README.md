# Gong Exercise - Employee Hierarchy Viewer

## Setup Instructions

1. Clone the repository
2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and update the following variable with the Firebase URL (just in case, I'm not exposing the URL directly in the code for security reasons):

   ```bash
   VITE_FIREBASE_BASE_URL=https://example_subdomain.firebaseio.com
   ```

4. Start the development server

   ```bash
   npm run dev
   ```

## Requirements

### Gong's Requirements

- Write a web application:
  - On visiting the application it opens a login page.
  - After successfully logging in, the application redirects to a user hierarchy page.
- For writing the application please create a new project using vite, the choice of framework is up to you. (React)
- Gong has provided a firebase database and an encode function.

#### The Application Database

- A firebase database has been set up containing all the data you should need to complete the exercise (just in case, I'm not exposing the URL directly in the code for security reasons).
- Use the encode function to get a secret to lookup a user.

#### The Login Page

- After submitting the login form the application should use the encode function included in this document to create a secret which can then be used to lookup the user in the database.
- The logged in user's name should be presented at the top right corner of the page along with a logout link that will sign the user out and redirect back to the login page.

#### The Hierarchy Tree Page

- The hierarchy tree of users is determined by the manager ID field of each user.
  - Users without a manager ID do not have a manager and should be considered managers themselves.
  - Users with a manager ID report to the user with the same ID.
  - The tree may have several roots, each user that does not have a manager is a root in the hierarchy.
  - A user can only report to a single manager, they do not have multiple managers.
- The page should show the complete hierarchy tree, regardless of the logged in user.
- Each user is presented with:
  - A badge showing the user's photo, if the user has a photo field, or the user's initials if a photo is not available.
  - User's full name.
  - User's email.
- Managers should have "+" sign to the left of their image. A user is considered a manager if there is at least one user that names them as his manager.
- Clicking on the "+" sign should toggle between collapsing and expanding the branches beneath the manager.
- Non-managers should display a "-" sign to the left of their image.

### Nikki's Requirements

- Upon landing on the app, if the user is not logged in, they should be redirected to the login page.
- Upon landing on the app, if the user is logged in, they should see the employee hierarchy page.
- If a photo link is broken, display the user’s initials instead.
- Fully responsive layout.
- When landing on a non-existent route, redirect to the root path.

#### Scalability, Performance, & Accessibility

- Keyboard navigable
  - No keyboard traps!
- Dynamic aria attributes for hierarchy accordions.
- Add a loading spinner while waiting for the API response.
- If a user does not have reports, do not render as an accordion.

- Recursively render hierarchy to handle any depth

- CSS variables for a "design system"

## Improvement Recommendations

- Allow retrieving single users by ID (requires database config change). Documentation: <https://firebase.google.com/docs/database/security/indexing-data>
- Move data fetching to server to not expose API information to client.
- Restrict user data to only what is necessary for the app (definitely not passwords).
- Error boundaries to catch rendering errors without crashing the app.
- Fine-tune screen reader experience for accordion trigger buttons.
- Aria-live regions for loading states and error messages.
- Implement dynamic icons for expand/collapse instead of static "+" signs (such as chevrons).
