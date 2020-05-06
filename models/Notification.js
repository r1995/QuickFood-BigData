const mongoose = require('mongoose');

/**
 * @swagger
 *  components:
 *    schemas:
 *      Notification:
 *        type: object
 *        required:
 *          - userID
 *          - Message
 *          - read_Flag
 *        properties:
 *          userID:
 *            type: string
 *          Message:
 *            type: string
 *          read_Flag:
 *            type: string
 *        example:
 *          userID: 5e9089bda84ddd0ffc79f917
 *          Message: order delivered
 *          read_Flag: 1
 */
const NotificationSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: [true, 'Please select userID']
    },
    Message: {
      type: String,
      required: [true, 'Please select a Message']
    },
    read_Flag: {
      type: String,
      required: [true, 'Please add item ingredients']
    }
  },
  {
    timestamps: true
  }
);

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
