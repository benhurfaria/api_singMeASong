import * as recommendationSongRepository from '../repositories/recommendationSongRepository.js';

async function postSongRecommendation ({ name, youtubeLink }) {
    const recommendation = await recommendationSongRepository.postSongRecommendation({name, youtubeLink});

    return recommendation;
}  

export {
    postSongRecommendation,
}       