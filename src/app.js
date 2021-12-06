import express from 'express';
import cors from 'cors';
import * as recommendationSongController from './controllers/recommendationSongController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", recommendationSongController.postSongRecommendation);
app.post("/recommendations/:id/upvote", recommendationSongController.upVote);
app.post("/recommendations/:id/downvote", recommendationSongController.downVote);

export default app;
