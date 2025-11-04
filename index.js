require('dotenv').config();
const nodemailer = require('nodemailer');

async function main() {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, 
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  // Verify connection
  await transporter.verify();
  console.log('Mailer ready to send emails');

  // Email details
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: 'recipient@example.com',  // Replace with receiver email
    subject: 'Test Email from Node.js',
    text: 'Hello! This is a single test email sent from Node.js.',
    html: '<h3>Hello!</h3><p>This is a single test email sent from Node.js.</p>'
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);

    // For Ethereal, preview URL
    const preview = nodemailer.getTestMessageUrl(info);
    if (preview) console.log('Preview URL:', preview);
  } catch (err) {
    console.error('Error sending email:', err.message);
  }
}

// Run
main();
