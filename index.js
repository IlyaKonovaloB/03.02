const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const server = http.createServer(app);
const port = 2000;
const jsonfile = require('jsonfile');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable("x-powered-by");

app.use((err, req, res, next) => {
	logger.error(err.stack);
	res.status(500).send("Вы сломали сервер!");
});

app.use((err, req, res, next) => {
	if (error instanceof ForbiddenError) {
		return res.status(403).send({
			status: "forbidden",
			message: error.message,
		});
	}
});

let polzvatel = require('./internetshop/polzvatel.json');

app.get('/polzvatel', (req, res) => {
	return res.status(200).json(polzvatel)
});
app.get('/polzvatel/:id', (req, res) => {
	let id = req.params.id;
	return res.status(200).json(polzvatel[id])
});

app.post('/polzvatel', (req, res) => {
	if (!req.body) return res.sendStatus(400)
	const user = {
		id: data.length,
		type: req.body.type,
		number: req.body.number,
		Email: req.body.Email,
		pasword: req.body.pasword,
		del: req.body.del
	}
	jsonfile.readFile('polzvatel.json', (err, obj) => {
		if (err) throw err
		let fileObj = obj;
		fileObj.push(user);
		jsonfile.writeFile('polzvatel.json', fileObj, (err) => {
			if (err) throw err;
		})
		res.send(obj)
	})
})

app.set('view engine', 'pug')
server.listen(port, () => {
	console.log("\x1b[35m%s\x1b[0m", `The server is running on the port ${port}`);
	console.log("\x1b[32m%s\x1b[0m", `http://localhost:${port}/`);
});
module.exports = { server, app };