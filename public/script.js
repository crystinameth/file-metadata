const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');

uploadForm.addEventListener('submit', async(e)=>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            console.log('File uploaded successfully!');
        } else {
            console.error('File upload failed.');
        }
    } catch (error) {
        console.error('Error', error);
    }
});