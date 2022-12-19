import Link from 'next/link';

function Question(props) {
    return (
        <>
            <Link href={`/dien-dan-hoi-dap/${props?.idQuestion}`}>
                <div className="flex items-start justify-start p-2 border border-[#ccc] rounded-lg shadow-md cursor-pointer my-2">
                    <img src={props?.avatar} alt="" className="w-10 h-10 object-cover rounded-full mr-2" />
                    <div className="flex-1 break-words overflow-hidden">
                        <h2 className="text-base font-bold ">{props?.title}</h2>
                        <h5 className="text-sm font-light italic text-primary1">bởi {props?.name}</h5>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default Question;
