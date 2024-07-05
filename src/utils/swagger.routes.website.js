/**
 * @swagger
 *  /website:
 *      post:
 *          description: user adds website to his account
 *          tags:
 *              - website
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                description: Access token of the user to add website
 *                example: Bearer abcxyz123
 *          requestBody:
 *                content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/website'
 *          responses:
 *              '201':
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: object
 *                                      example: {message: website has been created successfully }
 *                                  website:
 *                                      type: object
 *                                      example:
 *                                          $ref: '#/components/schemas/website'
 *              '500':
 *                  description: internal server error
 *
 */

/**
 * @swagger
 * /website/websites:
 *   get:
 *     summary: get user websites
 *     tags:
 *       - website
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
 *         description: website returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 websites:
 *                   type: array
 *                   example:  [{_id:123, title: flower}]
 *       '404':
 *         description: website not found or unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: website not found or you are not authorized to delete it
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
/**
 * @swagger
 * /website/{id}:
 *   get:
 *     summary: get user websites
 *     tags:
 *       - website
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           required: true
 *           description: Access token for authorization
 *           example: "Bearer abcxyz123456"
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the website to update
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: website returned successfully
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/website'
 *       '404':
 *         description: website not found or unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: website not found or you are not authorized to delete it
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /website/update/{websiteId}:
 *   patch:
 *     summary: Update a website
 *     description: Update a website owned by the authenticated user
 *     tags:
 *       - website
 *     parameters:
 *       - in: path
 *         name: websiteId
 *         required: true
 *         description: ID of the website to update
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         description: Access token of the user to update website
 *         example: Bearer abcxyz123
 *     requestBody:
 *       description: website data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/website'
 *           example:
 *             title: Updated website Title
 *             content: Updated website content...
 *     responses:
 *       '200':
 *         description: website updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: website updated successfully
 *                 website:
 *                   $ref: '#/components/schemas/website'
 *       '204':
 *         description: No content, successful update without response body
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /website/{id}:
 *   delete:
 *     summary: Delete a website
 *     tags:
 *       - website
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the website to delete
 *           example: "123456"
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           required: true
 *           description: Access token for authorization
 *           example: "Bearer abcxyz123456"
 *     responses:
 *       '200':
 *         description: website deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: website has been deleted successfully
 *       '404':
 *         description: website not found or unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: website not found or you are not authorized to delete it
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /website/delete/websites:
 *   delete:
 *     summary: Delete all user websites
 *     tags:
 *       - website
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
 *         description: User's websites deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User's websites deleted successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
