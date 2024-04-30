import express from "express";
import exphbs from "express-handlebars";
import fs from "fs";
import path from "path";

const app = express();
const port = 3000;

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let data = JSON.parse(fs.readFileSync("products-data.json", "utf-8"));

app.engine(
  "handlebars",
  exphbs.engine({
    layoutsDir: path.join(__dirname, "views"),
    partialsDir: [
      path.join(__dirname, "views/components/"),
    ],
    defaultLayout: null,
    extname: "handlebars",
  })
);

app.set("view engine", "handlebars");
app.use("/css", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/jquery/dist")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));

app.get("/", function (req, res) {
  res.render("main", {
    layout: "main",
    indexTitle: "BIENVENIDO A MERCADO WEB. POR FAVOR, SELECCIONE SUS PRODUCTOS:",
    documentTitle: "Desafío Mercado Web",
    productsData: data,
  });
});

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);