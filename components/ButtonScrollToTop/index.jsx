import { useEffect } from 'react';
import { useState } from 'react';

function ButtonScrollToTop() {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const handleSCrollTop = () => {
            if (window.scrollY >= 400) {
                setShow(true);
            } else {
                setShow(false);
            }
        };

        window.addEventListener('scroll', handleSCrollTop);

        return () => window.removeEventListener('scroll', handleSCrollTop);
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <>
            <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className={` p-3 bg-slate-700 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-slate-900 duration-500 hover:shadow-lg focus:bg-slate-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition ease-in-out bottom-5 right-5 fixed ${
                    show ? 'inline-block' : 'hidden'
                } `}
                id="btn-back-to-top"
                onClick={handleScrollToTop}
            >
                <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    className="w-6 h-6"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                >
                    <path
                        fill="currentColor"
                        d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
                    ></path>
                </svg>
            </button>
        </>
    );
}

export default ButtonScrollToTop;
