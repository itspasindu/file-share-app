const otplib = require('otplib');

function generateTOTPSecret() {
  return otplib.authenticator.generateSecret();
}

function verifyTOTP(secret, token) {
  return otplib.authenticator.check(token, secret);
}

module.exports = { generateTOTPSecret, verifyTOTP };
