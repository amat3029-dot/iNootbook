const jwt = require('jsonwebtoken');
const JWT_Secreat_Key = 'amarjante';

const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token,JWT_Secreat_Key);
        req.user = data.user;
        next();
    }
    catch (error) {
        res.status(401).send("internal servar error");
    }
}

module.exports = fetchuser;