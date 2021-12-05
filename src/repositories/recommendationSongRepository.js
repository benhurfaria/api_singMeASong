import { connection } from "../database.js";

async function postSongRecommendation ({name, youtubeLink}) {
    try {

        const putSong = await connection.query(`INSERT INTO video (name, "youtubeLink", score) VALUES ($1, $2, 0);`, [name, youtubeLink]);

        return putSong.rowCount;

    } catch (error) {
        return false;
    }
}

export { 
    postSongRecommendation,
}