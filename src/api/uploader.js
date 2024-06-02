// Cloudinary database에서 정해준 api docs 따라서 만드는 것임
export async function uploadImage(files) {
    const formData = new FormData(); // js에 사용되는 form관련 object로, js통해서 createElement하듯이 js통해서 form만들때 사용된다.
    formData.append("file", files); // <input type="text" name="file" value={file} /> 이런의미임

    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);

    return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        method: "POST",
        body: formData,
    })
        .then((res) => res.json())
        .then((data) => data.url);
}
