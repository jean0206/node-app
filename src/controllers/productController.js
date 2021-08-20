const Product = require("../models/product");
const Offert = require("../models/offert");
const Notification = require("../models/notification");

const addProduct = async (req, res) => {
  const {
    ownerId,
    name,
    description,
    goal,
    category,
    photos,
    country,
    city,
    state,
  } = req.body;

  try {
    const newProduct = new Product({
      ownerId,
      name,
      description,
      goal,
      category,
      photos,
      country,
      city,
      actual:'En oferta',
      state,
    });
    const producSaved = await newProduct.save();
    res.send({ message: "Product was saved successfully" });
  } catch (error) {
    res.send({ message: error.message });
  }
};

const getAllProduct = async (req, res) => {
  const { ownerId, country, city, state } = req.body;
  console.log(state);
  try {
    const products = await Product.find({
      $and: [
        {
          ownerId: { $ne: ownerId },
          city: city,
          country: country,
          state: state,
          actual:{$ne:'No disponible'}
        },
      ],
    });
    res.send(products);
  } catch (error) {
    res.send({ message: error.message });
  }
};

const addOffert = async (req, res) => {
  const {
    productId,
    name,
    photos,
    price,
    description,
    ownerId,
    ownerName,
  } = req.body;
  try {
    const newOffert = new Offert({
      productId,
      name,
      photos,
      price,
      description,
      state:"Enviada",
      ownerId,
      ownerName,
    });
    const saveOffert = await newOffert.save();
    res.send({ message: "Offert was saved successfully" });
  } catch (error) {}
};

const acceptOffert = async (req, res) => {
  const {id, productId} = req.body;
  try {
    const offert = await Offert.findOne({_id:id})
    offert.state = "Aceptada"
    const savedOffert = await offert.save()
    const product = await Product.findOne({_id:productId})
    product.actual = "No disponible"
    const savedProduct = await product.save()
    const changesOfferts = await Offert.updateMany({$and:[{_id:{$ne:id}},{productId:productId}]},{state:'Rechazada'})
    res.send(savedOffert)
  } catch (error) {
      res.send(error.message)
  }
}

const refuseOffert = async (req, res) => {
  const {id, productId} = req.body;
  try {
    const offert = await Offert.findOne({_id:id})
    offert.state = "Rechazada"
    const savedOffert = await offert.save()
    res.send(savedOffert)
  } catch (error) {
      res.send(error.message)
  }
}

const getOffert = async (req, res) => {
  const {id} = req.params
  try {
    const offertNot = await Offert.find({productId: id,state:'Aceptada'})
    if(offertNot.length === 0) {
      const offerts = await Offert.find({productId:id})
      res.send({offerts: offerts})
    }else{
      res.send({offerts:[]})
    }
  } catch (error) {
    res.send({message: error.message})
  }
}

const getProducts = async (req, res) => {
    const {id} = req.params
    try {
        const products = await Product.find({ownerId:id,actual:{$ne:'No disponible'}})
        console.log((products))
        res.send({products: products})
    } catch (error) {
      
    }
}

module.exports = { addProduct, getAllProduct, addOffert, getOffert, getProducts, acceptOffert, refuseOffert};
