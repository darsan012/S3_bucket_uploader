// script.js
const uploadForm = document.getElementById("uploadForm");
const progressBar = document.getElementById("progressBar");

uploadForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  const formData = new FormData(uploadForm);
  const xhr = new XMLHttpRequest();

  // Show the progress bar when uploading starts
  progressBar.classList.remove("w3-hide");

  xhr.open("POST", "/upload", true);

  // Track progress of the file upload
  xhr.upload.addEventListener("progress", function (e) {
    if (e.lengthComputable) {
      const percentage = (e.loaded / e.total) * 100;
      progressBar.value = percentage;
    }
  });

  xhr.onload = function () {
    if (xhr.status === 200) {
      location.reload(); // Reload the page after successful upload
    } else {
      alert("Error uploading file.");
    }
  };

  xhr.send(formData);
});
