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

