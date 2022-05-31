import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
const secret = 'test123';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  

  let token = req.headers.authorization?.split(' ')[1];

  if (token) {
      jwt.verify(token, secret, (error, decoded) => {
          if (error) {
                
              return res.status(404).json({
                  message: error,
                  error
              });
          } else {
             
              res.locals.jwt = decoded;
              next();
          }
      });
  } else {
      return res.status(401).json({
          message: 'Unauthorized'
      });
  }
};

export default extractJWT;