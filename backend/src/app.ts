import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import cors from 'cors';
import errorHandler from './middlewares/error-handler';
import { DB_ADDRESS } from './config';
import routes from './routes';

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect(DB_ADDRESS);

// Только для локальных тестов. Не используйте это в продакшене
const corsOptions = {
	origin: ['https://kpd.igornk.nomoredomainswork.ru'],
	allowedHeaders: ["Content-Type", "Authorization", "Access-Controll-Allow-Methods", "Access-Control-Request-Headers"],
	credentials: true,
	enablePreflight: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/crash-test', () => {
	setTimeout(() => {
		throw new Error("Сервер сейчас упадет");
	}, 0);
});
app.use(routes);
app.use(errors());
app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('ok'));
