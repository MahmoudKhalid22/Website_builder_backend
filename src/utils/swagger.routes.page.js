/**
 * @swagger
 * /Page/update:
 *   put:
 *     summary: Update page data
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema:
 *           type: string
 *           required: true
 *           description: Access token for update-page
 *           example: "Bearer abcxyz123456"
 *     tags:
 *       - Page
 *     responses:
 *       '200':
 *         description: Successfully updated page
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Define your properties here
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
