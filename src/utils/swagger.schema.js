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
/**
 * @swagger
 * components:
 *   schemas:
 *      OAuth2AuthorizeRequest:
 *          type: object
 *          properties:
 *              client_id:
 *                  type: string
 *                  description: The client ID provided by Google Developers Console.
 *              redirect_uri:
 *                  type: string
 *                  description: The URI to redirect the user back to after authorization.
 *              response_type:
 *                  type: string
 *                  description: Indicates the type of response Google expects.
 *              scope:
 *                  type: string
 *                  description: The scope of the access request.
 *
 *      OAuth2TokenRequest:
 *          type: object
 *          properties:
 *              code:
 *                  type: string
 *                  description: The authorization code received from Google's OAuth2 consent screen.
 *              client_id:
 *                  type: string
 *                  description: The client ID provided by Google Developers Console.
 *              client_secret:
 *                  type: string
 *                  description: The client secret provided by Google Developers Console.
 *              redirect_uri:
 *                  type: string
 *                  description: The URI to which Google will redirect the user after granting or denying permission.
 *              grant_type:
 *                  type: string
 *                  description: The type of grant requested.
 *
 *      OAuth2TokenResponse:
 *          type: object
 *          properties:
 *              access_token:
 *                  type: string
 *                  description: The access token returned by Google.
 *              token_type:
 *                  type: string
 *                  description: The type of token returned (e.g., "Bearer").
 *              expires_in:
 *                  type: integer
 *                  description: The lifetime in seconds of the access token.
 *              refresh_token:
 *                  type: string
 *                  description: A refresh token that can be used to obtain a new access token.
 *
 *      Error:
 *          type: object
 *          properties:
 *              code:
 *                  type: integer
 *                  format: int32
 *              message:
 *                  type: string
 */