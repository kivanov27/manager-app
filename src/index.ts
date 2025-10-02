import app from './app.ts';
import { PORT } from './utils/config.ts';

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
