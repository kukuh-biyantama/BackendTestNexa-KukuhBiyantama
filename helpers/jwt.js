const jwt = require('jsonwebtoken');

const secretKey = 'nexatest'; // Replace with your desired secret key

const generateToken = (data) => {
  return jwt.sign(data, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
};

// const authenticateToken = async (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token || !token.startsWith('Bearer ')) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   const tokenString = token.split(' ')[1];

//   try {
//     const decodedToken = jwt.verify(tokenString, secretKey);
//     req.user = decodedToken;
//     next();
//   } catch (err) {
//     console.error('Error verifying token:', err.message);
//     return res.status(401).json({ error: 'Invalid token' });
//   }
// };

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const tokenString = token.split(' ')[1];

  try {
    const decodedToken = jwt.verify(tokenString, secretKey);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error('Error verifying token:', err.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { generateToken, authenticateToken };