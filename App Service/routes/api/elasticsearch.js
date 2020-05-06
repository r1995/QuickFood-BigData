const express = require('express');
const router = express.Router();
const {  bulkindexrestaurants, indices,getallrestaurants, searchrestaurants} 
= require('../../controllers/elasticsearch');


/**
 * @swagger
 * path:
 *  /api/v1/elasticsearch/bulkindexrestaurants:
 *    get:
 *      summary: Fetch all restaurants in the database
 *      tags: [ElasticSearch]
 *      responses:
 *        "200":
 *          description: Restaurants fetched successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: true when request is successful, false otherwise.
 *                    example: true
 *                  count:
 *                    type: number
 *                    description: Number of restaurants returned in the response body
 *                  example: 1
 *                  data:
 *                    schema:
 *                    type: array
 *                    description: restaurants
 *                    items:
 *                      $ref: '#/components/schemas/User'
 */

router.route('/bulkindexrestaurants').get(bulkindexrestaurants);

/**
 * @swagger
 * path:
 *  /api/v1/elasticsearch/indices:
 *    get:
 *      summary: Fetch all indices in the elastic database
 *      tags: [ElasticSearch]
 *      responses:
 *        "200":
 *          description: Indices fetched successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: true when request is successful, false otherwise.
 *                    example: true
 *                  count:
 *                    type: number
 *                    description: Number of restaurants returned in the response body
 *                  example: 1
 */
router.route('/indices').get(indices);

/**
 * @swagger
 * path:
 *  /api/v1/elasticsearch/getallrestaurants:
 *    get:
 *      summary: Fetch all indices in the elastic database
 *      tags: [ElasticSearch]
 *      responses:
 *        "200":
 *          description: Indices fetched successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: true when request is successful, false otherwise.
 *                    example: true
 *                  count:
 *                    type: number
 *                    description: Number of restaurants returned in the response body
 *                  example: 1
 */
router.route('/getallrestaurants').get(getallrestaurants);

/**
 * @swagger
 * path:
 *  /api/v1/elasticsearch/searchrestaurants:
 *    post:
 *      summary: Search a Restaurant
 *      tags: [ElasticSearch]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - isInStock
 *                - isActive
 *                - searchText
 *              properties:
 *                isInStock:
 *                  type: boolean
 *                  description: isInStock
 *                isActive:
 *                  type: boolean
 *                  description: isActive
 *                searchText:
 *                  type: string
 *                  description: searchText
 *              example:
 *                isInStock: true
 *                isActive: true
 *      responses:
 *        "200":
 *          description: Successfully Searched
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
 *          description: Invalid Search
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
router.route('/searchrestaurants').post(searchrestaurants);

module.exports = router;
