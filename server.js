const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const useSwagger = require('./config/documentation');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const { initCloudinary } = require('./config/fileStorage');
// const kafka = require('kafka-node');
// const bp = require('body-parser');
// var kafkaconsumer = require('./externalservice/kafkaconsumer');
var Kafka = require("node-rdkafka");
const User = require('./models/User');
const Notification = require('./models/Notification');
const MenuItem = require('./models/MenuItem');
const config = require('./config/appsettings');
//const quickfoodsample = require('./models/quickfoodsample');
const asyncHandler = require('./middleware/async');


// Load env vars
dotenv.config({
  path: './config/config.env'
});

// Connect to DB
connectDB();

//insertinto_quickfood();
  
function insertinto_quickfood(){

  User.find({isRestaurant : true}, function(err, users) {
    if (err) throw err;
    //console.log(users);
  users.forEach(function(user){
    var _not = new MenuItem({
      itemTitle : "Idli",
      itemIngredients : "Rice",
      itemPrice : "99",
      itemImageUrl : "http://res.cloudinary.com/dwakc7e0d/image",
      chooseItemType : "idli",
      user : user,
    });
    
    _not.save(function(error) { //This saves the information you see within that Bee declaration (lines 4-6).
         console.log("Your bee has been saved.");
         if (error) {
        console.error(error);
        }
       });
  });
});
  }

// Load route files
const auth = require('./routes/api/auth');
const menuitems = require('./routes/api/menuItems');
const orders = require('./routes/api/orders');
const restaurants = require('./routes/api/restaurants');
const images = require('./routes/api/images');
const elasticsearch = require('./routes/api/elasticsearch');
const TransactionalNotifications = require('./routes/api/TransactionalNotifications');

// Initialize app
const app = express();

/* Apply 3rd-party middleware */

// Enable body-parser(for POST requests)
app.use(express.json());

// Swagger
useSwagger(app);

// Initialize Cloudinary
initCloudinary();

// Enable cors
app.use(cors());

// Cookie parser
app.use(cookieParser());

// Logger middleware for dev environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Prevent http param pollution
app.use(hpp());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

/* Apply 3rd-party middleware ENDS*/

// Mount routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/menuitems', menuitems);
app.use('/api/v1/orders', orders);
app.use('/api/v1/restaurants', restaurants);
app.use('/api/v1/images', images);
app.use('/api/v1/elasticsearch', elasticsearch);
app.use('/api/v1/TransactionalNotifications', TransactionalNotifications);
// Initiate Kafka Consumer
// kafkaconsumer.initKafkaConsumer();


// Mount custom errorHandler middleware
app.use(errorHandler);

const port = process.env.PORT || 5002;

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

// Handle promise rejections and exit app gracefully
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});




try {
        
  var kafkaConf = {
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
  const topics = [`${prefix}notifications`];
  const consumer = new Kafka.KafkaConsumer(kafkaConf, {
    "auto.offset.reset": "beginning"
  });
  const numMessages = 5;
  let counter = 0;
  consumer.on("error", function(err) {
    console.error(err);
  });
  consumer.on("ready", function(arg) {
    console.log(`Consumer ${arg.name} ready`);
    consumer.subscribe(topics);
    consumer.consume();
  });
  consumer.on("data", function(m) {
    //console.log(m.value.toString());
    var _notification = m.value.toString().split(",");
    var _user_id = _notification[0];
    var _Message = _notification[1]
    console.log(`id : ${_user_id}, msg : ${_Message}` );
    
    var _not = new Notification({
      userID : _user_id,
      Message : _Message,
      read_Flag : "0"
    })
    _not.save(function(error) { //This saves the information you see within that Bee declaration (lines 4-6).
         console.log("Your bee has been saved.");
         if (error) {
        console.error(error);
        }
       });

  });
  consumer.on("disconnected", function(arg) {
    process.exit();
  });
  consumer.on('event.error', function(err) {
    console.error(err);
    process.exit(1);
  });
  consumer.on('event.log', function(log) {
    console.log(log);
  });
  consumer.connect();
  
}
catch(e) {
console.log(e);
}
