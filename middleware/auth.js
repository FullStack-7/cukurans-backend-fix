const jwt = require('jsonwebtoken')
require("dotenv").config();

const vt = (req, res, next) => {
    try {
        const header = req.headers.authorization
        if (!header) throw new Error("Invalid header")
    
        const token = header.split(" ")[1]
        if (!token) throw new Error("There is no token")
    
        const user = jwt.verify(token, process.env.JWT_KEY)
    
        req.user = user
        next()
    } catch (error) {
       res.status(400).json({ error: error.message })
    }
}

function verifyAdmin(req, res, next) {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
  
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      if (decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      req.userId = decoded.id;
      next();
    });
  }
  

module.exports = vt
