import { memo } from "react";

function UploadFileWithLabel({
  label,
  name,
  value,
  handler,
  maxLength,
  setSelectedImage,
  isMultiple = false,
}) {
  const changeHandler = (e) => {
    const inputValue = isMultiple ? e.target.files : e.target.files[0];

    setSelectedImage && setSelectedImage(inputValue);

    if (maxLength) {
      if (inputValue?.length <= maxLength) {
        handler(inputValue);
      }
    } else {
      handler(inputValue);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedImage && setSelectedImage(file);
    handler(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <p className="text-gray-700 text-sm font-medium mb-2">{label}</p>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor={name}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`border-gray-200 flex flex-col items-center justify-center w-full h-32 border rounded-xl
                    cursor-pointer hover:bg-gray-50 transition-all duration-300`}
        >
          <div className="flex flex-col items-center justify-center py-5">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-jungle-700">
                برای آپلود کلیک کنید
              </span>{" "}
              یا بکشید و رها کنید
            </p>
            <p className="text-xs text-gray-600">PNG, JPG , JPEG (MAX: 1 MB)</p>
          </div>
          <input
            value={value}
            type="file"
            className="hidden"
            id={name}
            onChange={changeHandler}
            accept=".jpg, .png ,.jpeg"
            name={name}
            multiple={isMultiple}
          />
        </label>
      </div>
    </div>
  );
}

export default memo(UploadFileWithLabel);
