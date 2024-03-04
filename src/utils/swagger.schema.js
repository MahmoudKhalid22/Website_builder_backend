/**
 * @swagger
 *  components:
 *   schemas:
 *      User:
 *          type: object
 *          properties:
 *              user:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                          description: the unique id for the user
 *                      name:
 *                          type: string
 *                          description: the name of the user
 *                      email:
 *                          type: string
 *                          description: the email of the user must be the valid and true email
 *                      accessToken:
 *                          type: string
 *                          description: tokens of the user
 *                      refreshToken:
 *                          type: string
 *                          description: tokens of the user
 *
 *      Register:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: the name of the user
 *              email:
 *                  type: string
 *                  description: the email of the user must be the valid and true email
 *              password:
 *                  type: string
 *                  description: the password of the user the minimum characters must be 6
 *      Login:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: the email of the user that he registered
 *              password:
 *                  type: string
 *                  description: the password of the user
 *      Me:
 *          type: object
 *          properties:
 *              user:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                          description: the unique id for this user
 *                      name:
 *                          type: string
 *                          description: the name of this user *
 *                      email:
 *                          type: string
 *                          description: the email of the user that he registered
 *                      createdAt:
 *                          type: string
 *                          description: the date of creating the account
 *                      updatedAt:
 *                          type: string
 *                          description: the date of updating the account
 *
 *      Page:
 *          type: object
 *          properties:
 *              navbar:
 *                  type: object
 *                  properties:
 *                      imgUrl:
 *                          type: string
 *                      links:
 *                           type: array
 *                           example: [hero, about, testimonial, contact]
 *              hero:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                      description:
 *                          type: string
 *                      icon:
 *                          type: string
 *                      imgUrl:
 *                          type: string
 *                      buttonText:
 *                          type: string
 *              services:
 *                  type: object
 *                  properties:
 *                      blocks:
 *                          type: array
 *                          properties:
 *                              icon:
 *                                  type: string
 *                              title:
 *                                  type: string
 *                              description:
 *                                  type: string
 *              features:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                      description:
 *                          type: string
 *                      phone:
 *                          type: string
 *                      buttonText:
 *                          type: string
 *                      icons:
 *                          type: array
 *                          properties:
 *                              icon:
 *                                  type: string
 *
 *                      imgUrl:
 *                          type: string
 *
 *              testimonial:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                      cards:
 *                          type: array
 *                          properties:
 *                              imgUrl:
 *                                  type: string
 *                              name:
 *                                  type: string
 *                              location:
 *                                  type: string
 *                              opinion:
 *                                  type: string
 *              logos:
 *                  type: object
 *                  properties:
 *                      companies:
 *                          type: array
 *                          properties:
 *                              imgUrl:
 *                                 type: string
 *
 *              projects:
 *                   type: object
 *                   properties:
 *                      title:
 *                          type: string
 *                      description:
 *                          type: string
 *                      cards:
 *                          type: array
 *                          properties:
 *                              imgUrl:
 *                                  type: string
 *                              title:
 *                                  type: string
 *                              description:
 *                                  type: string
 *                              icon:
 *                                  type: string
 *
 *              statistics:
 *                  type: object
 *                  properties:
 *                      statistics:
 *                          type: array
 *                          properties:
 *                              title:
 *                                  type: string
 *                              value:
 *                                  type: string
 *              items:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                      description:
 *                          type: string
 *                      cards:
 *                          type: array
 *                          properties:
 *                              title:
 *                                  type: string
 *                              description:
 *                                  type: string
 *                              imgUrl:
 *                                  type: string
 *                              icon:
 *                                  type: string
 *                              caption:
 *                                  type: string
 *
 *
 *
 *
 */
