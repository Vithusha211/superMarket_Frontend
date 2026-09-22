export const PASSWORD_REQUIREMENTS_MESSAGE =
  'Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character (e.g. @, #, $, %, !).';

export function isValidPassword(password: string) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}
