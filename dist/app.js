"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.post('/converter', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fileName } = req.body;
        if (!fileName) {
            return res.status(400).send('Nome do arquivo não fornecido');
        }
        const inputFilePath = path_1.default.join(__dirname, 'uploads', fileName);
        const outputPath = path_1.default.join(__dirname, 'converted', `${path_1.default.parse(fileName).name}.pdf`);
        const command = `soffice --headless --convert-to pdf --outdir ${outputPath} ${inputFilePath}`;
        (0, child_process_1.exec)(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Erro ao converter o arquivo:', error);
                return res.status(500).send('Erro ao converter o arquivo');
            }
            if (stderr) {
                console.error('Erro no processo:', stderr);
                return res.status(500).send('Erro no processo de conversão');
            }
            console.log('Arquivo convertido com sucesso');
            return res.download(outputPath, `${path_1.default.parse(fileName).name}.pdf`, (err) => {
                if (err) {
                    return res.status(500).send('Erro ao baixar o arquivo convertido');
                }
                console.log('Arquivo baixado com sucesso');
            });
        });
    }
    catch (error) {
        console.error('Erro ao converter o arquivo:', error);
        res.status(500).send('Erro ao converter o arquivo');
    }
}));
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
