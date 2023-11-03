export const convertTimeIntoIST = (time: string) => {
  const date = new Date(time);

  const options: any = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const formatter = new Intl.DateTimeFormat('en-IN', options);
  return formatter.format(date);
}

export function formatDateToYyyyMmDd(date : Date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based, so we add 1 to get the correct month.
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}