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

async function getRandomRecommendations(){
  let limit = (Math.random() > 0.7) ? '<=10' : '>10';

  let song = await recommendationSongRepository.getRandomRecommendations({limit});

  if(!song){
    song = await recommendationSongRepository.getRandom();
  }

  if(!song){
    return "não existe recomendacoes";
  }

  return song;
}

async function getTopSongs({ amount }){
  const topSongs = await recommendationSongRepository.getTopSongs({ amount });

  if(topSongs.length === 0) return false;

  return topSongs;
}

export { postSongRecommendation, updateVote, getRandomRecommendations, getTopSongs };
