import { Router } from 'express';

const router = Router();

router.get('/', (req, res) =>
  res.status(200).json({
    message: 'Welcome to visand is an e-commerce web service API',
  }),
);

export default router;
