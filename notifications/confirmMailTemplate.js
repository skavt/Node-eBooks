const notifications = require('./index');

const confirmMail = (user) => {
  const to = user.email;
  const subject = 'Welcome to E-Books';
  const textMsg = '';
  const htmlMsg = '';

  notifications.sendMail(to, subject, textMsg, htmlMsg);
}

module.exports = {
  confirmMail,
}