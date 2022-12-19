export default function PageChange(props) {
    return (
        <div>
            <div
                className="bg-cover fixed z-[999] w-full h-full top-0 left-0 flex items-center justify-center"
                style={{
                    backgroundImage:
                        "url('https://res.cloudinary.com/ak210/image/upload/v1669479351/ak-tracuusaubenh/truu-tuong-i-tranh-son-dau-dep-cua-hoa-si-danh-cuong_njisf0.jpg')",
                }}
            >
                <div className="my-32 mx-auto max-w-sm text-center relative z- top-0">
                    <div className="block mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-20 h-20 animate-spin text-white mx-auto text-6xl"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>

                        <i className="fas fa-circle-notch animate-spin text-white mx-auto text-6xl"></i>
                    </div>
                    <h4 className="text-lg font-medium text-white">Loading page contents</h4>
                </div>
            </div>
        </div>
    );
}
