/**
 * @swagger
 *  /user:
 *      post:
 *          tags:
 *              - User
 *          summary: create a new user
 *          description: signup for the user for the first time
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Register"
 *          responses:
 *              "201":
 *                 description: create user in database with not verified
 *                 content:
 *                      application/json:
 *                         schema:
 *                          type: objtct
 *                          example: {message: User created successfully. Check your email for verification.}
 */
/**
 * @swagger
 * /user/verify/{token}:
 *  get:
 *      tags:
 *              - User
 *      summary: verify email of the user
 *      description: we want to check if the user's email is true or not
 *      responses:
 *          "200":
 *              description: response of the verified email
 *              content:
 *                  application/json:
 *                      type: string
 *                      example: user email has been verified
 */

/**
 * @swagger
 *  /user/login:
 *      post:
 *          tags:
 *              - User
 *          summary: login for user
 *          description: login for user to the website
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Login"
 *          responses:
 *              "200":
 *                 description: response of login
 *                 content:
 *                      application/json:
 *                         schema:
 *                          $ref: '#/components/schemas/User'
 */
/**
 * @swagger
 *  /user/forget-password:
 *      post:
 *          tags:
 *              - User
 *          summary: login for user
 *          description: login for user to the website
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              email: user@example.com
 *          responses:
 *              "200":
 *                 description: response of login
 *                 content:
 *                      application/json:
 *                         schema:
 *                          type: string
 *                          example: email has been sent to your email, check your email to reset your password
 *
 */
/**
 * @swagger
 *  /user/reset-password/{token}:
 *      post:
 *          tags:
 *              - User
 *          summary: login for user
 *          description: login for user to the website
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              password: mmm123!
 *          responses:
 *              "200":
 *                 description: response of password
 *                 content:
 *                      application/json:
 *                         schema:
 *                          type: string
 *                          example: password has been updated
 */
/**
 * @swagger
 *  /user/delete:
 *      delete:
 *          tags:
 *              - User
 *          summary: delete the user account
 *          description: if the user wants to delete his account from this endpoint
 *          parameters:
 *                - in: header
 *                  name: Authorization
 *                  schema:
 *                   type: string
 *                  required: true
 *                  description: Bearer token for user authentication
 *                  example: "Bearer abcxyz123456"
 *          responses:
 *              "200":
 *                 description: response of deleting user
 *                 content:
 *                      application/json:
 *                         schema:
 *                          type: string
 *                          example: the user has been deleted
 */
/**
 * @swagger
 * /upload:
 *  post:
 *      tags:
 *              - User
 *      summary: upload the picture for the user
 *      descripition: if the user wants to upload a picture for the account
 *      parameters:
 *                - in: header
 *                  name: Authorization
 *                  schema:
 *                   type: string
 *                  required: true
 *                  description: Bearer token for user authentication
 *                  example: "Bearer abcxyz123456"
 *      requestFile:
 *
 *
 */
/**
 * @swagger
 *  /user/me:
 *      get:
 *          tags:
 *              - User
 *          summary: get user information from database
 *          description: get user information
 *          parameters:
 *                - in: header
 *                  name: Authorization
 *                  schema:
 *                   type: string
 *                  required: true
 *                  description: Bearer token for user authentication
 *                  example: "Bearer abcxyz123456"
 *          responses:
 *              "200":
 *                 description: response of login
 *                 content:
 *                      application/json:
 *                         schema:
 *                          $ref: '#/components/schemas/Me'
 */
/**
 * @swagger
 *  /user/logout-user:
 *      get:
 *          tags:
 *              - User
 *          summary: logout the user from the account
 *          description: logout the user and delete his token from database
 *          parameters:
 *                - in: header
 *                  name: Authorization
 *                  schema:
 *                   type: string
 *                  required: true
 *                  description: Bearer token for user authentication
 *                  example: "Bearer abcxyz123456"
 *          responses:
 *              "200":
 *                 description: response of deleting user
 *                 content:
 *                      application/json:
 *                         schema:
 *                          type: object
 *                          example:
 *                              {message: you logged out}
 */
