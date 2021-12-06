import * as recommendationSongRepository from '../repositories/recommendationSongRepository.js';

async function postSongRecommendation({ name, youtubeLink }) {
  const recommendation =
    await recommendationSongRepository.postSongRecommendation({
      name,
      youtubeLink,
    });

  return recommendation;
}

async function updateVote({ id, operator }) {
  const getSong = await recommendationSongRepository.getSongById({ id });

  if (getSong.length === 0) {
    return false;
  }

  const song = await recommendationSongRepository.updateScore({ id, operator });

  if (song[0].score <= -5) {
    await recommendationSongRepository.deleteSong({ id });
    return 'foi deletado';
  }

  return song[0].score;
}

export { postSongRecommendation, updateVote };
