const dayInHours = 24;
const twoDaysInHours = 2 * dayInHours;

export default function dateAgo(val: number) : string {
  if (!val) return "";
  const currentTime = new Date();
  const actualTime = new Date(val * 1000);

  const differenceInHours = (currentTime.getTime() - actualTime.getTime()) / 1000 / 60 / 60;

  const time = getLocaleTime(actualTime);

  if (differenceInHours < dayInHours) {
    return `Today ${time}`
  } else if (differenceInHours >= dayInHours && differenceInHours < twoDaysInHours) {
    return `Yesterday ${time}`
  } else {
    return time;
  }
}

function getLocaleTime(x: Date) {
  const timestring = x.toLocaleTimeString();
  return timestring.slice(0, timestring.lastIndexOf(":")) + timestring.slice(timestring.lastIndexOf(" "))
}