/**
 * @swagger
 *  /user/update-password:
 *      post:
 *          tags:
 *              - User
 *          summary: update password of the user account
 *          description: if the user wants to update his account password. old password must be correct to update and create the new password
 *          parameters:
 *                - in: header
 *                  name: Authorization
 *                  schema:
 *                   type: string
 *                  required: true
 *                  description: Bearer token for user authentication
 *                  example: "Bearer abcxyz123456"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              oldPassword: aaa123!
 *                              newPassword: mmm123!
 *          responses:
 *              "200":
 *                 description: updating user in database and sending the response
 *                 content:
 *                      application/json:
 *                         schema:
 *                          type: object
 *                          example:
 *                              {message: password has been updated}
 */
/**
 * @swagger
 *  /user/update-email:
 *      post:
 *          tags:
 *              - User
 *          summary: update the user email
 *          description: if the user wants to update his account email
 *          parameters:
 *                - in: header
 *                  name: Authorization
 *                  schema:
 *                   type: string
 *                  required: true
 *                  description: Bearer token for user authentication
 *                  example: "Bearer abcxyz123456"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              email: user@example.com
 *
 *          responses:
 *              "200":
 *                 description: response of deleting user
 *                 content:
 *                      application/json:
 *                         schema:
 *                          type: object
 *                          example:
 *                              {message: email has been sent to you, please verify your new email }
 */
/**
 * @swagger
 * /user/verify-new-email/{token}:
 *  get:
 *      tags:
 *              - User
 *      summary: verify new email of the user
 *      description: we want to check if the user's email is true or not
 *      responses:
 *          "200":
 *              description: response of the verified email
 *              content:
 *                  application/json:
 *                      type: object
 *                      example: {message: email has been updated}
 *          "400":
 *              description: if the token expired or the token isn't true
 *              content:
 *                  application/json:
 *                      type: object
 *                      example: {error: the token has been expired}
 */
/**
 * @swagger
 *  /user/delete:
 *      delete:
 *          summary: delete the user account
 *          description: if the user wants to delete his account from this endpoint
 *          parameters:
 *                - in: header
 *                  name: Authorization
 *                  schema:
 *                   type: string
 *                  required: true
 *                  description: Bearer token for user authentication
 *                  example: "Bearer abcxyz123456"
 *          responses:
 *              "200":
 *                 description: response of deleting user
 *                 content:
 *                      application/json:
 *                         schema:
 *                          type: string
 *                          example: the user has been deleted
 */
/**
 * @swagger
 * /upload:
 *  post:
 *      summary: upload the picture for the user
 *      descripition: if the user wants to upload a picture for the account
 *      parameters:
 *                - in: header
 *                  name: Authorization
 *                  schema:
 *                   type: string
 *                  required: true
 *                  description: Bearer token for user authentication
 *                  example: "Bearer abcxyz123456"
 *      requestFile:
 *
 *
 */
/**
 * @swagger
 * /user/update-username:
 *   put:
 *     summary: Update a user
 *     parameters:
 *           - in: header
 *             name: Authorization
 *             schema:
 *             type: string
 *             required: true
 *             description: access token for update-user
 *             example: "Bearer abcxyz123456"
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Successfully updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Me/properties/user'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
/**
 * @swagger
 *  /user/refresh-token:
 *      get:
 *          tags:
 *              - User
 *          summary: Refresh user access token
 *          description: Use a refresh token to get a new access token.
 *          parameters:
 *            - in: header
 *              name: Authorization
 *              schema:
 *                type: string
 *              required: true
 *              description: The user's refresh token.
 *              example: Bearer abcxyz123456
 *          responses:
 *              "200":
 *                 description: New access token generated successfully.
 *                 content:
 *                      application/json:
 *                         schema:
 *                          type: object
 *                          properties:
 *                              accessToken:
 *                                  type: string
 *                                  description: The new access token.
 *                          example:
 *                              accessToken: "new_access_token_here"
 *              "401":
 *                 description: Invalid or expired refresh token.
 *                 content:
 *                      application/json:
 *                         schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  description: Error message.
 *                          example:
 *                              error: "Invalid refresh token"
 */
