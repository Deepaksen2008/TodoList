let mongoose = require('mongoose');
let dbURL = "mongodb://localhost:27017/todolist"

// let Schema = mongoose.Schema
// const mySchema = new Schema()

const todoSchema = new mongoose.Schema({
    sn: Number,
    task: String,
    due_date: Date,
    comp_date: Date,
    current_date: Date,
    status: { type: String, default: 'Not start yet', enum: ['Not start yet', 'Progress', 'Completed'] },
    rem_date: {
        type: Number,
        default: function () {
            const oneDay = 24 * 60 * 60 * 1000;
            const currentDate = new Date();
            return Math.round((this.due_date.getTime() - currentDate.getTime()) / oneDay);
        }
    }
});

const TodoModel = mongoose.model('TodoModel', todoSchema, 'todo');

// const myModel = mongoose.model('myModel', mySchema, 'todo')

mongoose.connect(dbURL)
    .then(() => {
        console.log("MongoDB database Connected...");
    }).catch((err) => {
        console.log(err);
    })

module.exports = TodoModel