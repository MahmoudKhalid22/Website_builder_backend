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
