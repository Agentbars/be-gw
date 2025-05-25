import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

app.use(bodyParser.json());

let secretWord: string | null = null;
let guesses: { word: string; score: number }[] = [];

function getSimilarity(a: string, b: string): number {
    return Math.floor(Math.random() * 100);
}

app.post('/start', (req: Request, res: Response) => {
    secretWord = req.body.word;
    guesses = [];
    res.send({ message: `Загадано слово: ${secretWord}` });
});

// @ts-ignore
app.post('/guess', (req: Request, res: Response) => {
    if (!secretWord) return res.status(400).send({ error: 'Слово не загадано' });

    const word = req.body.word;
    const score = getSimilarity(secretWord, word);

    const result = { word, score };
    guesses.push(result);

    res.send(result);
});

app.get('/guesses', (req: Request, res: Response) => {
    res.send({ guesses });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
