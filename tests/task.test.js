const request = require('supertest')
const app =require('../src/app')
const {userOneId,userOne,TaskOne,TaskTwo,TaskThree,setupDatabase} = require('../tests/fixtures/db')
const User = require('../src/models/user')
const Task = require('../src/models/task')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app).post('/tasks')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            description:'From my test'
        }).expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Get all tasks of the user',async ()=>{
    const response = await request(app).get('/tasks')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send().expect(200)
    expect(response.body.length).toBe(2)
})

test('Task delete security check', async ()=>{
    await request(app).delete('/tasks/'+TaskThree._id)
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send().expect(404)
})