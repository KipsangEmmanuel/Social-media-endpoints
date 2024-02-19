import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config();

const app = express();

app.use(express.json());

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const mailOptions = {
    from: process.env.EMAIL,
    to: 'isaackilimok2@gmail.com',
    subject: 'Sending mail from nodejs',
    text: 'That was easy sending mails from express api with nodemailer'
};

app.get('/send-mail', (req, res) => {
    try {
        console.log(`Sending mail...`)
         transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log(error)
                return res.status(500).send(error)
            }else{
                console.log(`Email sent: ${info.response}`)
                return res.status(200).send({
                    message: "Email sent successfully"
                })
            }
        })
        
    } catch (error) {
        console.log(error)
    }
})



const port = process.env.PORT || 6000

app.listen(port, () => {
    console.log(`Background services up and running on port ${port}`)
});



