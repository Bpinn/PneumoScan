const dropArea=document.getElementById("drop-area");
const inputFile=document.getElementById("input-file");
const imageView=document.getElementById("img-view");

inputFile.addEventListener("change",uploadImage);

function uploadImage(){
    let imgLink= URL.createObjectURL(inputFile.files[0]);
    imageView.style.backgroundImage=`url(${imgLink})`;
    imageView.textContent="";
    imageView.style.border=0;
}
dropArea.addEventListener("dragover",function(e){
      e.preventDefault();
});
dropArea.addEventListener("drop",function(e){
    e.preventDefault();
    inputFile.files=e.dataTransfer.files;
    uploadImage();
});

checkBtn.addEventListener("click", function () {
        if (inputFile.files.length === 0) {
            alert("Please upload an X-ray image first.");
            return;
        }

        let formData = new FormData();
        formData.append("file", inputFile.files[0]);

        // Send image to Django backend for prediction
        fetch("http://127.0.0.1:8000/predict/", { // Change to match your backend deployment
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log("Response:", data);
            
            // Display the result
            resultDiv.innerHTML = `<p><strong>Prediction:</strong> ${data.prediction}</p>`;
            resultDiv.style.display = "block";
            
            // Change background color based on result
            if (data.prediction === "Pneumonia Detected") {
                resultDiv.style.backgroundColor = "#dc3545"; // Red for pneumonia
            } else {
                resultDiv.style.backgroundColor = "#28a745"; // Green for no pneumonia
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        });
    });