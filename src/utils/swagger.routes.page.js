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
 * /page/update:
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
/**
 * @swagger
 * /page/delete/{id}:
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


