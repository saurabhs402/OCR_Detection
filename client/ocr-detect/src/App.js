
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

     let identification_number,name,last_name,date_of_birth,date_of_issue,date_of_expiry;
     let result;
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
    const {ParsedResults}=response.data;

    const ocrText=ParsedResults[0].ParsedText;
    let splitText=ocrText.split("\r\n"); // tokenization
    console.log('Image uploaded successfully:',ocrText);
     console.log('split text',splitText);
     

     {
      splitText.splice(23,1);
      splitText.splice(22,1);
      splitText.splice(20,1);
      splitText.splice(19,1);
      splitText.splice(18,1);
      splitText.splice(8,9);
      splitText.splice(6,1);
      splitText.splice(3,1);
      splitText.splice(2,1);
      splitText.splice(0,1);
     }
  

    const OcrResult={
    "identification_number": splitText[0],
    "name": splitText[1].replace('Name ',''),
    "last_name": splitText[2].replace('Last Name ',''),
    "date_of_birth": splitText[3].replace('Date of Birth ',''),
    "date_of_issue": splitText[4],
    "date_of_expiry": splitText[5]
    }
    result=OcrResult;

      setTimeout(() => {
      setJsonData(OcrResult);
      // Add to history
      setHistory([...history, "Success: OCR operation completed"]);
    }, 2000);
    // Handle the response from the server as needed
  console.log("Outside try result",result);

  const {identification_number,name,last_name,date_of_birth,date_of_issue,date_of_expiry}=result;

  console.log(identification_number+" "+date_of_birth);
   // Sending request to server
  const res=await axios.post("http://localhost:5000/users",{
    headers: {
        'Content-Type': 'application/json',
      },
    body:JSON.stringify({identification_number,name,last_name,date_of_birth,date_of_issue,date_of_expiry})
  })

  // const res=;
  console.log(res)

  } catch (error) {
    console.error('Error uploading image:', error);
    // Handle errors
  }

  


   
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
