const path = require('path')
const express = require('express');
const app = express();
const nodemailer = require('nodemailer')

const port = process.env.PORT || 3000;

app.use(express.static('./assets'))
app.use(express.static('./img'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/',(req, res)=>{
    res.status(200).sendFile(path.join(__dirname,"views","index.html"))
})

var transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 465,
    secure:true,
    auth:{
        user:"",// Enter your email here
        pass:"" // Enter email password here
    }
})
app.post('/sendMail',(req, res)=>{
    var mailOptions = {
        from: "",// Enter your email here
        to: "",// Enter your email here or can be any email
        subject: "portfolio contuct us email",
        html:`
        <h2>Subject: ${req.body.subject}</h2>
        <h4>From: ${req.body.name} <a href="${req.body.email}">${req.body.email}</a></h4>
        <p>${req.body.message}</p>
        `
    }
    transporter.sendMail(mailOptions,(err, info)=>{
        if(err) res.status(500).json({err});
        else res.status(200).json({success: info});
    })
})

app.all('*',(req, res)=>{
    res.sendFile(path.join(__dirname,'views','404.html'))
})

app.listen(port,(err)=>{
    err? console.log(err) :console.log("server listening on port "+ port)
})