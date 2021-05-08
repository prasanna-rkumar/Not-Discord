export default function urlify(text: string) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts: any = text.split(urlRegex);
  for (let i = 1; i < parts.length; i += 2) {
    parts[i] = (
      <a
        className="hover:underline text-anchor"
        target="_blank"
        rel="noreferrer"
        key={"link" + i}
        href={parts[i]}
      >
        {parts[i]}
      </a>
    );
  }
  console.log(parts);
  return parts;
}
