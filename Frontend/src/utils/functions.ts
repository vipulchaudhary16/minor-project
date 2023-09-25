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