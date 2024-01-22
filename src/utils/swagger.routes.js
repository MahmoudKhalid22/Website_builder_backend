/**
 * @swagger
 *  components:
 *   schemas:
 *      User:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: the name of the user
 *              email:
 *                  type: string
 *                  description: the email of the user must be the valid and true email
 *              password:
 *                  type: string
 *                  description: the password of the user the minimum characters must be 6
 *              verified:
 *                  type: boolean
 *                  description: the email of the user is true or not
 *              tokens:
 *                  type: array
 *                  description: tokens of the user
 *      Register:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: the name of the user
 *              email:
 *                  type: string
 *                  description: the email of the user must be the valid and true email
 *              password:
 *                  type: string
 *                  description: the password of the user the minimum characters must be 6
 *      Login:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: the email of the user that he registered
 *              password:
 *                  type: string
 *                  description: the password of the user
 */
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
