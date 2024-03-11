import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn : "15d",
    });

// Set cookie with JWT token and maxAge of 1 hour
res.cookie("jwt", token, {
    maxAge: 15* 24 * 60 * 60 * 1000, // 1 hour in milliseconds
    httpOnly: true, // Cookie is accessible only through HTTP(S) requests, not through JavaScript
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
});
}

export default generateTokenAndSetCookie;