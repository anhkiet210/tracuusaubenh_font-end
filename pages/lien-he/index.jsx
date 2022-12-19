import Banner from '../../components/Banner';
import FormLetter from '../../components/FormLetter';

function Contact() {
    return (
        <>
            <Banner title={'Liên hệ'} />
            <div className="container p-5 flex flex-col gap-5 md:flex md:flex-row">
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
                <div className="p-[30px] w-full text-center rounded-xl bg-[#d4ec70] md:p-[50px]">
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
                                d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"
                            />
                        </svg>
                        <h2 className="text-xl font-bold mt-3 mb-7">Địa chỉ</h2>
                    </div>
                    <div className="">
                        <p>3/2, Xuân Khánh, Ninh Kiều, Cần Thơ</p>
                    </div>
                </div>
            </div>
            <FormLetter />
        </>
    );
}

export default Contact;
