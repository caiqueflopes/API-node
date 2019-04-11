"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gamesList = yield database_1.default.query('SELECT * FROM game');
            res.json(gamesList);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const gameId = yield database_1.default.query('SELECT * FROM game WHERE id = ?', [id]);
            // console.log(gameId);
            if (gameId.length > 0) {
                return res.json(gameId[0]);
            }
            else {
                res.status(404).json({ message: 'Jogo não encontrado' });
            }
            res.json({ text: 'Jogo encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO game set ?', [req.body]);
            res.json({ message: 'Jogo criado com sucesso!' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const gameUpdate = yield database_1.default.query('UPDATE game set ? WHERE id = ?', [req.body, id]);
            if (gameUpdate.length > 0) {
                return res.json(gameUpdate[0]);
            }
            res.json({ message: 'Jogo atualizado com sucesso !' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const gameDelete = yield database_1.default.query('DELETE FROM game WHERE id = ?', [id]);
            if (gameDelete.length > 0) {
                return res.json(gameDelete[0]);
            }
            else {
                res.json({ message: 'O jogo não foi encontrado' });
            }
            res.json({ message: 'O jogo foi excluido com sucesso!' });
        });
    }
}
const gameController = new GamesController();
exports.default = gameController;
