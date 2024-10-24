require("dotenv").config();

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const rotasAluno = require('./api/alunoRotas');
const rotasAdm = require('./api/admRotas');
const rotasMonitor = require('./api/monitorRotas');
const port = process.env.PORT_SERVER || 5000;
import cors from 'cors';
import morgan from 'morgan';

app.use(cors({origin: 'http://localhost:8081'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/', rotasAluno);
app.use('/', rotasAdm);
app.use('/', rotasMonitor);

app.listen(port, () => {
    console.log(`rodando na porta: ${port}`);
});