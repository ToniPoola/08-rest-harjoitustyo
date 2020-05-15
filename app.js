// npm init
// npm install express
// npm install mongoose
// npm install nodemon --save-dev
// npm run start-dev

const express = require('express');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

const app = express();

const body_parser = require('body-parser');

const machining_controller = require('./machining_controller');//machining

app.use(body_parser.json()); //req.body.name
app.use(body_parser.urlencoded({
    extended: true
})); //material/id

app.use((req, res, next) => {
    console.log(req.method, ' ', req.path);
    next();
}); // GET /api/materials

//CREATE
app.post("/machining-parameter-set", machining_controller.api_post_machining_parameter_set); //machining

// READ ALL
app.get("/machining-parameter-sets", machining_controller.api_get_machining_parameter_sets);
// READ by id
app.get("/machining-parameter-set/:id", machining_controller.api_get_machining_parameter_set);

// UPDATE
//app.patch korvaa vain tietyt kentät
//app.put korvaa koko tiedon
app.put("/machining-parameter-set/:id", machining_controller.api_put_machining_parameter_set);

// DELETE
app.delete("/machining-parameter-set/:id", machining_controller.api_delete_machining_parameter_set);

//polku clusteriin
const database_uri = "mongodb+srv://server:LckmK9T1HrTr1gbb@cluster0-2t6ml.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(database_uri, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('database connected');
    app.listen(port);
}).catch(err => {
    console.log(err);
});