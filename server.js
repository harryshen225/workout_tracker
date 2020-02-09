const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models");
const PORT = process.env.PORT || 3000;
// const seed = require("./seeders/seed");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: true
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


app.get("/api/workouts", (req, res) => {
    db.Workout.find({}, (err, docs) => {
        res.json(docs);
    })
})

app.put("/api/workouts/:id", (req, res) => {
    db.Workout.update({ _id: req.params.id }, { $push: { exercises: req.body } }, (err, docs) => {
        res.json(docs);
    })
})

app.get("/api/workouts/range", async (req, res) => {
    try {
        const docs = await db.Workout.find({});
        res.json(docs)
        console.log(docs);
    } catch (err) {
        console.log(err);
    }
})

app.post("/api/workouts",async (req,res)=>{
    try{
        const docs = await db.Workout.create({exercises:[]});
        res.json(docs);
    }catch(err){ 
        throw error
    }

})

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
    // res.sendFile("exercise.html");
})

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/stats.html"));
})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})