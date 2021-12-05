import express from 'express';
import cors from 'cors';
import * as recommendationSongController from './controllers/recommendationSongController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", recommendationSongController.postSongRecommendation);

export default app;