/**
 * @swagger
 * /resend-email-verification:
 *   post:
 *     tags:
 *       - User
 *     summary: Resend email verification
 *     description: Resend email verification to the user with the provided ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The unique identifier of the user to whom the verification email will be resent.
 *             required:
 *               - id
 *     responses:
 *       '200':
 *         description: Email verification resent successfully.
 *       '400':
 *         description: Bad request. Invalid ID format provided.
 *       '404':
 *         description: User not found. The provided ID does not correspond to any user.
 *       '500':
 *         description: Internal server error. Failed to resend email verification.
 */

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback.
 *     description: This endpoint is called by Google after the user has authenticated. It handles the result and redirects accordingly.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Authorization code returned by Google after user grants permission.
 *         example: "4/0AY0e-g6Mk2sAGe9hIsgB9xWQfK9pRQksdjhFoD63cWj"
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         required: false
 *         description: An optional state parameter to maintain state between the request and callback.
 *         example: "xyz"
 *     responses:
 *       302:
 *         description: Redirects based on authentication outcome.
 *         headers:
 *           Location:
 *             description: The URL to redirect the user to after handling the callback.
 *             schema:
 *               type: string
 *             examples:
 *               success:
 *                 summary: Successful authentication
 *                 value: "/user/welcome"
 *               failure:
 *                 summary: Authentication failed
 *                 value: "/"
 *       400:
 *         description: Bad request. Missing or invalid parameters.
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid request. Missing authorization code."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */

/**
 * @swagger
 * /user/auth/facebook:
 *   get:
 *     tags:
 *       - OAuth2
 *     summary: Authorize
 *     description: Redirects the user to Facebook's OAuth2 consent screen to authorize the application.
 *     responses:
 *       "302":
 *         description: Redirect to Facebook's OAuth2 consent screen.
 */
