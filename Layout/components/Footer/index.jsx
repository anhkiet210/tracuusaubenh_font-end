import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../img/logo.png';

function Footer() {
    return (
        <>
            <div className="bg-[#31342b]">
                <div className="border-b-[1px] border-white">
                    <div className="container p-5 flex flex-col items-center md:flex-row">
                        <div className="w-[300px]">
                            <Image src={logo} alt="Logo" />
                        </div>
                        <div className="text-white text-center md:p-5 md:text-right md:flex-1">
                            <h1 className="text-2xl font-bold mb-2">Địa chỉ</h1>
                            <p>3/2, Xuân Khánh, Ninh Kiều, Cần Thơ</p>
                            <h1 className="text-2xl font-bold mb-2 mt-10">Điện thoại</h1>
                            <p className="text-primary">+84 365 480 118</p>
                        </div>
                    </div>
                </div>
                <div className="container py-10 px-5 text-center text-white ">
                    <span className="hover:text-primary1">Copyright © 2022 Creative Anh Kiệt</span>
                </div>
            </div>
        </>
    );
}

export default Footer;
