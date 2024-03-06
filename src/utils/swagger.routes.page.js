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
 *     put:
 *          description: user update his page 
 *          tags:
 *              - Page
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                description: Access token of the user to update-page
 *                example: Bearer abcxyz123
 *          requestBody:
 *                content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Page'
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
