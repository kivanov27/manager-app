import 'dotenv/config';

const PORT: string | undefined = process.env.PORT;
const URL: string | undefined = process.env.NODE_ENV === 'test'
    ? process.env.TEST_URL
    : process.env.URL;

export { PORT, URL };
