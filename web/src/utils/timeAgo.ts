export function timeAgo(dateString: string) {
  const now = new Date() as unknown as number;
  const past = new Date(dateString) as unknown as number;
  const seconds = Math.floor((now - past) / 1000);

  const intervals: Record<string, number> = {
    year: 365 * 24 * 60 * 60,
    month: 30 * 24 * 60 * 60,
    week: 7 * 24 * 60 * 60,
    day: 24 * 60 * 60,
    hour: 60 * 60,
    minute: 60,
    second: 1,
  };

  for (const key in intervals) {
    const value = intervals[key];
    if (seconds >= value) {
      const count = Math.floor(seconds / value);
      return `${count} ${key}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just Now";
}
