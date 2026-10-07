export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPhone = (phone) => {
  // Accepts standard 10 digit Indian numbers or formatted numbers
  const cleaned = phone.replace(/[\s\-\+\(\)]/g, '');
  return /^[6-9]\d{9}$/.test(cleaned);
};

export const isValidPincode = (pincode) => {
  return /^\d{6}$/.test(pincode);
};

export const validateRequired = (val) => {
  if (typeof val === 'string') return val.trim().length > 0;
  return val !== null && val !== undefined;
};
