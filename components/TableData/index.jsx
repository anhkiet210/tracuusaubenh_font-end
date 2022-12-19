function TableData({ thead, data }) {
    console.log('data', data);
    return (
        <>
            <table className="w-full text-sm text-left text-[#6B7280] dark:text-[#9CA3AF]">
                <thead className="text-xs text-[#374151] uppercase bg-[#F9FAFB] dark:bg-[#374151] dark:text-[#9CA3AF]">
                    <tr>
                        {thead &&
                            thead.map((item, index) => (
                                <th scope="col" className="py-3 px-6" key={index}>
                                    {item.title}
                                </th>
                            ))}
                        {/* <th scope="col" className="py-3 px-6"></th> */}
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        (
                            <tr
                                key={data.pest._id}
                                className="bg-white border-b dark:bg-[#1F2937] dark:border-[#374151] hover:bg-[#F9FAFB] dark:hover:bg-[#4B5563]"
                            >
                                <td className="py-4 px-6">{data.pest.ten}</td>
                                <td className="py-4 px-6">{data.pest.trieuchungchitiet}</td>
                                <td className="py-4 px-6">{data.crop.tenloai}</td>
                            </tr>
                        )}
                    {/* <td className="py-4 px-6 text-right">
                            <a href="#" className="font-medium text-[#2563EB] dark:text-[#3B82F6] hover:underline">
                                Edit
                            </a>
                        </td> */}
                </tbody>
            </table>
        </>
    );
}

export default TableData;
