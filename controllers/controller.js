
require('dotenv').config();
const axios = require('axios')
const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../utils/utils')
const WishListModel = require('../models/wishlistModel');


const getAllWishlist = async (req, res, next) => {
  try{
  console.log('all')
  const list = await WishListModel.find();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(list);
  }catch(err){
    res.status(500).json(err);
  }
};

const findByAuthor = async (req, res, next) => {

  try{
  const {authorLName} = req.query;
  console.log(authorLName)
  const result = await mongodb.getDb().db('books_db').collection('wishlist').find({authorLName});
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
  console.log('Single')
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
try{
  if (!utils.checkEmptyFields(req.body)){
    res.status(400).send({ message: 'Content can not be empty!' });
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




//OAUTH/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////

//redirect the user to github in order to login.
const login = async(req,res)=> {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
    );
};

async function receive (req, res){
  const code = req.query.code;
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code,
  };
  const opts = { headers: { accept: 'application/json' } };
  const response = await axios.post('https://github.com/login/oauth/access_token', body, opts)
  console.log(response)
  return res.status(200).end()
}

const loginCallback = async (req, res)=>{
 
//  res.write("Worked")
//  res.end()
const code = req.query.code;
const body = {
  client_id: process.env.GITHUB_CLIENT_ID,
  client_secret: process.env.GITHUB_CLIENT_SECRET ,
  code,
};
const opts = { headers: { accept: 'application/json' } };
const response = await axios.post('https://github.com/login/oauth/access_token', body, opts)

return res.status(200).json({token:response.data})

};


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



module.exports = {
  //wishlist
  getAllWishlist,
  findByAuthor,
  getSingleWish,
  createWish,
  updateWish,
  deleteWish,
  
  //Oauth
  loginCallback,
  login

  //findContent,
  //createBookmark,
  //updateBookmark,
  //deleteBookmark
  
};

