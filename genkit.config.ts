import { genkit } from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/googleai';

export default genkit({
  plugins: [googleAI()],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});