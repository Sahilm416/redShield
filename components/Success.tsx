
export default function Success() {
  return (
    <div className=" absolute top-0 right-0 z-20 w-full h-screen flex flex-col justify-center items-center dark:bg-[rgb(18,18,18)]">
      <div className="success-animation">
        <svg
          className="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark__circle dark:fill-[rgb(18,18,18)] fill-white"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </div>
      <p className=" text-xl text-green-700 font-bold">Authentication Success</p>
    </div>
  );
}
