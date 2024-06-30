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
 * /user/upload:
 *  post:
 *      summary: Upload the picture for the user
 *      description: If the user wants to upload a picture for the account
 *      tags:
 *          - User
 *      parameters:
 *          - in: header
 *            name: Authorization
 *            schema:
 *              type: string
 *            required: true
 *            description: Bearer token for user authentication
 *            example: "Bearer abcxyz123456"
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          file:
 *                              type: string
 *                              format: binary
 *                              description: The file to upload
 *      responses:
 *          200:
 *              description: Successfully uploaded the picture
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              url:
 *                                  type: string
 *                                  example: "url for displaying image"
 *          400:
 *              description: Bad request, invalid input
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  example: "Invalid file format"
 *          401:
 *              description: Unauthorized, invalid or missing token
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  example: "Unauthorized"
 *          500:
 *              description: Internal server error
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  example: "Something went wrong"
 */

/**
 * @swagger
 *  /user/avatar:
 *      get:
 *          tags:
 *              - User
 *          summary: user gets his avatar
 *          description: if the user wants to get his account's avatar so from this endpoint
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
 *                          example: {avatar: url for the image}
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: new name of the user
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
 * /user/resend-email-verification:
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
 *               email:
 *                 type: string
 *                 description: email of the user
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
 * /user/auth/google:
 *   get:
 *     tags:
 *       - User
 *     summary: Authorize
 *     description: Redirects the user to Google's OAuth2 consent screen to authorize the application.
 *     responses:
 *       "302":
 *         description: Redirect to Google's OAuth2 consent screen.
 */
/**
 * @swagger
 * /user/auth/facebook:
 *   get:
 *     tags:
 *       - User
 *     summary: Authorize
 *     description: Redirects the user to Facebook's OAuth2 consent screen to authorize the application.
 *     responses:
 *       "302":
 *         description: Redirect to Facebook's OAuth2 consent screen.
 */

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback.
 *     description: This endpoint is called by Google after the user has authenticated. It handles the result and redirects accordingly.
 *     tags:
 *       - User
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
 *       - User
 *     summary: Authorize
 *     description: Redirects the user to Facebook's OAuth2 consent screen to authorize the application.
 *     responses:
 *       "302":
 *         description: Redirect to Facebook's OAuth2 consent screen.
 */
