const elasticsearch = require('elasticsearch');

const esClient = new elasticsearch.Client({
    cloud: {
        id: 'name:QuickfoodEleasticsearch:ZWFzdHVzMi5henVyZS5lbGFzdGljLWNsb3VkLmNvbTo5MjQzJDE3NjcyYjQ0YTgzYTQ5MTBiMDg2YTEwNzIyYjcwN2M2JDhkMDc0NzJhMTUzNzRmMTU5YzU1M2Q4MTEwMTQ2ZmQz',
      },
      hosts: [
        'https://elastic:n0kdN3sCnq3Vey1R8wfMWeU0@17672b44a83a4910b086a10722b707c6.eastus2.azure.elastic-cloud.com:9243'
        
      ],
      log: 'trace'
});

const index = 'quickfoodata';
const indextype = 'doc';

module.exports = {
  esClient,
  index,
  indextype
};