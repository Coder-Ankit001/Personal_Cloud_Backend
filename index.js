import app from './src/app.js';
import env from './src/config/env.js';

const PORT = env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

