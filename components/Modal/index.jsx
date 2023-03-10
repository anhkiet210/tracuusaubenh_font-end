function Modal({ children, title, handleClose }) {
  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className="h-full flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-[999] p-4 w-full md:inset-0 h-modal md:h-full animate-appear-hand"
    >
      <div className="relative w-full max-w-2xl max-h-full md:h-auto overflow-x-hidden overflow-y-auto">
        {/* Modal content */}
        <div className="relative rounded-lg shadow bg-gray-700">
          {/* Modal header  */}
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
              onClick={handleClose}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body  */}
          <div className="p-6 space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
