import { recommendation } from '../schemas/validateSchema.js';
import * as recommendationSongServices from '../services/recommendationSongServices.js';

async function postSongRecommendation(req, res) {
  const validate = recommendation.validate(req.body);

  if (validate.error) {
    return res.sendStatus(400);
  }

  try {
    const result = await recommendationSongServices.postSongRecommendation(
      req.body
    );
    if (result !== 1) return res.sendStatus(400);

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function upVote(req, res) {
  const { id } = req.params;

  const operator = '+';

  try {
    const score = await recommendationSongServices.updateVote({ id, operator });
    if(score == false){
      return res.status(400).send({message: "nao existe esse som na lista"})
    }
    return res.status(200).send({ score });
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function downVote(req, res) {
  const { id } = req.params;

  const operator = '-';

  try {
    const score = await recommendationSongServices.updateVote({ id, operator });
    if(score == false){
      return res.status(400).send({message: "nao existe esse som na lista"})
    }
    return res.status(200).send({ score });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function randomRecommendation(req,res){
  try{
    const result = await recommendationSongServices.getRandomRecommendations();

    if(result === "não existe recomendacoes"){
      return res.sendStatus(404);
    }

    return res.status(200).send(result);
  }catch(err){
    return;
  }
}

export { postSongRecommendation, upVote, downVote, randomRecommendation };
