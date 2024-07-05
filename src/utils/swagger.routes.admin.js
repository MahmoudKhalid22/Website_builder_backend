/**
 * @swagger
 * /user/admin-users:
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
 *       - in: query
 *         name: limit
 *         schema:
 *              type: string
 *              require: true
 *              description: limit the number of retrieved users
 *              example: limit=10
 *       - in: query
 *         name: offset
 *         schema:
 *              type: string
 *              require: true
 *              description: begin from which number you want users
 *              example: offset=15
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
 * /user/superadmin/{adminId}:
 *   delete:
 *     summary: superadmin can delete an admin.
 *     description: superadmin can delete a specific admin by his/her id.
 *     tags:
 *       - Super Admin
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           required: true
 *           description: Bearer token for accessing admin routes.
 *           example: "Bearer abcxyz123456"
 *       - in: path
 *         name: adminId
 *         schema:
 *              type: string
 *              require: true
 *              description: the id of and admin should be deleted
 *              example: abcxyz123
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {message: this admin has been deleted}
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
 *       - in: query
 *         name: limit
 *         description: the limit of messages that you want ( the number )
 *         example: limit=5
 *       - in: query
 *         name: offset
 *         description: the number of messages that you want to start from
 *         example: offset=5
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
 * /user/admin-new-user:
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
 * /user/{userId}/pages:
 *   get:
 *     summary: Retrieve all pages for the uesr.
 *     description: This endpoint allows an admin to retrieve a page's details by its ID. The page can only be accessed if the owner is an admin.
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
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           required: true
 *           description: The unique identifier of the page.
 *           example: "60d0fe4f5311236168a109ca"
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
 * /user/{userId}/{pageId}:
 *   get:
 *     summary: Retrieve a specific page for a specific user by its ID.
 *     description: This endpoint allows an admin to retrieve a page's details by its ID. The page can only be accessed if the owner is an admin.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           required: true
 *           description: Bearer token for accessing admin routes.
 *           example: "Bearer abcxyz123456"
 *       - in: path
 *         name: pageId
 *         schema:
 *           type: string
 *           required: true
 *           description: The unique identifier of the page.
 *           example: "60d0fe4f5311236168a109ca"
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
 * /user/block/{userId}:
 *   put:
 *     summary: Block a user by their ID.
 *     description: This endpoint allows an admin to block a user by setting their `blocked` status to true.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           required: true
 *           description: Bearer token for accessing admin routes.
 *           example: "Bearer abcxyz123456"
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
 * /user/unblock/{userId}:
 *   put:
 *     summary: Block a user by their ID.
 *     description: This endpoint allows an admin to block a user by setting their `blocked` status to true.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           required: true
 *           description: Bearer token for accessing admin routes.
 *           example: "Bearer abcxyz123456"
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           required: true
 *           description: The unique identifier of the user to be blocked.
 *           example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: User has been unblocked successfully.
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
 * /user/{userId}/pages:
 *   delete:
 *     summary: delete all pages of the user.
 *     description: take the id of the user and delete all his pages.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           required: true
 *           description: Bearer token for accessing admin routes.
 *           example: "Bearer abcxyz123456"
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           required: true
 *           description: The unique identifier of the user to be blocked.
 *           example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: User has been unblocked successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "pages have been deleted"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "user has no pages"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
/**
 * @swagger
 * /user/{userId}/{pageId}:
 *   delete:
 *     summary: delete specific page of the user.
 *     description: take the id of the user and delete all his pages.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           required: true
 *           description: Bearer token for accessing admin routes.
 *           example: "Bearer abcxyz123456"
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           required: true
 *           description: The unique identifier of the user.
 *           example: "60d0fe4f5311236168a109ca"
 *       - in: path
 *         name: pageId
 *         schema:
 *           type: string
 *           required: true
 *           description: The unique identifier of the page to be deleted.
 *           example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: User has been unblocked successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "page has been deleted"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "user has no pages"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
/**
 * @swagger
 * /user/admin-delete-user/{userId}:
 *   delete:
 *     summary: delete specific account of the user.
 *     description: take the id of the user and delete all his pages.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           required: true
 *           description: Bearer token for accessing admin routes.
 *           example: "Bearer abcxyz123456"
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           required: true
 *           description: The unique identifier of the user.
 *           example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: User has been unblocked successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "user has been deleted"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "user has no pages"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

/**
 * @swagger
 * /user/send-alert/{userId}:
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
