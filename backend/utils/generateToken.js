const jwt = require('jsonwebtoken');
const util = require('util');

const signAsync = util.promisify(jwt.sign);

const generateToken = async (user) => {
  try {
    const payload = {
      id: user._id,
      role: user.role,
      email: user.email
    };

    const token = await signAsync(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  } catch (error) {
    console.error('Erreur génération token:', error);
    throw error;
  }
};

module.exports = generateToken;
