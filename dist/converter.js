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
exports.converterTextoParaPDF = void 0;
// src/converter.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const html_pdf_1 = __importDefault(require("html-pdf"));
function converterTextoParaPDF(texto) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const tempHTMLPath = path_1.default.join(__dirname, 'temp.html');
            const htmlContent = `<html><body><pre>${texto}</pre></body></html>`;
            fs_1.default.writeFileSync(tempHTMLPath, htmlContent, 'utf-8');
            const outputPath = path_1.default.join(__dirname, 'output.pdf');
            const htmlToPdfOptions = {
                format: 'A4' // Definir um formato de página válido, por exemplo, 'A4'
            };
            html_pdf_1.default.create(htmlContent, htmlToPdfOptions).toFile(outputPath, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(outputPath);
                }
            });
        });
    });
}
exports.converterTextoParaPDF = converterTextoParaPDF;
