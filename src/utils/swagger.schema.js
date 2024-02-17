/**
 * @swagger
 *  components:
 *   schemas:
 *      user:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: the unique id for the user
 *              name:
 *                  type: string
 *                  description: the name of the user
 *              email:
 *                  type: string
 *                  description: the email of the user must be the valid and true email   
 *      User:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: the unique id for the user
 *              name:
 *                  type: string
 *                  description: the name of the user
 *              email:
 *                  type: string
 *                  description: the email of the user must be the valid and true email
 *              accessToken:
 *                  type: string
 *                  description: tokens of the user
 *              refreshToken:
 *                  type: string
 *                  description: tokens of the user
 *
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
 *      Me:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: the unique id for this user
 *              name:
 *                  type: string
 *                  description: the name of this user *
 *              email:
 *                  type: string
 *                  description: the email of the user that he registered
 *              createAt:
 *                  type: string
 *                  description: the date of creating the account
 *              updateAt:
 *                  type: string
 *                  description: the date of updating the account
 */