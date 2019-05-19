import sendGrid from '@sendgrid/mail';

const { SENDGRID_API_KEY } = process.env;

export const sendEmail = async (userEmail, mailSubject, mailBody) => {
  try {
    const message = {
      from: 'no-reply@t-shirt_shop.com',
      to: userEmail,
      subject: mailSubject,
      html: `
      <div style="width: 50%; margin: auto; box-shadow: 0 0.0625em 0.125em 0 rgba(9, 30, 66, 0.25); box-sizing: border-box; font-family: sans-serif">
        <header style="width: 100%; background-color: #2D2D2D; padding: .1em 2em; box-sizing: border-box;">
          <h2 style="color: #F62E5F; letter-spacing: .1em">VISAND-PROUS</h2>
        </header>
        ${mailBody}
        <section style="padding: 1em;">
          <p>If you didn't sign up to Visand-Prous with this mail, please disregard this mail.</p>
        </section>
      </div>
      `,
    };

    sendGrid.setApiKey(SENDGRID_API_KEY);
    await sendGrid.send(message);
    return true;
  } catch (error) {
    return false;
  }
};

export default sendEmail;
