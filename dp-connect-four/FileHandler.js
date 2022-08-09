class FileHandler {
    constructor() {}

    saveFile(fileName, content, type) {
        // requires <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
        saveAs(new File(content, fileName, {type: type}));
    }

    loadFile(file, callback) {
        const reader = new FileReader();

        //this gets executes the callback() as soon as the reader finished reading the file
        reader.addEventListener('load', (event) => callback(event));

        //start reading the file
        reader.readAsText(file);
    }

}