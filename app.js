const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Define o diretório onde os arquivos serão armazenados temporariamente
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Define o nome do arquivo
  },
});
const upload = multer({ storage });

app.post('/converter', upload.single('wordFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Nenhum arquivo enviado');
    }

    const filePath = req.file.path;

    // Verifica se o arquivo enviado é um arquivo Word (opcional)
    const fileExtension = path.extname(filePath);
    if (fileExtension !== '.docx' && fileExtension !== '.doc') {
      // Se o arquivo não for um arquivo Word, você pode lidar com isso aqui
      fs.unlinkSync(filePath); // Remove o arquivo não suportado
      return res.status(400).send('Somente arquivos do Word são suportados');
    }

    // Lógica para converter o arquivo Word para PDF usando pdfkit
    const pdfDoc = new PDFDocument();
    const pdfFileName = `${Date.now()}_converted.pdf`;

    pdfDoc.pipe(fs.createWriteStream(pdfFileName));
    pdfDoc.text(`Conteúdo do arquivo Word: ${filePath}`); // Aqui você pode adicionar o conteúdo do arquivo ao PDF
    pdfDoc.end();

    // Remova os arquivos temporários após a conversão
    fs.unlinkSync(filePath); // Remove o arquivo Word temporário

    // Envie um status 200 OK indicando sucesso
    res.status(200).send('Arquivo convertido para PDF com sucesso!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
