const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('inputfield');
const outputText = document.getElementById('output');

uploadForm.addEventListener('submit', async(e)=>{
    e.preventDefault();  // prevents the default form submission behavior, which would cause the page to reload. Instead, we want to handle the form submission using JavaScript.

    const formData = new FormData(); // built-in JavaScript object for creating and managing form data.
    formData.append('upfile', fileInput.files[0]);

    try {
        const response = await fetch('/api/fileanalyse', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const fileInfo = await response.json();
            displayFileInfo(fileInfo);
            console.log('File uploaded successfully!');
        } else {
            console.error('File upload failed.');
        }
    } catch (error) {
        console.error('Error', error);
    }
});

function displayFileInfo(fileInfo) {
    outputText.innerHTML = `File Name: ${fileInfo.name}<br>
                            File Type: ${fileInfo.type}<br>
                            File Size (bytes): ${fileInfo.size}`;
}