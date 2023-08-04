const { authenticateToken } = require('../helpers/jwt');
const { executeQuery } = require('../env/connectionDatabase');

const authMiddleware = async (req, res, next) => {
  try {
    // Authenticate the token and get the decoded payload
    const decodedToken = await authenticateToken(req, res, next);

    // Extract the userId from the decoded payload
    const userId = decodedToken.userId;

    // Query the database to get the user with the matching userId
    const query = 'SELECT * FROM admin WHERE id = ?';
    const [user] = await executeQuery(query, [userId]);

    // If no user found with the given userId, return an error
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Attach the user object to the request for further processing in the route handlers
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error('Error executing user query:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = authMiddleware;
