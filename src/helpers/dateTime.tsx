export function ConvertISOToMonthYear (IsoDate: string) {
  const newDate = new Date(IsoDate);
  const month = newDate.toLocaleString('en-us', { month: 'short' });
  const year = newDate.getFullYear().toString();
  return `${month} ${year}`;
}

export function ConvertDateToPostContentDate (IsoDate: string) {
  const postDate = new Date(IsoDate);
  const presentDate = new Date();

  const timeDiff = presentDate.getTime() - postDate.getTime();
  const secondsDiff = Math.floor(timeDiff / 1000);

  const secondsPerMinute = 60;
  const minutesPerHour = 60;
  const hoursPerDay = 24;
  const daysPerMonth = 30;
  const monthsPerYear = 12;

  if (secondsDiff < secondsPerMinute) {
    return `${secondsDiff.toString()}s`;
  } else if (secondsDiff < secondsPerMinute * minutesPerHour) {
    const minutesDiff = Math.floor(secondsDiff / secondsPerMinute);
    return `${minutesDiff.toString()}min`;
  } else if (secondsDiff < secondsPerMinute * minutesPerHour * hoursPerDay) {
    const hoursDiff = Math.floor(secondsDiff / (secondsPerMinute * minutesPerHour));
    return `${hoursDiff.toString()}h`;
  } else if (secondsDiff < secondsPerMinute * minutesPerHour * hoursPerDay * daysPerMonth) {
    const daysDiff = Math.floor(secondsDiff / (secondsPerMinute * minutesPerHour * hoursPerDay));
    return `${daysDiff.toString()}d`;
  } else if (secondsDiff < secondsPerMinute * minutesPerHour * hoursPerDay * daysPerMonth * monthsPerYear) {
    const monthsDiff = Math.floor(secondsDiff / (secondsPerMinute * minutesPerHour * hoursPerDay * daysPerMonth));
    return `${monthsDiff.toString()} mon`;
  } else {
    const yearsDiff = Math.floor(secondsDiff / (secondsPerMinute * minutesPerHour * hoursPerDay * daysPerMonth * monthsPerYear));
    return `${yearsDiff.toString()}y`;
  }
}
