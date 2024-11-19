// It is used to get the progress of the upload
function uploadFiles() {
  const form = document.getElementById("uploadForm");
  const formData = new FormData(form);

  const xhr = new XMLHttpRequest();

  // Update progress bar
  xhr.upload.onprogress = function (event) {
    if (event.lengthComputable) {
      const percent = Math.round((event.loaded / event.total) * 100);
      const progressBar = document.getElementById("progressBar");
      progressBar.style.display = "block";
      progressBar.value = percent;
    }
  };

  xhr.open("POST", "/upload", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      alert("Files uploaded successfully");
      location.reload(); // Reload to show updated file list
    } else {
      alert("File upload failed");
    }
  };

  xhr.onerror = function () {
    alert("An error occurred during the upload.");
  };

  xhr.send(formData);
}
