import * as recommendationSongServices from '../src/services/recommendationSongServices.js';
import * as recommendationSongRepository from '../src/repositories/recommendationSongRepository.js';

describe('POST /recommendations', () => {
  test('should return 1', async () => {
    const song = {
      name: 'Falamansa',
      youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
    };
    jest
      .spyOn(recommendationSongRepository, 'postSongRecommendation')
      .mockImplementation(() => 1);
    const recommendation =
      await recommendationSongServices.postSongRecommendation(song);
    expect(recommendation).toEqual(1);
  });
});

describe('POST /recommendations/:id/upvote and downvote', () => {
  test('should return song', async () => {
    jest
      .spyOn(recommendationSongRepository, 'getSongById')
      .mockImplementationOnce(() => {
        return {
          id: 1,
          name: 'aleatorio',
          youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
          score: 0,
        };
      });

    jest
      .spyOn(recommendationSongRepository, 'updateScore')
      .mockImplementationOnce(() => {
        return [
          {
            id: 1,
            name: 'aleatorio',
            youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
            score: 1,
          },
        ];
      });

    const up = await recommendationSongServices.updateVote({
      id: 1,
      operator: '+',
    });
    expect(up).toEqual(1);
  });

  test('should return false', async () => {
    jest
      .spyOn(recommendationSongRepository, 'getSongById')
      .mockImplementationOnce(() => {
        return [];
      });
    const up = await recommendationSongServices.updateVote({
      id: 1,
      operator: '+',
    });
    expect(up).toEqual(false);
  });

  test('should return string', async () => {
    jest
      .spyOn(recommendationSongRepository, 'getSongById')
      .mockImplementationOnce(() => {
        return {
          id: 1,
          name: 'aleatorio',
          youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
          score: -5,
        };
      });

    jest
      .spyOn(recommendationSongRepository, 'updateScore')
      .mockImplementationOnce(() => {
        return [
          {
            id: 1,
            name: 'aleatorio',
            youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
            score: -6,
          },
        ];
      });

    jest
      .spyOn(recommendationSongRepository, 'deleteSong')
      .mockImplementationOnce(() => {
        return;
      });
    const up = await recommendationSongServices.updateVote({
      id: 1,
      operator: '+',
    });
    expect('foi deletado').toEqual(up);
  });
});

describe('POST /recommendations/top/:amount', () => {
  test('should return songs', async () => {
    const arr = [
      {
        id: 14,
        name: 'teste',
        youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
        score: 18,
      },
      {
        id: 15,
        name: 'teste',
        youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
        score: 4,
      },
    ];
    jest
      .spyOn(recommendationSongRepository, 'getTopSongs')
      .mockImplementationOnce(() => {
        return arr;
      });
    const song = await recommendationSongServices.getTopSongs({ amount: 2 });
    expect(arr).toEqual(song);
  });
});

describe('POST /recommendations/random', () => {
  test('should return random song', async () => {
    const obj = {
      id: 15,
      name: 'falamansa',
      youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
      score: 4,
    };
    jest
      .spyOn(recommendationSongRepository, 'getRandomRecommendations')
      .mockImplementationOnce(() => {
        return obj;
      });
    const random = await recommendationSongServices.getRandomRecommendations();
    expect(obj).toEqual(random);
  });

  test('should return string', async () => {
    jest
      .spyOn(recommendationSongRepository, 'getRandomRecommendations')
      .mockImplementationOnce(() => {
        return;
      });
    jest
      .spyOn(recommendationSongRepository, 'getRandom')
      .mockImplementationOnce(() => {
        return;
      });
    const random = await recommendationSongServices.getRandomRecommendations();
    expect('não existe recomendacoes').toEqual(random);
  });

  test('should return string', async () => {
    const obj = {
      id: 15,
      name: 'falamansa',
      youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
      score: 4,
    };
    jest
      .spyOn(recommendationSongRepository, 'getRandomRecommendations')
      .mockImplementationOnce(() => {
        return;
      });
    jest
      .spyOn(recommendationSongRepository, 'getRandom')
      .mockImplementationOnce(() => {
        return obj;
      });
    const random = await recommendationSongServices.getRandomRecommendations();
    expect(obj).toEqual(random);
  });
});
