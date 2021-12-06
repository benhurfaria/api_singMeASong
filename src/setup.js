import dotenv from 'dotenv';

const path =
  process.env.NODE_ENV === 'production'
    ? '.env'
    : process.env.NODE_ENV === 'dev'
    ? '.env'
    : '.env';

dotenv.config({ path });