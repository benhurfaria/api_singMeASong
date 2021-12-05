import { recommendation } from '../schemas/validateSchema.js';
import * as recommendationSongServices from '../services/recommendationSongServices.js';

async function postSongRecommendation(req, res) {

    const validate = recommendation.validate(req.body);

    if(validate.error){
        return res.sendStatus(400);
    }

    try{

        const result = await recommendationSongServices.postSongRecommendation(req.body);
        if (result !== 1) return res.sendStatus(400);
        
        res.sendStatus(200);

    } catch (error) {

        res.sendStatus(500);

    }
}

export {
    postSongRecommendation,
}