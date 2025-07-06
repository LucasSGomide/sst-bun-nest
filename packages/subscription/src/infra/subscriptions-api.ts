import cors from 'cors';
import express from 'express';
import type { Handler } from 'aws-lambda';
import serverlessExpress from '@codegenie/serverless-express';
import { helloWorldHandler } from './lambda';

export const api = express();
const router = express.Router();

api.use(cors());
api.use(express.json());

router.all(/(.*)/, (req, res, next) => {
    console.log('Original URL:', req.originalUrl);
    next();
});

router.get('/subscriptions', (req, res) => {
    res.status(200).json({ message: 'Hello subscriptions service.' });
});
router.get('/subscriptions/hello-world', helloWorldHandler);


api.use('/', router);

export const subscriptionsHandler: Handler = serverlessExpress({ app: api });
