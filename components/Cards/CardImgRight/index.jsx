import aos from 'aos';
import { useEffect } from 'react';

function CardImgRight({ title, img, symptom }) {
    return (
        <>
            <section className="flex flex-wrap items-center bg-slate-200 py-5 md:p-20">
                <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                    <h3
                        className=" text-2xl md:text-3xl mb-2 font-semibold leading-normal"
                        data-aos="fade-right"
                        data-aos-duration="400"
                    >
                        {title}
                    </h3>
                    <p
                        className="text-base md:text-lg font-light leading-relaxed mt-4 mb-4 text-slate-600"
                        data-aos="fade-up"
                        data-aos-duration="450"
                    >
                        {symptom}
                    </p>
                </div>

                <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg">
                        <img
                            alt="..."
                            src={img}
                            className="w-full rounded-lg h-full object-cover"
                            data-aos="fade-left"
                            data-aos-duration="450"
                        />
                    </div>
                </div>
            </section>
        </>
    );
}

export default CardImgRight;
