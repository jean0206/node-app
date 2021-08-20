const User = require("../models/user");
const Veterinary = require("../models/veterinary");
const product = require("../models/product");

const addUser = async (req, res) => {
  const { huaweiId, name, email, photoPerfil, city, country, state } = req.body;

  try {
    const userFind = await User.find({ huaweiId });
    console.log(userFind);
    if (userFind.length != 0) {
      res.json({ oldUser: true, message: "Existing user" }).status(400);
    } else {
      const newUser = new User({
        huaweiId,
        name,
        email: email || "",
        photoPerfil: photoPerfil || "",
        city,
        state,
        country,
        products: [],
      });
      const userSaved = await newUser.save();
      res.json({ oldUser: false, user: { ...userSaved } }).status(200);
    }
  } catch (error) {
    res.json({ error: error.message }).status(200);
  }
};

const getCountries = (req, res) => {};

const addProduct = async (req, res) => {
  const { huaweiId, goal, photos, title, description, category } = req.body;
  try {
    const userFind = await User.findOne({ huaweiId });

    const product = {
      goal: goal,
      photos: photos,
      title: title,
      description: description,
      category: category,
      state:"Disponible"
    };
    console.log(userFind);
    userFind["products"].push(product);
    const newUser = await userFind.save();
    res.json({ user: newUser }).status(200);
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message }).status(400);
  }
};

const getAllProducts = async (req, res) => {
  const {country, city, state } = req.body;
  try {
    const products = await User.find({ country, city, state });
    const allProducts = []
    
    products.map((user) => {
        user.products.map(product=>{
            allProducts.push({
                id:user.huaweiId,
                goal:product.goal,
                photos:product.photos,
                title:product.title,
                description:product.description,
                category:product.category,
                state:product.state,
            })
        })
     
    });
    console.log(allProducts);
    res.json({ products:allProducts}).status(200);
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message }).status(400);
  }
};

const verifyId = async (req, res) => {
  const { huaweiId } = req.params;
  console.log("JOJKDPOASKDPOA")
  try {
    const userFind = await User.find({ huaweiId });
    if (userFind.length != 0) {
      console.log("HOla");
      res.json({ oldUser: true, message: "Existing user",user:userFind[0]}).status(200);
    } else {
      res.json({ oldUser: false, message: "Not existing user" }).status(200);
    }
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message }).status(400);
  }
};

const verifyType = async (req, res) => {
  const { huaweiId } = req.params;
  try {
    const userFind = await User.findOne({ huaweiId });
    const vetFind = await Veterinary.findOne({ huaweiId });
    if (userFind) {
      res.json({ type: "user" }).status(200);
    } else if (vetFind) {
      const location = {
        latitude: vetFind.ubication.lat,
        longitude: vetFind.ubication.lng,
      };
      console.log(vetFind.ubication);

      res.json({ type: "veterinary", location }).status(200);
    }
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message }).status(400);
  }
};

const getBasicInfo = async (req, res) => {
  const { huaweiId } = req.params;
  try {
    const userFind = await User.findOne({ huaweiId });
    const vetFind = await Veterinary.findOne({ huaweiId });
    if (userFind) {
      console.log("HOla");
      res.json({ rol: "Usuario", user: userFind }).status(200);
    } else if (vetFind) {
      res.json({ rol: "Veterinary", user: vetFind }).status(200);
    } else {
      res.json({ oldUser: false, message: "Not existing user" }).status(200);
    }
  } catch (error) {
    console.log("HOla");
    res.json({ message: error.message }).status(400);
  }
};

const editPhoto = async (req, res) => {
  const { huaweiId } = req.params;
  const { url } = req.body;
  try {
    const userFind = await User.findOne({ huaweiId });
    const vetFind = await Veterinary.findOne({ huaweiId });
    if (userFind) {
      userFind.photo = url;
      const saved = await userFind.save();
      res.json({ rol: "Usuario", user: saved }).status(200);
    } else if (vetFind) {
      vetFind.photoPerfil = url;
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

const getVeternaries = async (req, res) => {
  const { huaweiId } = req.params;
  try {
    const userFind = await User.findOne({ huaweiId });
    const vetsFind = await Veterinary.find({
      city: userFind.city,
      country: userFind.country,
      state: userFind.state,
    });
    if (vetsFind) {
      res.json({ vetsFind }).status(200);
    } else {
      res.json({ vetsFind: [] }).status(200);
    }
  } catch (error) {
    console.log("HOla");
    res.json({ message: error.message }).status(400);
  }
};

const editUser = async (req, res) => {
  const {id,country,city,state} = req.body;
  try {
      const user = await User.findOne({huaweiId:id})
      user.country = country;
      user.city = city;
      user.state = state;
      const userSaved = await user.save();
      res.send(userSaved);
  } catch (error) {
    
  }
}

module.exports = {
  addUser,
  verifyId,
  getBasicInfo,
  editPhoto,
  verifyType,
  getVeternaries,
  addProduct,
  getAllProducts,
  editUser
};
