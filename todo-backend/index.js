const express = require("express")
const TodoModel = require('./mongoDBconnection')
const connection = require('./dbconnection')
const cors = require("cors")

let app = express();
app.use(express.json());
let port = 5000;

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}))

/*-------------------------------------------------------------------------------*/

// app.get("/view", (req, res) => {
//     let pgquery = "SELECT * FROM todolist ORDER BY task_id DESC";
//     connection.query(pgquery, function (err, result) {
//         if (err) {
//             console.log(err.message);
//         } else {
//             res.send(result.rows);
//         }
//     });
// });


// app.post("/add", (req, res) => {
//     let data = req.body;
//     console.log(data);

//     let pgsql = "INSERT INTO todolist(task, due_date, comp_date) VALUES ($1, $2, CURRENT_DATE )";

//     connection.query(pgsql, [data.task, data.due_date], (err, result) => {
//         if (err) {
//             console.log(err.message);
//         } else {
//             res.send(result);
//         }
//     });
// });

// app.delete("/delete", (req, res) => {
//     let id = req.query.q;
//     console.log(id);
//     let pgquery = "DELETE FROM todolist WHERE task_id = $1";
//     connection.query(pgquery, [id], (err, result) => {
//         if (err) {
//             console.log(err.message);
//         } else {
//             res.send(result);
//         }
//     });
// });

// app.put("/update", (req, res) => {
//     let id = req.query.s
//     let data = req.body
//     // console.log(id, data);
//     let pgquery = "UPDATE todolist SET comp_date = CURRENT_DATE, status = $1 WHERE task_id = $2";
//     connection.query(pgquery, [data.status, id], (err, result) => {
//         if (err) {
//             console.log(err.message);
//         } else {
//             res.send(result);
//         }
//     });
// });


// app.listen(port, () => {
//     console.log("Server Listening on port", port);
// });

/*-------------------------------------------------------------------------------*/

app.get('/view', (req, res) => {
    TodoModel.find({})
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err);
        })
})

// app.put('/updatedate', (req, res) => {
//     const current_date = new Date();
//     TodoModel.findOneAndUpdate({ _id: id }, { current_date: current_date })
//         .then((result) => {
//             res.send(result)
//         }).catch((err) => {
//             console.log(err);
//         })
// })


app.post('/add', (req, res) => {
    const { sn, task, due_date, status } = req.body;
    const comp_date = new Date();
    const current_date = new Date();
    TodoModel({ sn, task, due_date, current_date, comp_date, status }).save()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err);
        })
});

app.delete('/delete', (req, res) => {
    const id = req.query.id;
    TodoModel.deleteOne({ _id: id })
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err);
        })
})


app.put('/update', (req, res) => {
    const id = req.query.id
    const { status } = req.body;
    const current_date = new Date();
    TodoModel.findOneAndUpdate({ _id: id }, { current_date: current_date, status: status })
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err);
        })
})


app.listen(port, () => {
    console.log(`Server Listening on port`, port);
})