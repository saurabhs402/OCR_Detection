const OutputDisplay = ({ jsonData }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto p-2 bg-gray-900 text-white rounded-lg shadow-lg">
        <div> 
          <h1 className="text-4xl font-bold mb-20">OCR Result</h1>
         </div>
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default OutputDisplay;
