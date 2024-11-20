const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateTOTPSecret, verifyTOTP } = require('../utils/totp');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const totpSecret = generateTOTPSecret();
  const newUser = new User({ email, password, totpSecret });
  await newUser.save();
  res.json({ message: 'User registered successfully', totpSecret });
});

router.post('/login', async (req, res) => {
  const { email, password, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

  if (!verifyTOTP(user.totpSecret, otp)) {
    return res.status(401).json({ error: 'Invalid OTP' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });
  res.json({ token });
});

module.exports = router;
