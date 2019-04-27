import sendGrid from '@sendgrid/mail';

const { SENDGRID_API_KEY } = process.env;

export const sendEmail = async (userEmail, mailSubject, mailBody) => {
  try {
    const message = {
      from: 'no-reply@t-shirt_shop.com',
      to: userEmail,
      subject: mailSubject,
      html: `<h3 style="grey: white;padding: .5em;">T-Shirt Shop</h3>
      <div style="padding: .5em;">${mailBody}</div>
      <p style="padding: .5em;"><b>**Note if you are not subscribed to T-Shirt, please ignore this mail.</p>`,
    };

    sendGrid.setApiKey(SENDGRID_API_KEY);
    await sendGrid.send(message);
    return true;
  } catch (error) {
    return false;
  }
};

export default sendEmail;
