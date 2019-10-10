const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/dist', express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res, next)=>{
  res.sendFile(path.join(__dirname, 'index.html'))
});




app.get('/api/students', (req, res, next)=> {
  db.model.Student.findAll()
    .then(item => res.send(item))
    .catch(next)
})
app.post('/api/students/', async (req, res, next)=> {
  const school = await db.model.School.findAll({where: {name: req.body.school}});
  req.body.schoolId = school.id
  console.log(req.body)
  db.model.Student.create(req.body)
    .then(item => res.status(201).send(item))
    .catch(next)
})
app.delete('/api/students/:id', (req, res, next)=> {
  db.model.Student.findByPk(req.params.id)
    .then(item => item.destroy())
    .then(item => res.sendStatus(204))
    .catch(next)
})
app.put('/api/students/:id', (req, res, next)=> {
  db.model.Student.findByPk(req.params.id)
    .then(item => item.update(req.body))
    .then(item => res.send(item))
    .catch(next)
})




app.get('/api/schools', (req, res, next)=> {
  db.model.School.findAll()
    .then(item => res.send(item))
    .catch(next)
})



db.syncAndSeed()
  .then(()=> {
    app.listen(port, console.log(`you are listening on port ${port}`))
  });
