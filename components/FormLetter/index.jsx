import { useSnackbar } from 'notistack';

function FormLetter() {
    const { enqueueSnackbar } = useSnackbar();
    const handleCommingSoon = () => {
        enqueueSnackbar('Chức năng đăng được cập nhật!', {
            variant: 'warning',
            autoHideDuration: 2000,
        });
    };
    return (
        <>
            <div className="bg-newsLetterBg bg-cover md:py-10 bg-no-repeat max-w-xl mx-auto rounded-lg mt-4">
                <div className="max-w-5xl mx-auto p-5 ">
                    <form>
                        <input type="text" placeholder="Họ tên" className="form-letter__input" />
                        <input type="email" placeholder="Địa chỉ email của bạn" className="form-letter__input" />
                        <input type="text" placeholder="Chủ đề" className="form-letter__input" />
                        <textarea placeholder="Nội dung" className="form-letter__input" />
                        <input
                            type="button"
                            onClick={handleCommingSoon}
                            value="Gửi tin nhắn"
                            className="bg-opacity-0 text-lg font-medium py-2 px-4 rounded-lg text-[#d4ec70] border-[#d4ec70] border-2 cursor-pointer hover:text-[#000] hover:bg-[#d4ec70] transition duration-500"
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default FormLetter;
