import express from 'express';
import { renderToString } from 'react-dom/server';
import { App } from './src/App';
import { INITIAL_DATA_KEY, type InitialData } from './src/types';

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.static('public'));

app.get('/api/data', (_request, response) => {
  response.json(createInitialData());
});

app.get('/', (_request, response) => {
  const initialData = createInitialData();
  const appHtml = renderToString(<App initialData={initialData} />);

  response.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Manual SSR With TypeScript</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script>
      window.${INITIAL_DATA_KEY} = ${serializeForInlineScript(initialData)};
    </script>
    <script type="module" src="/client.js"></script>
  </body>
</html>`);
});

app.listen(port, () => {
  console.log(`SSR server running at http://localhost:${port}`);
});

function createInitialData(): InitialData {
  return {
    message: 'Hello from TypeScript SSR server',
    serverTime: new Date().toISOString()
  };
}

function serializeForInlineScript(data: InitialData): string {
  return JSON.stringify(data).replace(/[&<>\u2028\u2029]/g, ch =>
    ({ '&': '\\u0026', '<': '\\u003c', '>': '\\u003e', '\u2028': '\\u2028', '\u2029': '\\u2029' })[ch]!,
  );
}