/**
 * @swagger
 * /user/pages/delete:
 *   delete:
 *     summary: Delete all user pages
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           required: true
 *           description: Access token for authorization
 *           example: "Bearer abcxyz123456"
 *     responses:
 *       '200':
 *         description: User's pages deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User's pages deleted successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /admin-users:
 *   get:
 *     summary: Retrieve a list of users, filtered by their roles.
 *     description: This endpoint fetches all users from the database and returns them sorted by their roles. Premium users are listed first, followed by admin users, and then other users.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           required: true
 *           description: Bearer token for accessing admin routes.
 *           example: "Bearer abcxyz123456"
 *       - in: query
 *         name: role
 *         schema:
 *              type: string
 *              require: true
 *              description: filter users based on their role
 *              example: role=user|admin|super-admin|premium
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the user.
 *                     example: "60d0fe4f5311236168a109ca"
 *                   name:
 *                     type: string
 *                     description: The name of the user.
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     description: The email address of the user.
 *                     example: "john.doe@example.com"
 *                   createdAt:
 *                     type: date
 *                     description: The date of creation email.
 *                     example: 2024-02-23T20:06:41.437Z
 *                   updatedAt:
 *                     type: string
 *                     description: The date of updating email.
 *                     example: "2024-02-23T20:06:41.437Z"
 *                   status:
 *                     type: string
 *                     description: the status of the user.
 *                     example: 'blocked'
 *                   role:
 *                     type: string
 *                     description: The role of the user (e.g., admin, premium, user).
 *                     example: "user"
 *       401:
 *         description: Unauthorized access. Authentication is required.
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       403:
 *         description: Forbidden. The user does not have the necessary permissions.
 *         content:
 *           application/json:
 *             example:
 *               error: "Forbidden"
 *       500:
 *         description: Internal server error. Something went wrong on the server.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
/**
 * @swagger
 * /message/admin:
 *   get:
 *     summary: Retrieve a list of messages, sorted by their dates by latest.
 *     description: This endpoint fetches all users from the database and returns them sorted by their roles. Premium users are listed first, followed by admin users, and then other users.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           required: true
 *           description: Bearer token for accessing admin routes.
 *           example: "Bearer abcxyz123456"
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the user.
 *                     example: "60d0fe4f5311236168a109ca"
 *                   name:
 *                     type: string
 *                     description: The name of the user.
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     description: The email address of the user.
 *                     example: "john.doe@example.com"
 *                   Message:
 *                     type: string
 *                     description: The date of creation email.
 *                     example: 2024-02-23T20:06:41.437Z
 *                   createdAt:
 *                     type: string
 *                     description: The date of updating email.
 *                     example: "2024-02-23T20:06:41.437Z"
 *       401:
 *         description: Unauthorized access. Authentication is required.
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       403:
 *         description: Forbidden. The user does not have the necessary permissions.
 *         content:
 *           application/json:
 *             example:
 *               error: "Forbidden"
 *       500:
 *         description: Internal server error. Something went wrong on the server.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

/**
 * @swagger
 * /admin-new-user:
 *   post:
 *     summary: Create a new user.
 *     description: This endpoint allows an admin to create a new user. The user is automatically marked as verified upon creation.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           required: true
 *           description: Bearer token for accessing admin routes.
 *           example: "Bearer abcxyz123456"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *                 example: "jane.doe@example.com"
 *               password:
 *                 type: string
 *                 description: The password for the user.
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 description: The role assigned to the user (e.g., user, admin, premium).
 *                 example: "user"
 *     responses:
 *       201:
 *         description: User successfully created.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              example:
 *                  { message: user has been added successfully}
 *       400:
 *         description: Bad request. Invalid input.
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid user data"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

/**
 * @swagger
 * /page/{pageId}:
 *   get:
 *     summary: Retrieve a specific page by its ID.
 *     description: This endpoint allows an admin to retrieve a page's details by its ID. The page can only be accessed if the owner is an admin.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pageId
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the page.
 *         example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: Successfully retrieved the page.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the page.
 *                   example: "60d0fe4f5311236168a109cb"
 *                 title:
 *                   type: string
 *                   description: The title of the page.
 *                   example: "Page Title"
 *                 content:
 *                   type: string
 *                   description: The content of the page.
 *                   example: "This is the content of the page."
 *                 owner:
 *                   type: string
 *                   description: The ID of the user who owns the page.
 *                   example: "60d0fe4f5311236168a109ca"
 *       404:
 *         description: User or page not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "User not found"
 *       403:
 *         description: Unauthorized access. The user is not an admin.
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized access"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Server Error"
 */

/**
 * @swagger
 * /block/{userId}:
 *   put:
 *     summary: Block a user by their ID.
 *     description: This endpoint allows an admin to block a user by setting their `blocked` status to true.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the user to be blocked.
 *         example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: User blocked successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "User blocked successfully"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "User not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

/**
 * @swagger
 * /send-alert/{userId}:
 *   post:
 *     summary: Send an alert to a user.
 *     description: This endpoint allows an admin to send an alert to a user identified by their userId.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the user to whom the alert will be sent.
 *         example: "60d0fe4f5311236168a109ca"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alertMessage:
 *                 type: string
 *                 description: The alert message to be sent to the user.
 *                 example: "This is an important alert."
 *     responses:
 *       200:
 *         description: Alert sent to user.
 *         content:
 *           application/json:
 *             example:
 *               message: "Alert sent to user"
 *       403:
 *         description: Unauthorized access. The user is not an admin.
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

/**
 * @swagger
 * /plan/new:
 *   post:
 *     summary: Create a new subscription plan.
 *     description: This endpoint allows an admin to create a new subscription plan.
 *     tags:
 *       - Subscription Plans
 *     parameters:
 *       - in: headers
 *         name: Authorization
 *         schema:
 *           type: string
 *           required: true
 *           description: user's token.
 *           example: Bearer abcxyz1223
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the subscription plan.
 *                 example: "Premium Plan"
 *               price:
 *                 type: number
 *                 description: The price of the subscription plan.
 *                 example: 29.99
 *               description:
 *                 type: string
 *                 description: A brief description of the subscription plan.
 *                 example: "Access to premium features and content."
 *     responses:
 *       201:
 *         description: Subscription plan created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the plan.
 *                   example: "60d0fe4f5311236168a109ca"
 *                 name:
 *                   type: string
 *                   description: The name of the plan.
 *                   example: "Premium Plan"
 *                 price:
 *                   type: number
 *                   description: The price of the plan.
 *                   example: 29.99
 *                 description:
 *                   type: string
 *                   description: A brief description of the plan.
 *                   example: "Access to premium features and content."
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the plan was created.
 *                   example: "2023-06-12T18:30:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the plan was last updated.
 *                   example: "2023-06-12T18:30:00Z"
 *       400:
 *         description: Invalid request data.
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: Plan price is required."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */

