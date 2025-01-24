import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { Router, Request, Response } from 'express';
const router = Router();

// TODO: Define route to serve index.html
router.get('/', (_req : Request, res: Response) =>{
res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

export default router;
