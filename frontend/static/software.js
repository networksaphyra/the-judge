function handleFileSelect(event) {
    var fileList = event.target.files;
    var fileListContainer = document.getElementById('file-list');
    document.getElementById('custom-source').style.backgroundColor = "var(--color3)";
    fileListContainer.innerHTML = '';
    for (var i = 0; i < fileList.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = fileList[i].name;
        fileListContainer.appendChild(listItem);
    }
 }
 
 function handleFileSelect2(event) {
    var fileList = event.target.files;
    var fileListContainer = document.getElementById('file-list2');
    document.getElementById('custom-design').style.backgroundColor = "var(--color3)";
    fileListContainer.innerHTML = '';
    for (var i = 0; i < fileList.length; i++) {
        var listItem = document.createElement('ul');
        listItem.textContent = fileList[i].name;
        fileListContainer.appendChild(listItem);
    }
 }
 
 addEventListener("DOMContentLoaded", (event) => {
    document.getElementById('sourceCode').addEventListener('change', handleFileSelect);
    document.getElementById('designImages').addEventListener('change', handleFileSelect2);
 });