
import { useState } from "react";
import FileUpload from "./components/FileUpload";
import OutputDisplay from "./components/OutputDisplay";
import OcrHistory from "./components/OCRHistory";
import axios from 'axios';

const App = () => {
  const [jsonData, setJsonData] = useState(null);
  const [history, setHistory] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");

  const handleFileUpload = async (imageFile) => {
     console.log(imageFile);
     try {

    const apiUrl = 'https://api.ocr.space/parse/image';
    const apiKey = 'K84579628788957'; 
    
    const formData = new FormData();
    formData.append('apikey', apiKey);
    formData.append('image', imageFile);

    const response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    console.log("hiiiiii")
    const data=response.data;
    const {ParsedResults}=response.data;

    const ocrText=ParsedResults[0].ParsedText;
    let splitText=ocrText.split("\r\n"); // tokenization
    console.log('Image uploaded successfully:',ocrText);
     console.log('split text',splitText);

    // Handle the response from the server as needed
  } catch (error) {
    console.error('Error uploading image:', error);
    // Handle errors
  }


    // Perform OCR operation here with the file and set jsonData state
    // Simulating OCR operation completion for demonstration purposes
    setTimeout(() => {
      const fakeOcrResult = { fake: "result" };
      setJsonData(fakeOcrResult);
      // Add to history
      setHistory([...history, "Success: OCR operation completed"]);
    }, 2000);
  };

  const handleFilter = (e) => {
    const query = e.target.value;
    setFilterQuery(query);
  };

  const filteredHistory = history.filter((item) =>
    item.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-900 min-h-screen text-white flex justify-center items-center">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl mb-6 text-center">ID Card Optical Character Recognition</h1>
        <FileUpload handleFileUpload={handleFileUpload} />

        {jsonData && <OutputDisplay jsonData={jsonData} />}


        <input
          type="text"
          placeholder="Filter OCR history"
          value={filterQuery}
          onChange={handleFilter}
          className="bg-gray-800 text-white p-2 rounded w-full mb-4"
        />
        <OcrHistory history={filteredHistory} />
      </div>
    </div>
  );
};

export default App;
