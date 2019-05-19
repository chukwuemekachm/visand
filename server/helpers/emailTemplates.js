export default {
  paymentSuccess: (name, orderId) => `
    <section style="padding: 1em">
      <img src="https://cdn.pixabay.com/photo/2017/03/28/05/09/truck-2181037_960_720.png" style="width: 100%; height: auto; margin: auto;" />
      <h3 style="font-size: 1.6em">Hello ${name}</h3>
      <p  style="font-size: 1.2em">Your order with order_id <strong>#${orderId}</strong> has shipped!</p>
    </section>
    <section style="padding: 2em; background-color: #321977;">
      <h3 style="color: #FFFFFF; font-size: 1.6em;">While your waiting for your order, feel free to check out our new deals</h3>
      <a href="https://visand-prous.netlify.com?deals=8rfj9rj" target="_blank" style="color: #F62E5F">Here</a>
    </section>
  `,
  paymentFail: (name, orderId) => `
    <section style="padding: 1em">
      <img src="https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635448_960_720.png" style="width: 100%; height: auto; margin: auto;" />
      <h3 style="font-size: 1.6em">Hello ${name}</h3>
      <p  style="font-size: 1.2em">Payment for your order with order with order_id <strong>#${orderId}</strong> could not be fulfilled.</p>
      <p  style="font-size: 1.2em">Please contact customer care <a href="mailto:info@visand-prous.com">info@visand-prous.com</a></p>
    </section>
  `,
};
