export function ConvertISOToMonthYear (IsoDate: string) {
  const newDate = new Date(IsoDate);
  const month = newDate.toLocaleString('en-us', { month: 'short' });
  const year = newDate.getFullYear().toString();
  return `${month} ${year}`;
}
