/**
 * @swagger
 *  /message:
 *      post:
 *          tags:
 *              - Generic User
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

/**
 * @swagger
 * /send-message/{userId}:
 *   post:
 *     summary: Send a message to a user.
 *     description: Allows an admin to send a message to a specified user.
 *     tags:
 *       - Messages
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the user to whom the message will be sent.
 *         example: "60d0fe4f5311236168a109ca"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user receiving the message.
 *                 example: "user@example.com"
 *               name:
 *                 type: string
 *                 description: The name of the user receiving the message.
 *                 example: "John Doe"
 *               message:
 *                 type: string
 *                 description: The content of the message.
 *                 example: "Your subscription will expire soon."
 *               readed:
 *                 type: boolean
 *                 description: Whether the message has been read.
 *                 example: false
 *     responses:
 *       200:
 *         description: Message sent successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Message sent to user"
 *       403:
 *         description: Unauthorized - Admin access required.
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */

/**
 * @swagger
 * /all-users-messages:
 *   get:
 *     summary: Get all messages sent to users.
 *     description: Retrieves all messages that have been sent to users.
 *     tags:
 *       - Messages
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of messages sent to users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the message.
 *                     example: "60d0fe4f5311236168a109ca"
 *                   email:
 *                     type: string
 *                     description: The email of the recipient.
 *                     example: "user@example.com"
 *                   name:
 *                     type: string
 *                     description: The name of the recipient.
 *                     example: "John Doe"
 *                   message:
 *                     type: string
 *                     description: The content of the message.
 *                     example: "Your subscription will expire soon."
 *                   readed:
 *                     type: boolean
 *                     description: Whether the message has been read.
 *                     example: false
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the message was created.
 *                     example: "2023-06-12T18:30:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the message was last updated.
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
 * /messages/daily:
 *   get:
 *     summary: Get today's messages.
 *     description: Retrieves all messages sent today.
 *     tags:
 *       - Messages
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of messages sent today.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the message.
 *                     example: "60d0fe4f5311236168a109ca"
 *                   email:
 *                     type: string
 *                     description: The email of the recipient.
 *                     example: "user@example.com"
 *                   name:
 *                     type: string
 *                     description: The name of the recipient.
 *                     example: "John Doe"
 *                   message:
 *                     type: string
 *                     description: The content of the message.
 *                     example: "Your subscription will expire soon."
 *                   readed:
 *                     type: boolean
 *                     description: Whether the message has been read.
 *                     example: false
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the message was created.
 *                     example: "2023-06-12T18:30:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the message was last updated.
 *                     example: "2023-06-12T18:30:00Z"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
