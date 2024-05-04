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
  
  function submitProject(event) {
    event.preventDefault();
  
    const projectName = document.getElementById('projectName').value;
    const projectDescription = document.getElementById('projectDescription').value;
    const sourceCodeFiles = Array.from(document.getElementById('sourceCode').files);
    const designImageFiles = Array.from(document.getElementById('designImages').files);
  
    const formData = {
      project_name: projectName,
      project_description: projectDescription,
      source_code_files: [],
      design_image_files: []
    };
  
    // Read source code files as text
    Promise.all(sourceCodeFiles.map(readFileAsText))
      .then(textFiles => {
        formData.source_code_files = textFiles;
  
        // Read design image files as text
        return Promise.all(designImageFiles.map(readFileAsText));
      })
      .then(designImageTextFiles => {
        formData.design_image_files = designImageTextFiles;
  
        // Send data to server
        sendDataToServer(formData);
      })
      .catch(error => {
        console.error('Error reading files:', error);
      });
  }
  
  function readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve({ name: file.name, content: event.target.result });
      };
      reader.onerror = error => reject(error);
      reader.readAsText(file);
    });
  }
  
  function sendDataToServer(formData) {
    const jsonData = JSON.stringify(formData);
    fetch('http://localhost:9000/evaluate_project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Server response:', data);
        // Redirect to the results page
        window.location.href = 'results.html';
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  addEventListener("DOMContentLoaded", (event) => {
    document.getElementById('sourceCode').addEventListener('change', handleFileSelect);
    document.getElementById('designImages').addEventListener('change', handleFileSelect2);
    document.querySelector('form').addEventListener('submit', submitProject);
  });