const User = require('../models/User');
const fs = require('fs');
const elasticsearch = require('elasticsearch');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const {index, indextype,} = require('../config/elasticconfig');
const bodybuilder = require('bodybuilder');

// Elastic Search Connection
const esClient = new elasticsearch.Client({
  cloud: {
      id: 'name:QuickfoodEleasticsearch:ZWFzdHVzMi5henVyZS5lbGFzdGljLWNsb3VkLmNvbTo5MjQzJDE3NjcyYjQ0YTgzYTQ5MTBiMDg2YTEwNzIyYjcwN2M2JDhkMDc0NzJhMTUzNzRmMTU5YzU1M2Q4MTEwMTQ2ZmQz',
    },
    hosts: [
      'https://elastic:n0kdN3sCnq3Vey1R8wfMWeU0@17672b44a83a4910b086a10722b707c6.eastus2.azure.elastic-cloud.com:9243'
      
    ],
    log: 'trace'
});


//@desc     Bulk Insert 
//@route    GET /api/v1/elasticsearch/bulkindexrestaurants
//@access   Public
exports.bulkindexrestaurants = asyncHandler(async (req, res, next) => {

    // const restaurantsRaw = fs.readFileSync('./uploads/data.json');
    // const restaurants = JSON.parse(restaurantsRaw);
    // console.log(`${restaurants.length} items parsed from data file`);
    // bulkIndex(index, indextype, restaurants);

 
    res.status(200).json({
      success: true
    });
});


//@desc     Get All Indices on Elasticsearch
//@route    GET /api/v1/elasticsearch/indices 
//@access   Public
exports.indices  = asyncHandler(async (req, res, next) => {

  const indicesList = esClient.cat.indices({v: true})
    .then(console.log)
    .catch(err => console.error(`Error connecting to the es client: ${err}`));
 
    res.status(200).json({
      success: true,
      count: indicesList.length,
      data: indicesList
    });
});

//@desc     Get All Restuarants API
//@route    GET /api/v1/elasticsearch/getallrestaurants 
//@access   Public
exports.getallrestaurants  = asyncHandler(async (req, res, next) => {
   
        var arrayList = [];
        let body = {
          size: 1000,
          from: 0,
          query: {
            match_all: {}
          }
        };
 
    
   esClient.search({index:index,  body:body})
        .then(results => {
                //res.send(results.hits.hits);
                results.hits.hits.forEach((hit, index) => 
                arrayList.push(hit._source)
            )
            res.status(200).json({
                success: true,
                count: arrayList.length,
                data: arrayList
            });
        })
        .catch(err=>{
          console.log(err)
          res.send([]);
  });

    
  });
  
//@desc     POST Search Elasticsearch
//@route    POST /api/v1/elasticsearch/searchrestaurants
//@access   Public
exports.searchrestaurants  = asyncHandler(async (req, res, next) => {
    const { isInStock, isActive, isBestSeller,options,searchText } = req.body;
    console.log(index);
    var arrayList = [];
    let body = bodybuilder();
    let searchTextObj = {
      query: searchText,
      slop: 4 
  };

    body = body.query('match_phrase', 'userName', searchTextObj);
    body = body.orQuery('match_phrase', 'CUSINE_CATEGORY', searchTextObj);
    body = body.orQuery('match_phrase', 'CITY', searchTextObj);
    body = body.orQuery('match_phrase', 'typeOfFood', searchTextObj);
    
    body = body.rawOption('highlight', { pre_tags: ['<strong>'], post_tags: ['</strong>'], fields: { name: {} } });

    body = body.build();

    esClient.search({
      index,
      body
    }).then((data) => {
        //console.log(data);
        data.hits.hits.forEach((hit, index) => 
                arrayList.push(hit._source));
      res.send(arrayList);
    }).catch(next);
  
});

  // Bulk Insertion Method
const bulkIndex = function bulkIndex(index, type, data) {
  let bulkBody = [];

  data.forEach(item => {
    bulkBody.push({
      index: {
        _index: index,
        _type: type
        //_id: item.id
      }
    });

    bulkBody.push(item);
  });

  esClient.bulk({body: bulkBody})
  .then(response => {
    let errorCount = 0;
    response.items.forEach(item => {
      if (item.index && item.index.error) {
        console.log(++errorCount, item.index.error);
      }
    });
    console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
  })
  .catch(console.err);
};