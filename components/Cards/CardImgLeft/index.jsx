function CardImgLeft({ title, img, symptom }) {
    return (
        <>
            <section className="relative py-20">
                <div
                    className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
                    style={{ transform: 'translateZ(0)' }}
                >
                    <svg
                        className="absolute bottom-0 overflow-hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <polygon className="text-white fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>

                <div className="container mx-auto md:px-4">
                    <div className="items-center flex flex-wrap">
                        <div className="w-full md:w-4/12 ml-auto mr-auto px-4 flex items-center justify-center">
                            <img
                                alt="..."
                                className="w-full rounded-lg shadow-2xl  "
                                src={img}
                                data-aos="fade-right"
                                data-aos-duration="400"
                            />
                        </div>
                        <div className="w-full md:w-5/12 ml-auto mt-5 md:mt-0 mr-auto px-4">
                            <div className="md:pr-12">
                                <h3 className="text-3xl font-semibold" data-aos="fade-down" data-aos-duration="400">
                                    {title}
                                </h3>
                                <p
                                    className="mt-4 text-lg leading-relaxed text-slate-500"
                                    data-aos="zoom-in"
                                    data-aos-duration="400"
                                >
                                    {symptom}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default CardImgLeft;
