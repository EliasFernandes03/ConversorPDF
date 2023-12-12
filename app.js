const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); 
  },
});
const upload = multer({ storage });

app.post('/converter', upload.single('wordFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Nenhum arquivo enviado');
    }

    const filePath = req.file.path;
    const fileExtension = path.extname(filePath);
    if (fileExtension !== '.docx' && fileExtension !== '.doc') {
      fs.unlinkSync(filePath); 
      return res.status(400).send('Somente arquivos do Word são suportados');
    }

    const fileNameWithoutExtension = path.parse(filePath).name; 
    const pdfFileName = path.join('./uploads', `${fileNameWithoutExtension}.pdf`); 

    
    const pdfDoc = new PDFDocument();
    pdfDoc.pipe(fs.createWriteStream(pdfFileName));
    pdfDoc.text(`Conteúdo do arquivo Word: ${filePath}`);
    pdfDoc.end();

    fs.unlinkSync(filePath); 

    res.status(200).send(`Arquivo convertido para PDF com sucesso: ${pdfFileName}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
