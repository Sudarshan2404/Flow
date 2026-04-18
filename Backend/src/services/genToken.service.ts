import jwt from "jsonwebtoken";

export const genreatetoken = (userId: object) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!userId) {
    return "Cannot genreate a token";
  }
  // @ts-ignore
  const token = jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

export const verifyToken = (token: string) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  // @ts-ignore
  const decode = jwt.verify(token, JWT_SECRET);

  if (!decode) {
    return "Not a Valid Token";
  }

  return decode;
};
