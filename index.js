import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views/'));
app.set('view engine', 'ejs');
const PORT = 4000;

let users = [];
let userName = [];
let Nusers= [];



app.get("/", (req, res) => {
        res.render("login");
});



app.post("/", (req, res) => {
        let user = req.body.name;
        userName.push(user);
        res.render("index", { name: userName[userName.length - 1] });
});

app.post("/submit", (req, res) => {
        users.push(req.body)
        Nusers = users.sort((a, b) => b.S - a.S || users.indexOf(b) - users.indexOf(a));
        res.render("result", { name: req.body.N, score: req.body.S })
})

app.get("/result", (req, res) => {
        res.render("scoreboard", { users: Nusers });
});






app.listen(process.env.PORT || PORT, () => {
        console.log(`server is started on ${PORT}`)
})