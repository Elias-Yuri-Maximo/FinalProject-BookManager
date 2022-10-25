
require('dotenv').config();
const axios = require('axios')
const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../utils/utils')
const fields = [    'authorFName',
  'authorLName',
  'user',
  'title',
  'genre',
  'pages',
  'preview']

const getAllWishlist = async (req, res, next) => {
  try{
  console.log('all')
  const result = await mongodb.getDb().db('books_db').collection('wishlist').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
  }catch(err){
    res.status(500).json(err);
  }
};

const getSingleWish = async (req, res, next) => {
  try{
  console.log('Get Single')
  const wishId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('books_db')
    .collection('wishlist')
    .find({ _id: wishId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
}catch(err){
  res.status(500).json(err);
}
};


const createWish = async (req, res) => {
  console.log("CREATE")
try{
  if(!utils.checkCorrectFields(fields, req.body)){
    res.status(400).send({ message: 'Not correct field!' });
    return;
   
  }




  console.log('adding new bookmark')
  console.log('Body '+req.body)
  const wish = {
    authorFName:req.body.authorFName,
    authorLName:req.body.authorLName,
    user:req.body.user,
    title:req.body.title,
    genre:req.body.genre,
    pages:req.body.pages,
    preview:req.body.preview,
  };
 
  const response = await mongodb.getDb().db('books_db').collection('wishlist').insertOne(wish);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the wish.');
  }
}catch(err){
  res.status(500).json(err);
}
};

const updateWish = async (req, res) => {
  console.log("Update")
  if(!utils.checkCorrectFields(fields, req.body)){
    res.status(400).send({ message: 'Not correct field!' });
    return;
   
  }

  try{
  //check if empty fields: 
  //check 
  if (!(utils.checkEmptyFields(req.body))){
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }


  const wishId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const wish = {
    authorFName:req.body.authorFName,
    authorLName:req.body.authorLName,
    user:req.body.user,
    title:req.body.title,
    genre:req.body.genre,
    pages:req.body.pages,
    preview:req.body.preview,
  };
  

  const response = await mongodb
    .getDb()
    .db('books_db')
    .collection('wishlist')
    .updateOne({ _id: wishId }, {$set: wish})
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the wishlist');
  }

}catch(err){
  res.status(500).json(err);
}
};

const deleteWish = async (req, res) => {
  console.log("Delete")
  try{
  const wishId = new ObjectId(req.params.id);
  
  const response = await mongodb.getDb().db('books_db').collection('wishlist').deleteOne({ _id: wishId }, true);
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

const findByAuthor = async (req, res, next) => {
 
  try{
  const {authorLName} = req.query;
  console.log("findByAuthor"+authorLName)
  const result = await mongodb.getDb().db('books_db').collection('wishlist').find({authorLName});
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);

  });
  }catch(err){
    res.status(500).json(err);
  }

};

const findByTitle = async (req, res, next) => {
  //Problems because of the spaces
  try{
  const {title} = req.query;
  //Retorna undefined
  console.log('Title '+title)
  const result = await mongodb.getDb().db('books_db').collection('wishlist').find({title});
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
  }catch(err){
    res.status(500).json(err);
  }
};

const findByGenre = async (req, res, next) => {

  try{
  const {genre} = req.query;
  console.log(genre)
  const result = await mongodb.getDb().db('books_db').collection('wishlist').find({genre});
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
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
  getAllWishlist,
  getSingleWish,
  createWish,
  updateWish,
  deleteWish,

  findByTitle,
  findByAuthor,
  findByGenre

};

