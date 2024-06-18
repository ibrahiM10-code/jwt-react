import jwt from "jsonwebtoken";

// Middleware that verifies a user's token.
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, "mytokensecret", (err, decoded) => {
        if (err) {
            console.log(err);
            res.json({ message: "Authentication error." });
        } else {
            req.user = decoded; // decoded is the payload object, could be also named 'user'.
            next();
        }
    });
}

export default verifyToken;