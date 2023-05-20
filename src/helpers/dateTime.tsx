export function ConvertISOToMonthYear (IsoDate: string) {
  const newDate = new Date(IsoDate);
  const month = newDate.toLocaleString('en-us', { month: 'short' });
  const year = newDate.getFullYear().toString();
  return `${month} ${year}`;
}

export function ConvertDateToPostContentDate (IsoDate: string) {
  const postDate = new Date(IsoDate);
  const presentDate = new Date();

  const monthsPerYear = 12;

  const yearDiff = presentDate.getFullYear() - postDate.getFullYear();
  const monthDiff = presentDate.getMonth() - postDate.getMonth();

  const totalMonths = yearDiff * monthsPerYear + monthDiff;

  if (totalMonths >= 12) {
    const years = Math.floor(totalMonths / monthsPerYear);
    return `${years.toString()}y`;
  } else if (totalMonths >= 1) {
    return `${totalMonths.toString()}m`;
  } else {
    const dateDiff = presentDate.getDate() - postDate.getDate();
    if (dateDiff === 0) {
      const hoursDiff = presentDate.getHours() - postDate.getHours();
      if (hoursDiff >= 1) {
        return `${hoursDiff.toString()}h`;
      } else {
        const miniteDiff = presentDate.getMinutes() - postDate.getMinutes();
        if (miniteDiff >= 1) {
          return `${miniteDiff.toString()}min`;
        } else {
          const secondDiff = presentDate.getSeconds() - postDate.getSeconds();
          return `${secondDiff.toString()}s`;
        }
      }
    } else {
      return `${dateDiff.toString()}d`;
    }
  }
}
