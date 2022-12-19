function CardPhone() {
    return (
        <>
            <div className="p-[30px] bg-[#e46b2d] w-full text-center rounded-xl md:p-[50px]">
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
                            d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                        />
                    </svg>
                    <h3 className="text-xl font-bold mt-3 mb-7">Điện thoại</h3>
                </div>
                <div className="">
                    <p>Hỗ trợ: +84 365 480 118</p>
                </div>
            </div>
        </>
    );
}

export default CardPhone;
