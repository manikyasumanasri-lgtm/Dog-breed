const dropArea = document.getElementById('drop-area');
const dropContent = document.getElementById('drop-content');
const fileInput = document.getElementById('file-input');
const previewContainer = document.getElementById('preview-container');
const imagePreview = document.getElementById('image-preview');
const removeBtn = document.getElementById('remove-btn');
const predictBtn = document.getElementById('predict-btn');
const uploadForm = document.getElementById('upload-form');
const spinner = document.getElementById('spinner');

if (dropArea) {
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add('active'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove('active'), false);
    });

    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
            fileInput.files = files; // Assign standard file input
            handleFiles(files);
        }
    }

    // Handle selected files via button
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                showPreview(file);
            } else {
                alert("Please upload an image file.");
                fileInput.value = '';
            }
        }
    }

    function showPreview(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            imagePreview.src = reader.result;
            dropContent.classList.add('hidden');
            previewContainer.classList.remove('hidden');
            predictBtn.classList.remove('hidden');
        }
    }

    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        imagePreview.src = '';
        previewContainer.classList.add('hidden');
        dropContent.classList.remove('hidden');
        predictBtn.classList.add('hidden');
        fileInput.value = '';
    });

    // Animate button upon form submission to show loading
    uploadForm.addEventListener('submit', function() {
        predictBtn.disabled = true;
        spinner.classList.remove('hidden');
        predictBtn.childNodes[0].nodeValue = 'Identifying... ';
    });
}
