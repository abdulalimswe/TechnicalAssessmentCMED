/**
 * Validate email format
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate password (minimum 6 characters)
 */
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Validate required field
 */
export const validateRequired = (value) => {
  return value && value.toString().trim() !== '';
};

/**
 * Validate age (0-150)
 */
export const validateAge = (age) => {
  const ageNum = parseInt(age);
  return !isNaN(ageNum) && ageNum >= 0 && ageNum <= 150;
};

/**
 * Validate date (not in future for prescription date)
 */
export const validatePrescriptionDate = (date) => {
  if (!date) return false;
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return selectedDate <= today;
};

/**
 * Validate date format (YYYY-MM-DD)
 */
export const validateDateFormat = (date) => {
  if (!date) return true; // Optional fields
  const re = /^\d{4}-\d{2}-\d{2}$/;
  return re.test(date);
};

/**
 * Format date to YYYY-MM-DD
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Get first day of current month
 */
export const getFirstDayOfMonth = () => {
  const date = new Date();
  return formatDate(new Date(date.getFullYear(), date.getMonth(), 1));
};

/**
 * Get last day of current month
 */
export const getLastDayOfMonth = () => {
  const date = new Date();
  return formatDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
};

/**
 * Format display date (DD MMM YYYY)
 */
export const formatDisplayDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

