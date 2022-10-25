
require('dotenv').config();
const axios = require('axios')
const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../utils/utils')
const fields = [ 
'notes',
'progress',
'grade'
]


const getAllReadings = async (req, res, next) => {
  try{
  console.log('all')
  const result = await mongodb.getDb().db('books_db').collection('readings').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
  }catch(err){
    res.status(500).json(err);
  }
};

const createReading = async (req, res) => {
    console.log("CREATE")
  try{
    if(!utils.checkCorrectFields(fields, req.body)){
      res.status(400).send({ message: 'Not correct field!' });
      return;
     
    }
  
    const reading= {
      notes:req.body.notes,
      progress:req.body.progress,
      grade:req.body.grade
    };
   
    const response = await mongodb.getDb().db('books_db').collection('readings').insertOne(reading);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the wish.');
    }
  }catch(err){
    res.status(500).json(err);
  }
  };

  const getSingleReading = async (req, res, next) => {
    try{
    console.log('Get Single '+ req.params.id)
    const readingId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('books_db')
      .collection('readings')
      .find({ _id: readingId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  }catch(err){
    res.status(500).json(err);
  }
  };
  

const updateReading = async (req, res) => {
  console.log("Update")

  try{
  //check if empty fields: 
  //check 
  if(!utils.checkCorrectFields(fields, req.body)){
    res.status(400).send({ message: 'Not correct field!' });
    return;
   
  }

  const readingId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const reading = {
    notes:req.body.notes,
    progress:req.body.progress,
    grade:req.body.grade
  };
  const response = await mongodb
    .getDb()
    .db('books_db')
    .collection('readings')
    .updateOne({ _id: readingId }, {$set: reading})
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the reading');
  }

}catch(err){
  res.status(500).json(err);
  console.log(err)
}
};

const deleteReading = async (req, res) => {
  console.log("Delete")
  try{
  const readingId = new ObjectId(req.params.id);
  
  const response = await mongodb.getDb().db('books_db').collection('readings').deleteOne({ _id: readingId }, true);
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
  getAllReadings,
  createReading,
  getSingleReading,
  updateReading,
  deleteReading

};

