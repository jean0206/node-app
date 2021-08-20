const Notification = require("../models/notification");

const getNotification = async (req, res) => {
  const {id} = req.params;
  try {
      const notifications = await Notification.find({ownerId:id})
      console.log(notifications)
      res.send(notifications)
  } catch (error) {
      res.send(error.message)
  }
};

const addNotification = async (req, res) => {
  const { ownerId, text } = req.body;
  let newDate = ""
  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10) {
    newDate=(`${day}-0${month}-${year}`);
  } else {
    newDate= (`${day}-${month}-${year}`);
  }
  try {
    const newNotification = new Notification({
      ownerId: ownerId,
      text: text,
      date: newDate,
    });
    const saved = await newNotification.save();
    res.send(saved);
  } catch (error) {
    res.send({ message: error.message });
  }
};

const deleteNotification = async (req,res) => {
    const {id} = req.params
    try {
      const noti = await Notification.deleteOne({_id: id});
      res.send(noti)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { getNotification, addNotification, deleteNotification };
