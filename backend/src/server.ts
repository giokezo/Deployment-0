import express, { Request, Response } from 'express';
import cors from 'cors';

const server = express();
const PORT = process.env.PORT || 3001;

server.use(cors());
server.use(express.json());

let storedText = 'default-value';

server.post('/api/create-answer', (req: Request, res: Response) => {
  const { data: incomingText } = req.body;

  if (!incomingText) {
    res.status(400).json({ error: 'Missing "data" field in request body.' });
    return;
  }

  storedText = incomingText;
  res.status(200).json({ message: 'Text successfully stored.', text: incomingText });
});

server.get('/api/retrieve-text', (_req: Request, res: Response) => {
  res.status(200).json({ text: storedText });
});

server.listen(PORT, () => {
  console.log(`🚀 API is live on http://localhost:${PORT}`);
});
