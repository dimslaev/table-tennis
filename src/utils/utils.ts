export const formatDate = (isoString: string) => {
  const parsed = new Date(isoString);
  const date = parsed.toLocaleDateString("en-US", { dateStyle: "medium" });
  const time = parsed.toLocaleTimeString("en-US", { timeStyle: "short" });
  return `${date} ${time}`;
};
