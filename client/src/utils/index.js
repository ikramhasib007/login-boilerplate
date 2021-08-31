
function isEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateEmail(e) {
  const { value } = e.target;
  if(value && !isEmail(value)) {
    return false;
  }
  return true;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const allowedImageType = ['image/png', 'image/jpeg', 'image/gif', 'image/bmp', 'image/x-bmp'];

export {
  isEmail,
  validateEmail,
  classNames
}