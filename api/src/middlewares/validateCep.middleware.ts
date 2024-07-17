import { Request, Response, NextFunction } from "express";

const validateCep = (req: Request, res: Response, next: NextFunction) => {
  const { cep } = req.body;
  if (!cep) {
    return res.status(400).json({ message: "CEP é obrigatório." });
  }
  next();
};

export default validateCep;
