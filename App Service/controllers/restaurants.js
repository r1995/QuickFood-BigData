const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const kafka = require('kafka-node');
const bp = require('body-parser');
const config = require('../config/appsettings');


//@desc     Get all restaurants
//@route    GET /api/v1/restaurants
//@access   Public
exports.getAllRestaurants = asyncHandler(async (req, res, next) => {
  // try {
  //   const user = new User({
  //     userName : 'rahul',
  //     userEmail : 'rahul@gmail.com',
  //     userPassword : 'password@123',
  //     isRestaurant : true,
  //     userCity : 'Bengalore',
  //     userCountry : 'India',
  //     userProfileImageUrl : ''
  //   });
    
  //     const Producer = kafka.Producer;
  //    // const client = new kafka.Client(config.kafka_server);
  //     const client = new kafka.KafkaClient({kafkaHost: config.kafka_server});
  //     const producer = new Producer(client);
  //     const kafka_topic =  config.kafka_topic;
  //     console.log(kafka_topic);
  //     let payloads = [
  //       {
  //         topic: kafka_topic,
  //         messages: user,
  //         partition: 0
  //       }
  //     ];
      
     
  //     producer.on('ready', async function() {
  //       let push_status = producer.send(payloads, (err, data) => {
  //         if (err) {
  //           console.log('[kafka-producer -> '+kafka_topic+']: broker update failed');
  //         } else {
  //           console.log('[kafka-producer -> '+kafka_topic+']: broker update success');
  //         }
  //       });
  //     });
    
  //     producer.on('error', function(err) {
  //       console.log(err);
  //       console.log('[kafka-producer -> '+kafka_topic+']: connection errored');
  //       throw err;
  //     });
  //   }
  //   catch(e) {
  //     console.log(e);
  //   }
  

  // Kafka Code ends

  

  const restaurants = await User.find({ isRestaurant: true });
  res.status(200).json({
    success: true,
    count: restaurants.length,
    data: restaurants
  });
});

 
