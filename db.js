const Sequelize = require('sequelize');
const {UUID, UUIDV4, STRING, DECIMAL, IMAGE} = Sequelize
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/finalproject_db')

const Student = conn.define('student', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {notEmpty: true},
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {notEmpty: true},
  },
  Email: {
    type: STRING,
    allowNull: false,
    validate: {notEmpty: true},
    unique: true
  },
  GPA: DECIMAL
});

const School = conn.define('school', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {notEmpty: true},
    unique: true
  },
  // imageURL: {
  //   type: IMAGE
  // }
})

Student.belongsTo(School);
School.hasMany(Student);

const syncAndSeed =async()=>{
  await conn.sync({force: true});

  const schools = [
    {name: 'Harvard'},
    {name: 'MIT'},
    {name: 'Stanford'},
    {name: 'UCLA'},
    {name: 'UC Berkley'},
    {name: 'UC Davis'}
  ];
  const [harvard, mit, stanford, ucla, berkley, davis] = await Promise.all(schools.map(school => School.create(school)));

  const students = [
    {firstName: 'Bill', lastName: 'Lane', Email: 'bLane@gmail.com', GPA: 4.2, schoolId: mit.id },
    {firstName: 'Mary', lastName: 'Lang', Email: 'mLang@gmail.com', GPA: 4.0, schoolId: berkley.id },
    {firstName: 'Ashley', lastName: 'Davis', Email: 'aDavis@yahoo.com', GPA: 4.5, schoolId: stanford.id },
    {firstName: 'Cody', lastName: 'Gomez', Email: 'cGomez@gmail.com', GPA: 3.8, schoolId: ucla.id },
    {firstName: 'Carol', lastName: 'Franz', Email: 'cFranz@yahoo.com', GPA: 4.0, schoolId: mit.id },
    {firstName: 'Anna', lastName: 'Bosley', Email: 'aBosley@yahoo.com', GPA: 4.4, schoolId: mit.id },
    {firstName: 'Lily', lastName: 'Keen', Email: 'lKeen@yahoo.com', GPA: 4.8, schoolId: harvard.id },
  ];
  const [bLane, mLang, aDavis, cGomez, cFranz, aBosley, lKeen] = await Promise.all(students.map(student => Student.create(student)));
}

// syncAndSeed();

module.exports={
  syncAndSeed,
  conn,
  model: {
    Student,
    School
  }
}
