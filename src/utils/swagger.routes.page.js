/**
 * @swagger
 *  /page:
 *      post:
 *          description: user adds page to his account
 *          tags:
 *              - Page
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                description: Access token of the user to add page
 *                example: Bearer abcxyz123
 *          requestBody:
 *                content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Page'
 *          responses:
 *              '201':
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: object
 *                                      example: {message: page has been created successfully }
 *                                  page:
 *                                      type: object
 *                                      example:
 *                                          $ref: '#/components/schemas/Page'
 *              '500':
 *                  description: internal server error
 *
 */

/**
 * @swagger
 * /page/pages:
 *   get:
 *     summary: get user pages
 *     tags:
 *       - Page
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
 *         description: Page returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pages:
 *                   type: array
 *                   example:  [{_id:123, title: flower}]
 *       '404':
 *         description: Page not found or unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: Page not found or you are not authorized to delete it
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
/**
 * @swagger
 * /page/{id}:
 *   get:
 *     summary: get user pages
 *     tags:
 *       - Page
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
 *         description: ID of the page to update
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Page returned successfully
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/Page'
 *       '404':
 *         description: Page not found or unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: Page not found or you are not authorized to delete it
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /page/update/{pageId}:
 *   patch:
 *     summary: Update a page
 *     description: Update a page owned by the authenticated user
 *     tags:
 *       - Page
 *     parameters:
 *       - in: path
 *         name: pageId
 *         required: true
 *         description: ID of the page to update
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         description: Access token of the user to update page
 *         example: Bearer abcxyz123
 *     requestBody:
 *       description: Page data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Page'
 *           example:
 *             title: Updated Page Title
 *             content: Updated page content...
 *     responses:
 *       '200':
 *         description: Page updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Page updated successfully
 *                 page:
 *                   $ref: '#/components/schemas/Page'
 *       '204':
 *         description: No content, successful update without response body
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /page/{id}:
 *   delete:
 *     summary: Delete a page
 *     tags:
 *       - Page
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the page to delete
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
 *         description: Page deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Page has been deleted successfully
 *       '404':
 *         description: Page not found or unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: Page not found or you are not authorized to delete it
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /page/delete/pages:
 *   delete:
 *     summary: Delete all user pages
 *     tags:
 *       - Page
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
 *         description: User's pages deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User's pages deleted successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
