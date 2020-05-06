const User = require('../models/User');
const MenuItem = require('../models/MenuItem');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
var kafka = require('kafka-node');

//@desc     Produce kafka Msg
//@route    POST api/v1/kafkaProducer
//@access   Public
exports.ProduceKafkaMsg = asyncHandler(async (req, res, next) => {

  console.log("hi");
    var kafka = require("kafka-node"),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient(),
    producer = new Producer(client);
  
  let count = 0;
  
  producer.on("ready", function() {
    console.log("ready");
    setInterval(function() {
      payloads = [
        { topic: "test", messages: `test Message ${count} `, partition: 0 }
      ];
  
      producer.send(payloads, function(err, data) {
        console.log(data);
        count += 1;
      });
    }, 5000);
  });
  producer.on("error", function(err) {
    console.log(err);
  });

  sendTokenResponse(user, 200, res);
});

//@desc     Fetch kafka Msg
//@route    GET api/v1/kafkaConsumer
//@access   Public
exports.ConsumeKafkaMsg = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  var kafka = require("kafka-node"),
  Consumer = kafka.Consumer,
  client = new kafka.KafkaClient(),
  consumer = new Consumer(client, [{ topic: "test", partition: 0 }], {
    autoCommit: false
  });

consumer.on("message", function(message) {
  const ConsumerMsg = message;
})
//const ConsumerMsg = "hi ";
res.status(200).json({
  success: true,
  data: message
});

});




//@desc     Get order notifications
//@route    GET api/v1/auth/OrderNotification
//@access   Private
exports.getOrderNotification = asyncHandler(async (req, res, next) => {
  //const user = await User.findById(req.user.id);
//var notifications = null;

  Notification.find({ 'userID': `${req.user.id}`, read_Flag:'0'}, 'Message updatedAt read_Flag', function (err, notifications) {
    if (err) return handleError(err);
    // 'athletes' contains the list of athletes that match the criteria.
    //console.log(notifications);
    if(notifications[0]){
    console.log(notifications[0].Message);
    Notification.findOneAndUpdate({'userID': `${req.user.id}`, 'read_Flag':'0'}
    , {$set: {read_Flag: "1"}}
    , function (err, doc) {    
        if (err) {    
            console.log("update document error");   
        } else {
                console.log("update document success");     
        }    
    });
    res.status(200).json({ success: true, data: notifications[0].Message });
  }
  else {
    res.status(200).json({ success: true, data: notifications[0]});
  }
  //res.status(200).json({ success: true, data: "HI" });
  })

});



//@desc     Create a new offer on restaurant
//@route    POST /api/v1/orders/:restaurantId
//@access   Private (Only a customer user can create an order)
exports.CreateOffer = asyncHandler(async (req, res, next) => {
  // Check if user is a restaurant user
  
  //code push offer details to kafka topic

  res.status(201).json({
    success: true,
    data: res.data
  });


});

// @desc      Update Offer details
// @route     PUT /api/v1/UpdateOfferDetails
// @access    Private
exports.updateOfferDetails = asyncHandler(async (req, res, next) => {
  // Check if user is a restaurant user

 // code to update offer details

  res.status(200).json({
    success: true,
    data: res.data
  });
});


//@desc     Fetch offers on restaurants 
//@route    GET api/v1/RestaurantOffers
//@access   Public
exports.GetRestaurantOffers = asyncHandler(async (req, res, next) => {
  
  //validate user
  const user = await User.findById(req.user.id);
  
  // code to fetch offers from kafka topic

res.status(200).json({
  success: true,
  data: res.data
});

});



