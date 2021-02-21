var nodemailer = require('nodemailer');

//https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4NMDlpkyIomR32I8puENb2HsrC-XQ047yCgxSOV1u08L3Kf0yfR-NpoFhvFVBiolZgJtkm2Y7HpM10eE_eEgGfGBc05Aw

module.exports.sendMail = function (req) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'from@gmail.com',
                pass: '****'
            }
        });
        var mailOptions = {
            from: 'from@gmail.com',
            to: 'prakashparthi1996@gmail.com',
            subject: 'Something for you',
            text: 'Being Stupid Together',
            html: <html></html>
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log('Email sent: ' + info.response);
                resolve("Success");
            }
        });
    })
}