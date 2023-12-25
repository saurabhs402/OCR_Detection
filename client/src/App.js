
import { useState } from "react";
import FileUpload from "./components/FileUpload";
import OutputDisplay from "./components/OutputDisplay";
import OcrHistory from "./components/OCRHistory";
import axios from 'axios';
import {PORT} from './config'

const App = () => {
  const [jsonData, setJsonData] = useState({
    "upload":"file"
  });
 

  
  async function  storeInDB(ocrText){
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
    "name": splitText[1].replace("Name ",''),
    "last_name": splitText[2].replace("Last name ",''),
    "date_of_birth": splitText[3].replace("Date of Birth ",''),
    "date_of_issue": splitText[4],
    "date_of_expiry": splitText[5]
    }
 setJsonData(OcrResult);
  const {identification_number,name,last_name,date_of_birth,date_of_issue,date_of_expiry}=OcrResult;

  console.log(identification_number+" "+date_of_birth);
  let res;

  try{
   // Sending request to server
   res=await axios.post(`http://localhost:${PORT}/users`,{
    headers: {
        'Content-Type': 'application/json',
      },
    body:JSON.stringify({identification_number,name,last_name,date_of_birth,date_of_issue,date_of_expiry})
  })
 }catch(err){
  console.log(err);
 }

  // const res=;
  console.log(res)

  }

  const handleFileUpload = async (imageFile) => {
     setJsonData({
    "Evaluating":"Result Wait"
      })
     console.log(imageFile);
     let ocrText;
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

    ocrText=ParsedResults[0].ParsedText;

  } catch (error) {
    console.error('Error in sending post request to OCR Space', error);
    // Handle errors
  }
    
  // Storing in Database
   storeInDB(ocrText);
   
  };



 

  return (
   <div className="bg-gray-900 min-h-screen text-white  justify-center items-center">
   
      <div className="container mx-auto py-2 flex flex-col items-center">
         <h1 className="text-3xl mt-8 text-center">ID Card Optical Character Recognition</h1>
          <div className="flex flex-wrap w-full justify-center">
              <div className="w-full md:w-1/2 mb-0 md:mb-0 md:pr-2">
                    <FileUpload handleFileUpload={handleFileUpload} />
              </div>

              
              <div className="w-full md:w-1/2 md:pl-2">
                <OutputDisplay jsonData={jsonData} />
              </div>
                    
        
          </div>

          <OcrHistory/>

      </div>


    </div>
  );
};

export default App;
