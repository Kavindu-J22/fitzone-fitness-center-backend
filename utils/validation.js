const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  
  const validatePassword = (password) => {
    return password.length >= 6; // Password length must be at least 6 characters
  };
  
  const validateString = (str) => {
    return str && str.trim() !== '';
  };
  
  module.exports = { validateEmail, validatePassword, validateString };
  