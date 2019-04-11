import { Request, Response } from 'express';
import db from '../database'

class GamesController {

    public async list(req: Request, res: Response) {
        const gamesList = await db.query('SELECT * FROM game');
        res.json(gamesList)
    }
    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const gameId = await db.query('SELECT * FROM game WHERE id = ?', [id]);
        // console.log(gameId);
        if (gameId.length > 0) {
            return res.json(gameId[0]);
        } else {
            res.status(404).json({ message: 'Jogo não encontrado' })
        }
        res.json({ text: 'Jogo encontrado' });
    }
    public async create(req: Request, res: Response): Promise<void> {
        await db.query('INSERT INTO game set ?', [req.body]);
        res.json({ message: 'Jogo criado com sucesso!' })
    }
    public async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const gameUpdate = await db.query('UPDATE game set ? WHERE id = ?', [req.body, id]);

        if (gameUpdate.length > 0) {
            return res.json(gameUpdate[0]);
        } 
        res.json({ message: 'Jogo atualizado com sucesso !' })
    }
    public async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const gameDelete = await db.query('DELETE FROM game WHERE id = ?', [id]);

        if (gameDelete.length > 0) {
            return res.json(gameDelete[0]);
        } else {
            res.json({ message: 'O jogo não foi encontrado' });
        }
        res.json({ message: 'O jogo foi excluido com sucesso!' });
    }
}
const gameController = new GamesController();
export default gameController;