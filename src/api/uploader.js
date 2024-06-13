// Cloudinary DB API Docs
export async function uploadImage(files) {
    const formData = new FormData();
    formData.append("file", files);

    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);

    return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        method: "POST",
        body: formData,
    })
        .then((res) => res.json())
        .then((data) => data.url);
}
