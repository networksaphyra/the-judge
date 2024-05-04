// Function to handle file selection and display
function handleFileSelect(event) {
    var fileList = event.target.files; // Get the list of selected files
    var fileListContainer = document.getElementById('file-list'); // Container to display file list
    document.getElementById('custom-source').style.backgroundColor = "var(--color3)";
    // Clear previous file list
    fileListContainer.innerHTML = '';

    // Iterate through the selected files and display them
    for (var i = 0; i < fileList.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = fileList[i].name;
        fileListContainer.appendChild(listItem);
    }
}

function handleFileSelect2(event) {
    var fileList = event.target.files; // Get the list of selected files
    var fileListContainer = document.getElementById('file-list2'); // Container to display file list
    document.getElementById('custom-design').style.backgroundColor = "var(--color3)";
    // Clear previous file list
    fileListContainer.innerHTML = '';

    // Iterate through the selected files and display them
    for (var i = 0; i < fileList.length; i++) {
        var listItem = document.createElement('ul');
        listItem.textContent = fileList[i].name;
        fileListContainer.appendChild(listItem);
    }
}


addEventListener("DOMContentLoaded", (event) => {
    // Add event listeners for file inputs
    document.getElementById('sourceCode').addEventListener('change', handleFileSelect);
    document.getElementById('designImages').addEventListener('change', handleFileSelect2);

});