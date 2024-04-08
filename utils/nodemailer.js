const nodemailer = require("nodemailer");
require("dotenv").config();
module.exports. mailSender = async (email,message) => {
    try{
      console.log("Mail sending");
            let transporter = nodemailer.createTransport({
               service:"gmail",
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
                tls: {
                    rejectUnauthorized: false
                }
            })

            console.log("Mail sending");
            let info = await transporter.sendMail({
                to:`${email}`,
                html: `${message}`,
            })
             console.log(info);
            return info;
    }
    catch(error) {
        console.log(error.message);
    }
}
