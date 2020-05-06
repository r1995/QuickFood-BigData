const express = require('express');
const router = express.Router();
const { ProduceKafkaMsg,ConsumeKafkaMsg } = require('../../controllers/TransactionalNotifications');

/**
 * @swagger
 * path:
 *  /api/v1/kafkaProducer:
 *    post:
 *      summary: push order details
 *      tags: [TransactionalNotifications]
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - userEmail
 *                - userPassword
 *              properties:
 *                userEmail:
 *                  type: string
 *                  description: User's email address
 *                userPassword:
 *                  type: string
 *                  description: User's password
 *              example:
 *                userEmail: john@gmail.com
 *                userPassword: "123456"
 *      responses:
 *        "200":
 *          description: Message successfully added
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: true when request is successful, false otherwise.
 *                  token:
 *                    type: string
 *                    description: JWT token
 *        "401":
 *          description: Invalid password / Unauthorized access
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: true when request is successful, false otherwise.
 *                  error:
 *                    type: string
 *                    description: Error message
 *                example:
 *                  success: false
 *                  error: Invalid credentials
 */
router.route('/').post(ProduceKafkaMsg);

/**
 * @swagger
 * paths:
 *  /api/v1/kafkaConsumer:
 *    get:
 *      summary: fetch Messages from topic
 *      tags: [TransactionalNotifications]
 *      responses:
 *        "200":
 *          description: Message successfully added
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: true when request is successful, false otherwise.
 *                  
 *        "401":
 *          description: Unauthorized access
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: true when request is successful, otherwise false.
 *                  error:
 *                    type: string
 *                    description: Contains the description of the error
 *                example:
 *                  success: false
 *                  error: Unauthorized access
 */

router.route('/kafkaConsumer').get(ConsumeKafkaMsg);

module.exports = router;