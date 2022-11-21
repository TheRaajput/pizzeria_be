const OtpTemplate = (otp) => {
  return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Pizzera</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing Pizzeria. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <p style="font-size:0.9em;">Regards,<br />Pizzeria</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Pizzeria Inc</p>
        <p>New Delhi</p>
        <p>India</p>
      </div>
    </div>
  </div>`;
};

const VerificationLink = (code, id) => {
  return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Pizzera</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing Pizzeria. Please click below to verify your account.</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">
      <a style="color:#ffffff" href="http://localhost:5000/v1/users/verify/${code}/${id}" target="_blank">Confirm Email</a>
      </h2>
      <p style="font-size:0.9em;">Regards,<br />Pizzeria</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Pizzeria Inc</p>
        <p>New Delhi</p>
        <p>India</p>
      </div>
    </div>
  </div>`;
};

const InventoryMailTemplate = () => {
  return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a
            href=""
            style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600"
          >
            Pizzera
          </a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>
        There are few items in the inventory that need to be refilled.
        </p>
        <p style="font-size:0.9em;">
          Regards,
          <br />
          Pizzeria
        </p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>Pizzeria Inc</p>
          <p>New Delhi</p>
          <p>India</p>
        </div>
      </div>
    </div>`;
};
module.exports = { OtpTemplate, VerificationLink, InventoryMailTemplate };
