import Image from 'next/image';
import { useState } from 'react';
import luaImg from '../../img/lua.png';

function PreviewSymptom({ handleClosePreview }) {
    const [showPreviewSymptom, setShowPreviewSymptom] = useState(false);

    return (showPreviewSymptom &&
        <>
            <div className="w-full h-screen z-[999] fixed top-0 left-0">
                <div className="max-w-4xl z-[1000] max-h-[500px] overflow-y-auto p-5 bg-white border-[1px] border-[#ccc] mx-auto mt-4 rounded-2xl">
                    <div className="flex items-center justify-between py-3 px-2 border-b-[1px] border-[#ccc]">
                        <h2 className="text-lg font-semibold">Triệu chứng</h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                            onClick={() => handleClosePreview(showPreviewSymptom, setShowPreviewSymptom)}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div className="max-w-xs mx-auto">
                        <Image src={luaImg} alt="" lazy="true" />
                    </div>
                    <div className="">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, quo. Odio autem nemo
                            sapiente cum dicta amet vel animi quia repudiandae aut, suscipit adipisci iure nobis
                            undeicing elit. Veritatis, quo. Odio autem nemo sapiente cum dicta amet vel animi quia
                            repudiandae aut, suscipit adipisci iure nobis unde quasi? Harum, amet! Lorem
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PreviewSymptom;
