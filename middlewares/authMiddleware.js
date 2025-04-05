const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = {
    isAuthenticated: (request, response, next) => {
        try {
            const token = request.headers.authorization.split(' ')[1];

            if (!token) {
                return response.status(401).json({ message: 'Unauthorized' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);


            request.userId = decoded.id;

            next();
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }
}

module.exports = auth;