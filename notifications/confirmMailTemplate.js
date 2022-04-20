const notifications = require('./index');

const confirmMail = async (user) => {
  const to = user.email;
  const subject = 'Welcome to E-Books';
  const textMsg = '';
  const htmlMsg = '';

  await notifications.sendMail(to, subject, textMsg, htmlMsg);
}

module.exports = {
  confirmMail,
}