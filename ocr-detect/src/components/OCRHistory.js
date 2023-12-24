const OcrHistory = ({ history }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">OCR History</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OcrHistory;
