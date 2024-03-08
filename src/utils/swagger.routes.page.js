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
 * /page/update/{pageId}:
 *   put:
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
