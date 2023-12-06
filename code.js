// /models/User.js

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema(
//   name:  type: String, required: true ,
//   appleId:  type: String, unique: true, required: true ,
//   email:  type: String, required: true ,
//   isKid:  type: Boolean, default: false ,
//   shareId:  type: String, unique: true 
// );

// module.exports = mongoose.model('User', userSchema);

/controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const createToken = (userId) => {
  return jwt.sign( userId , process.env.JWT_SECRET);
;

const generateShareId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let shareId = ”;
  for (let i = 0; i < 6; i++) {
    shareId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return shareId;
;

exports.register = async (req, res) => {
  try {
    const  name, email, appleId, isKid  = req.body;

    // check if user already exists
    const existingUser = await User.findOne( or: [ email ,  appleId ] );
    if (existingUser) {
      return res.status(400).json( error: 'User already exists' );
    }

    // create new user
    const user = new User( name, email, appleId, isKid );
    if (!isKid) {
      user.shareId = generateShareId();
    }
    await user.save();

    // create token
    const token = createToken(user._id);

    // return user data
    res.json( userId: user._id, token, name: user.name, isKid: user.isKid );
   catch (error) {
    console.error(error);
    res.status(500).json( error: 'Server error' );
  };

exports.login = async (req, res) => {
  try {
    const  email, appleId  = req.body;

    // check if user exists
    const user = await User.findOne(or: [ email ,  appleId ] );
    if (!user) {
      return res.status(400).json( error: 'Invalid credentials' );
    }

    // regenerate token
    const token = createToken(user._id);
    user.token = token;
    await user.save();

    // return user data
    res.json( userId: user._id, token, name: user.name, isKid: user.isKid );
   catch (error) {
    console.error(error);
    res.status(500).json( error: 'Server error' );
  };

exports.auth = async (req, res) => {
  try {
    const  userId  = req.user;

    // check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json( error: 'Invalid credentials' );
    }

    res.json( message: 'Authenticated' );
   catch (error) {
    console.error(error);
    res.status(500).json( error: 'Server error' );
  };

// /routes/authRouter.js

// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');
// const authMiddleware = require('../middlewares/authMiddleware');

// router.post('/register', authController.register);
// router.post('/login', authController.login);
// router.get('/auth', authMiddleware, authController.auth);

// module.exports = router;
