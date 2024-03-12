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
 * /user/auth/google:
 *   get:
 *     tags:
 *       - OAuth2
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
