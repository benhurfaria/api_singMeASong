import { connection } from '../database.js';

async function postSongRecommendation({ name, youtubeLink }) {
  try {
    const putSong = await connection.query(
      `INSERT INTO video (name, "youtubeLink", score) VALUES ($1, $2, 0);`,
      [name, youtubeLink]
    );

    return putSong.rowCount;
  } catch (error) {
    return false;
  }
}

async function getSongById({ id }) {
  try {
    const getSong = await connection.query(
      `SELECT * FROM video WHERE id = $1;`,
      [id]
    );

    return getSong.rows;
  } catch (error) {
    return false;
  }
}

async function updateScore({ id, operator }) {
  try {
    const updateSong = await connection.query(
      `UPDATE video SET score = score ${operator} 1 WHERE id = $1 RETURNING *;`,
      [id]
    );

    return updateSong.rows;
  } catch (error) {
    return false;
  }
}

async function deleteSong({ id }) {
  try {
    await connection.query(`DELETE FROM video WHERE id = $1;`[id]);
  } catch (err) {
    return;
  }
}

export { postSongRecommendation, getSongById, updateScore, deleteSong };
