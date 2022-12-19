import formatDate from '../../../../utils/formatDate';

function Answer({ avatar, name, time, content }) {

    return (
        <>
            <div className="border border-[#ccc] shadow-md rounded-lg p-2 my-3">
                <div className="flex gap-2 items-start mb-2 border-b border-[#ccc] pb-2">
                    <img src={avatar} alt="" className="w-10 h-10 object-cover rounded-full" />
                    <div className="flex-1 break-words overflow-hidden">
                        <h5 className="text-base font-medium text-primary1">{name}</h5>
                        <p className="text-xs font-light italic">{formatDate(time)}</p>
                    </div>
                </div>
                <div className="flex-1">
                    <p>{content}</p>
                </div>
            </div>
        </>
    );
}

export default Answer;
