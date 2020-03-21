import nodemailer from 'nodemailer';
import session from 'nodemailer-ses-transport'

const transporter = nodemailer.createTransport(session({
    accessKeyId: 'AKIAXNZN2NOD3XEASL4G',
    secretAccessKey: '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'
}));


export function sendMail(subject, body) {
    console.log('Sending email :',subject, body);
    transporter.sendMail({ 
        from: 'jason.evans@sakewiz.com', 
        to: 'jason.evans@nipponsake.ca', 
        subject: subject, 
        text: body 
    }, (err, info) => {
        //console.log(info.envelope);
        //console.log(info.messageId);
        //console.log("Info", info);
        //console.log("Err", err);
        return err;
    });
    console.log('Email sent !')
}