/**
 * @swagger
 * /plan:
 *   get:
 *     summary: Get all subscription plans.
 *     description: Retrieve a list of all available subscription plans.
 *     tags:
 *       - Subscription Plans
 *     responses:
 *       200:
 *         description: A list of subscription plans.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the plan.
 *                     example: "60d0fe4f5311236168a109ca"
 *                   name:
 *                     type: string
 *                     description: The name of the plan.
 *                     example: "Premium Plan"
 *                   price:
 *                     type: number
 *                     description: The price of the plan.
 *                     example: 29.99
 *                   description:
 *                     type: string
 *                     description: A brief description of the plan.
 *                     example: "Access to premium features and content."
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the plan was created.
 *                     example: "2023-06-12T18:30:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the plan was last updated.
 *                     example: "2023-06-12T18:30:00Z"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */

/**
 * @swagger
 * /plan/{id}:
 *   patch:
 *     summary: Update a subscription plan by its ID.
 *     description: This endpoint allows an admin to update details of an existing subscription plan.
 *     tags:
 *       - Subscription Plans
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: headers
 *         name: Authorization
 *         schema:
 *           type: string
 *           required: true
 *           description: user's token.
 *           example: Bearer abcxyz1223
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the subscription plan to update.
 *         example: "60d0fe4f5311236168a109ca"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the subscription plan.
 *                 example: "Standard Plan"
 *               price:
 *                 type: number
 *                 description: The new price of the subscription plan.
 *                 example: 19.99
 *               description:
 *                 type: string
 *                 description: The new description of the subscription plan.
 *                 example: "Access to standard features and content."
 *     responses:
 *       200:
 *         description: Subscription plan updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the updated plan.
 *                   example: "60d0fe4f5311236168a109ca"
 *                 name:
 *                   type: string
 *                   description: The updated name of the plan.
 *                   example: "Standard Plan"
 *                 price:
 *                   type: number
 *                   description: The updated price of the plan.
 *                   example: 19.99
 *                 description:
 *                   type: string
 *                   description: The updated description of the plan.
 *                   example: "Access to standard features and content."
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the plan was created.
 *                   example: "2023-06-12T18:30:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the plan was last updated.
 *                   example: "2023-06-12T18:30:00Z"
 *       400:
 *         description: Invalid request data.
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: Invalid price."
 *       404:
 *         description: Subscription plan not found.
 *         content:
 *           application/json:
 *             example:
 *               message: "Plan not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */

/**
 * @swagger
 * /plan/{id}:
 *   delete:
 *     summary: Delete a subscription plan by its ID.
 *     description: This endpoint allows an admin to delete a subscription plan by its ID.
 *     tags:
 *       - Subscription Plans
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: headers
 *         name: Authorization
 *         schema:
 *           type: string
 *           required: true
 *           description: user's token.
 *           example: Bearer abcxyz1223
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the subscription plan to delete.
 *         example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: Subscription plan deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Subscription plan deleted"
 *       404:
 *         description: Subscription plan not found.
 *         content:
 *           application/json:
 *             example:
 *               message: "Plan not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
