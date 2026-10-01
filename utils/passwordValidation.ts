export const PASSWORD_REQUIREMENTS = [
  {
    id: 'length',
    label: '8+ characters',
    test: (password: string) => password.length >= 8,
  },
  {
    id: 'number',
    label: 'One number',
    test: (password: string) => /[0-9]/.test(password),
  },
  {
    id: 'uppercase',
    label: 'One uppercase letter',
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    id: 'symbol',
    label: 'One symbol',
    test: (password: string) => /[^A-Za-z0-9]/.test(password),
  },
] as const;

export const PASSWORD_REQUIREMENTS_MESSAGE =
  'Password must be at least 8 characters and include an uppercase letter, a number, and a special character (e.g. @, #, $, %, !).';

export type PasswordRequirementStatus = {
  id: string;
  label: string;
  met: boolean;
};

export function getPasswordRequirementStatus(
  password: string,
): PasswordRequirementStatus[] {
  return PASSWORD_REQUIREMENTS.map((requirement) => ({
    id: requirement.id,
    label: requirement.label,
    met: requirement.test(password),
  }));
}

export function getFirstUnmetPasswordRequirement(password: string) {
  return (
    getPasswordRequirementStatus(password).find(
      (requirement) => !requirement.met,
    ) ?? null
  );
}

export function isValidPassword(password: string) {
  return PASSWORD_REQUIREMENTS.every((requirement) =>
    requirement.test(password),
  );
}
