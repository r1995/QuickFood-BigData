// const kafka = require('kafka-node');
// const bp = require('body-parser');
// const config = require('../config/appsettings');


// module.exports = {
//   initKafkaConsumer: function(){
//     try {
//       const Consumer = kafka.Consumer;
//       //const client = new kafka.Client(config.kafka_server);
//       const client = new kafka.KafkaClient({kafkaHost: config.kafka_server});
//       let consumer = new Consumer(
//         client,
//         [{ topic: config.kafka_topic, partition: 0 }],
//         {
//           autoCommit: true,
//           fetchMaxWaitMs: 1000,
//           fetchMaxBytes: 1024 * 1024,
//           encoding: 'utf8',
//           fromOffset: true
//         }
//       );
//       consumer.on('message', async function(message) {
//         console.log('kafka-consumer -> test');
//         console.log(
//           'kafka-> ',
//           message.value
//         );
//       })
//       consumer.on('error', function(err) {
//         console.log('error', err);
//       });
//     }
//     catch(e) {
//       console.log(e);
//     }
//   }
// }

