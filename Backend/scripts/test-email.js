require('dotenv').config();
const { verifySmtpConnection, createTransporter } = require('../config/mailer');

async function testEmail() {
  console.log('Testing SMTP connection...');
  console.log('Host:', process.env.SMTP_HOST);
  console.log('Port:', process.env.SMTP_PORT);
  console.log('User:', process.env.SMTP_USER);
  console.log('Secure:', process.env.SMTP_SECURE);

  try {
    await verifySmtpConnection();
    console.log('SMTP connection OK');

    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: `"My-Pandit Test" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: 'My-Pandit SMTP Test',
      text: 'If you received this, SMTP is working correctly.',
    });

    console.log('Test email sent:', info.messageId);
  } catch (error) {
    console.error('SMTP test failed:', error.message);

    if (error.responseCode === 535) {
      console.log('\nFix steps:');
      console.log('1. cPanel/hosting panel se email account ka SAHI password lo');
      console.log('2. SMTP_USER = full email (service@dynacleanindustries.com)');
      console.log('3. SMTP_PASS = us email ka password (not random)');
      console.log('4. Port 587 fail ho to try: SMTP_PORT=465, SMTP_SECURE=true');
    }

    process.exit(1);
  }
}

testEmail();
