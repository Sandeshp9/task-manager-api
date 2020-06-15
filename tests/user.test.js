const request = require('supertest')
const app =require('../src/app')
const {userOneId,userOne,setupDatabase} = require('../tests/fixtures/db')
const User = require('../src/models/user')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Sandesh',
        email: 'sandesh@example.com',
        password: 'Mypass1234'
    }).expect(201)

    //Assert that database was changed
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertions about response
    expect(response.body).toMatchObject({
        user: {
            name: 'Sandesh',
            email: 'sandesh@example.com'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('Mypass1234')
})

test('Should login existing user', async ()=> {
    const response = await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)

    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async ()=> {
    await request(app).post('/users/login').send({
        email:"sandesh@example.com",
        password:"asdffghhhh"
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app).get('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get profile for unauthenticated user', async ()=>{
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete the user', async ()=>{
    await request(app)
    .delete('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete the unauthenticated user', async ()=>{
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app).post('/users/me/avatar')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/profile-pic.jpg')
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async ()=> {
    const response = await request(app).patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        name: 'Sandesh',
    }).expect(200)

    const user = await User.findById(userOneId)

    //Assertions about response
    expect(user.name).toEqual('Sandesh')

})

test('Should not update invalid user fields', async ()=> {
    const response = await request(app).patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        location: 'Sandesh',
    }).expect(400)

})