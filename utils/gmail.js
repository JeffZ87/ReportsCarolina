export default function sendMessage(message) {
    const nodemailer = require('nodemailer');
    const { google } = require('googleapis');
    const OAuth2 = google.auth.OAuth2;

    const clientID = 'Your ClientID Here';
    const clientSecret = 'Your Client Secret Here';
    const refreshToken = 'Your Refresh Token Here';
    const user = 'Your Gmail Here';
    const phoneGateway = 'phone-number@provider-gateway';

    const oauth2Client = new OAuth2(
        clientID, // ClientID
        clientSecret, // Client Secret
        'https://developers.google.com/oauthplayground' // Redirect URL
    );

    oauth2Client.setCredentials({
        refresh_token: refreshToken
    });
    const accessToken = oauth2Client.getAccessToken()

    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: user,
            clientId: clientID,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            accessToken: accessToken,
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: user,
        to: phoneGateway,
        subject: 'Class Status Update!',
        generateTextFromHTML: true,
        html: message
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
        error ? console.log(error) : console.log(response);
        smtpTransport.close();
    });
}