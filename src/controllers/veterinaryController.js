const Veterinary = require("../models/veterinary");
const User = require("../models/user");

const getVeterinary = async (req, res) => {
  res.status(200).json({ message: "Hola, como estas" });
};

const addVeterinary = async (req, res) => {
  const {
    huaweiId,
    name,
    phone,
    photo,
    city,
    country,
    state,
    appoinments,
    address,
  } = req.body;

  try {
    const veterinaryFind = await Veterinary.find({ huaweiId });
    const userFind = await User.find({ huaweiId });
    console.log(veterinaryFind);
    if (veterinaryFind.length !== 0 && userFind.length !== 0) {
      res.json({ oldUser: true, message: "Existing user" }).status(400);
    } else {
      const newVeterinary = new Veterinary({
        huaweiId,
        name,
        phone: phone || "",
        city,
        state,
        country,
        address,
      });
      const veterinarySaved = await newVeterinary.save();
      console.log(veterinarySaved);
      res.json({ oldUser: false, user: { ...veterinarySaved } }).status(200);
    }
  } catch (error) {
    res.json({ error: error.message }).status(200);
  }
};

const changeLocation = async (req,res) => {
  const { huaweiId } = req.params;
  const { latitude,longitude } = req.body;

  try {
    const vetFind = await Veterinary.findOne({ huaweiId });
    if (vetFind) {
      const location = {
        lat:latitude,
        lng:longitude
      }
      vetFind.ubication = location;
      const vet = await vetFind.save();
      res.json({ rol: "Veterinary", user: vet }).status(200);
    } else {
      res.json({ oldUser: false, message: "Not existing user" }).status(200);
    }
  } catch (error) {
    console.log("HOla");
    res.json({ message: error.message }).status(400);
  }
}

const changeOpen = async (req,res) => {
  const {huaweiId} = req.params;

  try {
    const vetFind = await Veterinary.findOne({ huaweiId });
    if (vetFind) {

      vetFind.open = !vetFind.open;
      const vet = await vetFind.save();
      res.json({ rol: "Veterinary", user: vet }).status(200);
    } else {
      res.json({ oldUser: false, message: "Not existing user" }).status(200);
    }
  } catch (error) {
    res.json({ message: error.message }).status(400);
  }
}

const addPhotoGallery = async (req, res) => {
  const { huaweiId } = req.params;
  const { url } = req.body;
  try {
    const vetFind = await Veterinary.findOne({ huaweiId });
    if (vetFind) {
      vetFind.photos.push(url);
      const vet = await vetFind.save();
      res.json({ rol: "Veterinary", user: vet }).status(200);
    } else {
      res.json({ oldUser: false, message: "Not existing user" }).status(200);
    }
  } catch (error) {
    console.log("HOla");
    res.json({ message: error.message }).status(400);
  }
};

const deletePhoto = async (req, res) => {
  const { huaweiId } = req.params;
  const { idPhoto } = req.body;
  try {
    const vetFind = await Veterinary.findOne({ huaweiId });
    if (vetFind) {
      console.log(idPhoto);
      vetFind.photos.splice(idPhoto, 1);
      console.log(vetFind.photos);
      const vet = await vetFind.save();
      res.json({ rol: "Veterinary", user: vet }).status(200);
    } else {
      res.json({ oldUser: false, message: "Not existing user" }).status(200);
    }
  } catch (error) {
    console.log("HOla");
    res.json({ message: error.message }).status(400);
  }
};

const changeHour = async (req, res) => {
    const {huaweiId} = req.params;
    const {  type, hour } = req.body;

  try {
    const vetFind = await Veterinary.findOne({ huaweiId });
    if (vetFind) {
      if (type === "apertura") {
        vetFind.hourIn = hour;
      } else {
        vetFind.hourOut = hour;
      }
      const vet = await vetFind.save();
      res.json({ rol: "Veterinary", user: vet }).status(200);
    } else {
      res.json({ oldUser: false, message: "Not existing user" }).status(200);
    }
  } catch (error) {
    console.log("HOla");
    res.json({ message: error.message }).status(400);
  }
};

const deleteService = async (req, res) => {
  const { huaweiId } = req.params;
  const { idService } = req.body;
  try {
    const vetFind = await Veterinary.findOne({ huaweiId });
    if (vetFind) {
      console.log(idService);
      vetFind.services.splice(idService, 1);
      console.log(vetFind.services);
      const vet = await vetFind.save();
      res.json({ rol: "Veterinary", user: vet }).status(200);
    } else {
      res.json({ oldUser: false, message: "Not existing user" }).status(200);
    }
  } catch (error) {
    console.log("HOla");
    res.json({ message: error.message }).status(400);
  }
};

const addService = async (req, res) => {
  const { huaweiId } = req.params;
  const { service } = req.body;
  try {
    const vetFind = await Veterinary.findOne({ huaweiId });
    if (vetFind) {
      vetFind.services.push(service);
      const vet = await vetFind.save();
      res.json({ rol: "Veterinary", user: vet }).status(200);
    } else {
      res.json({ oldUser: false, message: "Not existing user" }).status(200);
    }
  } catch (error) {
    console.log("HOla");
    res.json({ message: error.message }).status(400);
  }
};

module.exports = {
  getVeterinary,
  addVeterinary,
  addPhotoGallery,
  deletePhoto,
  addService,
  deleteService,
  changeHour,
  changeLocation,
  changeOpen
};
