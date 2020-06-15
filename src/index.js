const app = require('./app')

const port = process.env.PORT

// //Site in maintenance mode
// app.use((req,res,next) => {
//     res.status(503).send('Site under maintenance')
// })

app.listen(port,() => {
    console.log('Server is up on port '+port)
})


