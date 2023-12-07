"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var PORT = 3000;
app.get('/', function (req, res) {
    res.send('Olá, mundo!');
});
app.listen(PORT, function () {
    console.log("Servidor est\u00E1 rodando na porta ".concat(PORT));
});
