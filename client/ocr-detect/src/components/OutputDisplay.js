const OutputDisplay = ({ jsonData }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default OutputDisplay;
