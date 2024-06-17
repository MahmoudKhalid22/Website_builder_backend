/**
 * @swagger
 *  /message:
 *      post:
 *          tags:
 *              - Messages
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: Mahmoud
 *                              email:
 *                                  type: string
 *                                  example: m@member.com
 *                              message:
 *                                  type: string
 *                                  example: "I want some help"
 *          responses:
 *              '200':
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: {message: your message has been sent successfully}
 *              '400':
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: {error: "please enter the requirements your email, your name, and the message"}
 *              '500':
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: {error: "Internal server error"}
 *
 *
 */
