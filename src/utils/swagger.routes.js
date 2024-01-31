/**
 * @swagger
 *  /user:
 *      post:
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
 *                          type: string
 *                          example: check your email to verify your account
 */
/**
 * @swagger
 * /verify/{token}:
 *  get:
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
