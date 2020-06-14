const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email, name) => {
    sgMail.send({to: email,
    from: 'sandeshpokharkar912@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    }).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error.response.body)
        // console.log(error.response.body.errors[0].message)
    })
}

const goodByeEmail = (email, name) => {
    sgMail.send({to: email,
    from: 'sandeshpokharkar912@gmail.com',
    subject: 'Thanks for using our app',
    text: `Thank you, ${name}. Let me know how I can improve this app if possible.`
    }).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error.response.body)
        // console.log(error.response.body.errors[0].message)
    })
}

module.exports = {
    sendWelcomeEmail,
    goodByeEmail
}