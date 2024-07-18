const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  const minLength = 8;
  const hasNumber = /\d/;
  const hasSpecialChar = /[!@#$%^&*]/;
  return (
    password.length >= minLength &&
    hasNumber.test(password) &&
    hasSpecialChar.test(password)
  );
};

const validatePhoneNumber = (phoneNumber) => {
  const hasEightDigits = /^[0-9]{8,8}$/;
  return hasEightDigits.test(phoneNumber) && phoneNumber > 0;
};

const validatePostalCode = (postalCode) => {
  const hasSixDigits = /^[0-9]{6,6}$/;
  return hasSixDigits.test(postalCode) && postalCode > 0;
};

export {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validatePostalCode,
};
