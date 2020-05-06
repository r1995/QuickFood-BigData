const Order = require('../models/Order');
const User = require('../models/User');
const MenuItem = require('../models/MenuItem');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Kafka = require("node-rdkafka");
const config = require("../config/appsettings");
//@desc     Get all orders for a restaurant
//@route    GET /api/v1/orders
//@access   Private (Only a customer user can create an order)
exports.getAllOrders = asyncHandler(async (req, res, next) => {
  let query;
  if (req.user.isRestaurant) {
    query = {
      restaurant: req.user.id
    };
  } else {
    query = {
      user: req.user.id
    };
  }

  const orders = await Order.find(query)
    .populate({
      path: 'restaurant',
      select: 'typeOfFood userName userCity userCountry userProfileImageUrl'
    })
    .populate({
      path: 'user',
      select: 'userName userEmail userCity userCountry userProfileImageUrl'
    })
    .populate({
      path: 'itemList',
      model: MenuItem,
      select: 'chooseItemType itemImageUrl itemIngredients itemPrice itemTitle'
    });

  res.status(200).json({ success: true, data: orders });



});

//@desc     Create a new order
//@route    POST /api/v1/orders/:restaurantId
//@access   Private (Only a customer user can create an order)
exports.createOrder = asyncHandler(async (req, res, next) => {
  // Check if user is a restaurant user
  if (req.user.isRestaurant) {
    return next(
      new ErrorResponse('User not authorized to place an order', 401)
    );
  }

  if (!req.params.restaurantId) {
    return next(new ErrorResponse('Restaurant Id is required', 400));
  }

  if (
    !req.body.totalPrice ||
    !req.body.itemList ||
    req.body.itemList.length < 1
  ) {
    return next(
      new ErrorResponse(
        'Please send both total price and item list with at least one item',
        400
      )
    );
  }

  // Check if restaurant user exists and is actually a restaurant
  const restaurant = await User.findById(req.params.restaurantId);
  if (!restaurant || (restaurant && !restaurant.isRestaurant)) {
    return next(
      new ErrorResponse(
        `The restaurantId sent doesn't belong to any restaurant`,
        400
      )
    );
  }

  // Tag order to restaurant and user
  req.body.restaurant = req.params.restaurantId;
  req.body.user = req.user.id;

  const order = await Order.create(req.body);
  const returnOrder = await Order.findById(order.id)
    .populate({
      path: 'restaurant',
      select: 'typeOfFood userName userCity userCountry userProfileImageUrl'
    })
    .populate({
      path: 'user',
      select: 'userName userEmail userCity userCountry userProfileImageUrl'
    })
    .populate({
      path: 'itemList',
      model: MenuItem,
      select: 'chooseItemType itemImageUrl itemIngredients itemPrice itemTitle'
    });

if(res.status(201)){
  ProduceOrderStatusNotifications("notifications",req.user.id,"Your Order is placed successfully");
  ProduceOrderStatusNotifications("notifications",req.params.restaurantId,"You have received a new Order");
}
  


  res.status(201).json({
    success: true,
    data: returnOrder
  });
/*
  var kafka = require("kafka-node"),
  Producer = kafka.Producer,
  client = new kafka.KafkaClient(),
  producer = new Producer(client);

producer.on("ready", function() {
  console.log("ready");
    payloads = [
      { topic: "notifications", messages: `${req.user.id}, your order is placed successfully`, partition: 0 },
      { topic: "notifications", messages: `${req.params.restaurantId}, You have received a new order`, partition: 0 }
    ];
    producer.send(payloads, function(err, data) {
      console.log(data);
    });
});
producer.on("error", function(err) {
  console.log(err);
});*/

});


//@desc     Update Order Status
//@route    PUT /api/v1/orders/:orderId
//@access   Private (Only a restaurant user can update the order status)
exports.updateOrderStatus = asyncHandler(async (req, res, next) => {
  // Check if the user is not a normal user
  if (!req.user.isRestaurant) {
    return next(new ErrorResponse('User not authorized to update orders', 401));
  }
  // Check if orderId is being sent
  if (!req.params.orderId) {
    return next(new ErrorResponse('Order Id is required', 400));
  }

  let order = await Order.findById(req.params.orderId);

  // Check whether the order exists
  if (!order) {
    return next(
      new ErrorResponse(`No order found with the id ${req.params.orderId}`, 400)
    );
  }

  const { status } = req.body;
  // Check whether the status has been supplied
  if (!status) {
    return next(new ErrorResponse('Please send the updated status', 400));
  }

  // Check if the order belongs to this restaurant user
  if (req.user.id.toString() !== order.restaurant.toString()) {
    return next(
      new ErrorResponse('Restaurant not authorized to update this order', 401)
    );
  }

  order = await Order.findByIdAndUpdate(
    req.params.orderId,
    { status },
    { new: true }
  )
    .populate({
      path: 'restaurant',
      select: 'typeOfFood userName userCity userCountry userProfileImageUrl'
    })
    .populate({
      path: 'user',
      select: 'userName userEmail userCity userCountry userProfileImageUrl'
    })
    .populate({
      path: 'itemList',
      model: MenuItem,
      select: 'chooseItemType itemImageUrl itemIngredients itemPrice itemTitle'
    });

      ProduceOrderStatusNotifications("notifications",order.user._id,`Your order is ${status}`);
   
  res.status(200).json({ success: true, data: order });

/*
  var kafka = require("kafka-node"),
  Producer = kafka.Producer,
  client = new kafka.KafkaClient(),
  producer = new Producer(client);

producer.on("ready", function() {
  console.log(order.user._id);
    payloads = [
      { topic: "notifications", messages: `${order.user._id}, your order is  ${status}`, partition: 0 }
    ];
    producer.send(payloads, function(err, data) {
      console.log(data);
    });
});
producer.on("error", function(err) {
  console.log(err);
});*/

});



function ProduceOrderStatusNotifications(_topic,userID,Status){
  //console.log("hi");
  const kafkaConf = {
    "group.id": "cloudkarafka-example",
    "metadata.broker.list": config.kafka_server.split(","),
    "socket.keepalive.enable": true,
    "security.protocol": "SASL_SSL",
    "sasl.mechanisms": "SCRAM-SHA-256",
    "sasl.username": config.kafka_username,
    "sasl.password": config.kafka_password
    //"debug": "generic,broker,security"
  };
  
  const prefix = config.kafka_prefix;
  const topic = `${prefix}${_topic}`;
  const producer = new Kafka.Producer(kafkaConf);
 
  producer.on("ready", function(arg) {
    //console.log(`producer ${arg.name} ready.`);
      producer.produce(topic, null, Buffer.from(`${userID}, ${Status}`  ), null);
  });
  
  producer.on("disconnected", function(arg) {
    process.exit();
  });
  
  producer.on('event.error', function(err) {
    console.error(err);
    process.exit(1);
  });
  producer.on('event.log', function(log) {
    console.log(log);
  });
  producer.connect();
}

