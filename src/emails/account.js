const sgMail = require("@sendgrid/mail")


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail= (email,name)=>{
sgMail.send({
    to:email,
    from:"jaya18132.me@rmkec.ac.in",
    subject:"Thanks for joining in! ",
    text: `welcome to the app,${name}.Lets start knocking down those tasks, kindly let me know if you have any issues with the app.`

}).then(()=>{
    console.log("message sent")
}).catch((error)=>{
    console.log(error.response.body)
})
}
const departingemail = (email,name)=>{
    sgMail.send({
        to:email,
        from:"jaya18132.me@rmkec.ac.in",
        subject:"Thanking for the memories ",
        text:`Sorry to hear you go,${name}.Please let us know if anything could be done to change the outcome.`
    }).then(()=>{
        console.log("Message sent")
    }).catch((error)=>{
        console.log(error.response.body)
    })
}
module.exports = {
    sendWelcomeEmail,
    departingemail
}
