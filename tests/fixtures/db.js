const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id:userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password:'1234567890',
    tokens:[{
        token: jwt.sign({_id:userOneId}, process.env.JWT_SECRET_SIGN)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id:userTwoId,
    name: 'Andrew',
    email: 'andrew@example.com',
    password:'asdfghjkl',
    tokens:[{
        token: jwt.sign({_id:userTwoId}, process.env.JWT_SECRET_SIGN)
    }]
}

const TaskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First task',
    completed:false,
    owner: userOne._id
}

const TaskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second task',
    completed:true,
    owner: userOne._id
}

const TaskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third task',
    completed:true,
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(TaskOne).save()
    await new Task(TaskTwo).save()
    await new Task(TaskThree).save()

}

module.exports = {
    userOneId,
    userOne,
    TaskOne,
    TaskTwo,
    TaskThree,
    setupDatabase,
}