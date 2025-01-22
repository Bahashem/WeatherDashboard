//import path from 'node:path';
//import { fileURLToPath } from 'node:url';
//import { Router } from 'express';
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
import { Router, Request, Response } from 'express';
const router = Router();

// TODO: Define route to serve index.html
router.get('/', (requestAnimationFrame: Request, res: Response) +>{
res.sendFile('index.html', {root: '../client/dist'});
});

export default router;
