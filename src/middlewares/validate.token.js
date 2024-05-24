import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  //   const { token } = req.cookies;
  const authHeader = req.headers.authorization;
  console.log("AAAAAAAA", authHeader);
  const token = authHeader.split(" ")[1];
  console.log("authRequired y este es el token:", token);
  if (!token) return res.status(401).json({ message: "Token required" });

  jwt.verify(token, process.env.SECRET_KEY_JWT, (err, data) => {
    if (err) return res.status(401).json({ message: err.message });
    console.log(data);
    req.user = data; //pasamos info decodificada del usuario dentro del request
  });
  next();
};
