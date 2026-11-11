const LOCAL_PART_PATTERN = /^[A-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Z0-9!#$%&'*+/=?^_`{|}~-]+)*$/i;
const DOMAIN_LABEL_PATTERN = /^[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?$/i;
const TOP_LEVEL_DOMAIN_PATTERN = /^(?:[A-Z]{2,}|xn--[A-Z0-9-]{2,})$/i;

export function isValidEmail(value: string) {
  const email = value.trim();
  if (!email || email.length > 254) return false;

  const separatorIndex = email.indexOf('@');
  if (
    separatorIndex <= 0 ||
    separatorIndex !== email.lastIndexOf('@') ||
    separatorIndex > 64
  ) {
    return false;
  }

  const localPart = email.slice(0, separatorIndex);
  const domain = email.slice(separatorIndex + 1);
  const domainLabels = domain.split('.');

  if (
    !LOCAL_PART_PATTERN.test(localPart) ||
    domainLabels.length < 2 ||
    domainLabels.some(
      (label) => label.length > 63 || !DOMAIN_LABEL_PATTERN.test(label),
    )
  ) {
    return false;
  }

  return TOP_LEVEL_DOMAIN_PATTERN.test(domainLabels[domainLabels.length - 1]);
}
