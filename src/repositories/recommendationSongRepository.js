import { connection } from '../database.js';

async function postSongRecommendation({ name, youtubeLink }) {
    const putSong = await connection.query(
      `INSERT INTO video (name, "youtubeLink", score) VALUES ($1, $2, 0);`,
      [name, youtubeLink]
    );

    return putSong.rowCount;
}

async function getSongById({ id }) {
    const getSong = await connection.query(
      `SELECT * FROM video WHERE id = $1;`,
      [id]
    );

    return getSong.rows;
}

async function updateScore({ id, operator }) {
    const updateSong = await connection.query(
      `UPDATE video SET score = score ${operator} 1 WHERE id = $1 RETURNING *;`,
      [id]
    );

    return updateSong.rows;
  
}

async function deleteSong({ id }) {
    await connection.query(`DELETE FROM video WHERE id = $1;`[id]);
}

async function getRandomRecommendations({limit}){
  const song = await connection.query(`SELECT * FROM video WHERE score ${limit} ORDER BY RANDOM();`);
  return song.rows[0];
}

async function getRandom(){
  const song = await connection.query(`SELECT * FROM video ORDER BY RANDOM();`);
  return song.rows[0];
}

export { postSongRecommendation, getSongById, updateScore, deleteSong, getRandomRecommendations, getRandom };
