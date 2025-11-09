const uploadImage = async (image : any) => {
  if (!image) return;

  const formData = new FormData();
  formData.append("file", {
    uri: image,
    type: "image/jpeg",
    name: "photo.jpg",
  } as any);

  const res = await fetch("https://your-backend.com/upload", {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const data = await res.json();
  console.log(data);
};

// Upload image thinks for the backend

export const formatDateToMMDDYYYY = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const  formatDateToYMD = (dateInput : string) => {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

type TimeAgoOptions = {
  addSuffix?: boolean;          
  now?: Date | string | number; 
};

export function timeAgo(
  input: Date | string | number,
  opts: TimeAgoOptions = {}
): string {
  const { addSuffix = true, now } = opts;

  const date = new Date(input);
  if (isNaN(date.getTime())) return '';

  const nowDate = now ? new Date(now) : new Date();
  const diffMs = date.getTime() - nowDate.getTime(); // +future, -past
  const seconds = Math.max(1, Math.floor(Math.abs(diffMs) / 1000)); // at least 1s

  // Using pragmatic month (30d) & year (365d) approximations
  const units = [
    { label: 'year',   secs: 365 * 24 * 60 * 60 },
    { label: 'month',  secs:  30 * 24 * 60 * 60 },
    { label: 'week',   secs:   7 * 24 * 60 * 60 },
    { label: 'day',    secs:      24 * 60 * 60 },
    { label: 'hour',   secs:           60 * 60 },
    { label: 'min',    secs:                60 },
    { label: 'second', secs:                 1 },
  ] as const;

  let value = 1;
  let label: string = 'second';

  for (const u of units) {
    const v = Math.floor(seconds / u.secs);
    if (v >= 1) {
      value = v;
      label = u.label;
      break;
    }
  }

  // Pretty labels: "min" → "minute"
  const pretty =
    label === 'min' ? 'minute' :
    label === 'second' ? 'second' :
    label; // year, month, week, day, hour

  const plural = value === 1 ? '' : 's';
  const core = `${value} ${pretty}${plural}`;

  if (!addSuffix) return core;
  return diffMs < 0 ? `${core} ago` : `in ${core}`;
}
