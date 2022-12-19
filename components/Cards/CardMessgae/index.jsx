function CardMessage() {
    return (
        <>
            <div className="p-[30px] w-full text-center text-white rounded-xl bg-[#31342b] md:p-[50px]">
                <div className="flex flex-col items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-20 h-20"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                    </svg>
                    <h2 className="text-xl font-bold mt-3 mb-7">Tin nhắn</h2>
                </div>
                <div className="">
                    <p>Hỗ trợ: +84 365 480 118</p>
                </div>
            </div>
        </>
    );
}

export default CardMessage;
