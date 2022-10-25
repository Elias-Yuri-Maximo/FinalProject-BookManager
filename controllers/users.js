
require('dotenv').config();
const axios = require('axios')
const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../utils/utils')
const fields = [ 
  'firstName',
  'lastName',
  'nickName',
  'password']

const getAllUsers = async (req, res, next) => {
  try{
  console.log('all')
  const result = await mongodb.getDb().db('books_db').collection('users').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
  }catch(err){
    res.status(500).json(err);
  }
};

const createUser = async (req, res) => {
    console.log("CREATE")
  try{
    if(!utils.checkCorrectFields(fields, req.body)){
      res.status(400).send({ message: 'Not correct field!' });
      return;
     
    }
  
    const user= {
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      nickName:req.body.nickName,
      password:req.body.password
    };
   
    const response = await mongodb.getDb().db('books_db').collection('users').insertOne(user);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the wish.');
    }
  }catch(err){
    res.status(500).json(err);
  }
  };

  const getSingleUser = async (req, res, next) => {
    try{
    console.log('Get Single '+ req.params.id)
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('books_db')
      .collection('users')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  }catch(err){
    res.status(500).json(err);
  }
  };
  

const updateUser = async (req, res) => {
  console.log("Update")

  try{
  //check if empty fields: 
  //check 
  if(!utils.checkCorrectFields(fields, req.body)){
    res.status(400).send({ message: 'Not correct field!' });
    return;
   
  }

  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const user= {
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    nickName:req.body.nickName,
    password:req.body.password
  };
  const response = await mongodb
    .getDb()
    .db('books_db')
    .collection('users')
    .updateOne({ _id: userId }, {$set: user})
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user');
  }

}catch(err){
  res.status(500).json(err);
  console.log(err)
}
};

const deleteUser = async (req, res) => {
  console.log("Delete")
  try{
  const userId = new ObjectId(req.params.id);
  
  const response = await mongodb.getDb().db('books_db').collection('users').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
}catch(err){
  res.status(500).json(err);
}
};


/*
async function findContent(req, res){
  const bookName = req.params.id
  try{
    console.log('Single')
    const result = await mongodb
      .getDb()
      .db('bookOfMormon')
      .collection('content')
      .find({ _id: bookName });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  }catch(err){
    res.status(500).json(err);
  }

}
*/


module.exports = {
  //wishlist
  getAllUsers,
 
  createUser,
  getSingleUser,
  updateUser,
  deleteUser
  
};

