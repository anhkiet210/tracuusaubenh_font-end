import Image from 'next/image';
import Link from 'next/link';
import charming from 'charming';
import anime from 'animejs';

//components
import CardImgLeft from '../components/Cards/CardImgLeft';

import { useEffect } from 'react';
import CardImgRight from '../components/Cards/CardImgRight';
import FormLetter from '../components/FormLetter';
import CardPhone from '../components/Cards/CardPhone';
import CardMessage from '../components/Cards/CardMessgae';
import CardAddress from '../components/Cards/CardAddress';

const benhDaoOn = {
    name: 'Bệnh đạo ôn',
    anh: 'http://res.cloudinary.com/ak210/image/upload/v1669904994/ak-tracuusaubenh/img-pests/onlbuskc1rl9uw4ljrbr.jpg',
    trieuchung:
        'Bệnh đạo ôn lúa do nấm Pyricularia oryza gây ra, bệnh gây hại trong suốt quá trinh trưởng phát triển của cây lúa, nhưng thường biểu hiện rõ nét nhất là thời kỳ lúa con gái gây bệnh đạo ôn trên lá và thời kỳ lúa trổ đến vào chắc gây bệnh đạo ôn cổ bông. Trên lá: Lúc đầu vết bệnh chỉ bằng mủi kim màu xám sau chuyển sang màu nâu rồi lan rộng thành hình thoi ở giữa có máu trắng sáng. Nếu bệnh nặng, các vết bệnh sẽ nối tiếp nhau gây cháy luôn cả lá, chết cây. Trên thân, cổ bông: vết bệnh có thể xuất hiện ở trên thân, cổ bông cổ gié lúa; lúc đầu chỉ là một vết nhỏ màu xám sau chuyển thành màu nâu ăn lan quanh thân, cổ bông lúa làm tắt mạch dẫn, bông lúa bị khô không vào chắc được, gây lép lững. Trên hạt: Vết bệnh là những đốm tròn màu nâu trên vỏ trấu, nếu xuất hiện sớm, gặp điều kiện thuận lợi bệnh sẽ nhiểm váo hạt làm cho hạt bị lép.',
};
const chayBiaLa = {
    name: 'Cháy bìa lá',
    anh: 'http://res.cloudinary.com/ak210/image/upload/v1669905189/ak-tracuusaubenh/img-pests/nfulfm12sf0vdsyzsaar.jpg',
    trieuchung:
        'Bệnh phát sinh chủ yếu trên phiến lá, vết bệnh đầu tiên xuất hiện ở rìa lá như thấm nước và lan dần vào trong giữa lá tạo thành các vết dài màu xanh tái, sau chuyển thành màu trắng xám và phát triển lên chóp lá. Giữa phần lá bệnh và không bệnh nổi lên một đường gợn sóng. Lá lúa bị bệnh thường có màu trắng xám. Bệnh nặng lan rộng ra khắp phiến lá, xuống tới tận gốc của bẹ lá. Khi bệnh nặng sẽ làm giảm khả năng quang hợp của lá, lúc lúa trổ sẽ thụ phấn kém, hạt bị lem lép nhiều, tỷ lệ hạt chắc trên bông giảm, bông lúa ngắn sẽ dẫn đến giảm sút năng suất.',
};

const benhVangLun = {
    name: 'Vàng lùn',
    anh: 'http://res.cloudinary.com/ak210/image/upload/v1669905338/ak-tracuusaubenh/img-pests/pa8fhxwe8fy0awkmeai9.jpg',
    trieuchung:
        'Lá lúa từ màu xanh nhạt chuyển dần sang màu vàng nhạt, vàng da cam rồi vàng khô. Vị trí các lá bị vàng lan dần từ các lá bên dưới lên các lá phía trên. Vết vàng trên lá xuất hiện từ chóp lá, lan dần vào phía bẹ lá. Tất cả các lá bị bệnh có xu hướng xoè ngang. Các chồi lúa bị bệnh giảm chiều cao và bệnh cũng làm giảm số chồi trên bụi lúa mắc bệnh. Quần thể ruộng lúa bị bệnh ngả màu vàng, chiều cao cây lúa không đồng đều.',
};

export default function Home() {
    useEffect(() => {
        const h1 = document.querySelector('h1');
        anime({
            targets: 'h1 span',
            translateY: [-30, 0],
            opacity: [0, 1],
            duration: 2000,
            delay: function (el, i) {
                return i * 50;
            },
            loop: false,
            direction: 'linear',
        });
        charming(h1);
    }, []);
    return (
        <>
            <section className=" relative flex items-center flex-col justify-center h-80 bg-banner bg-cover bg-no-repeat text-white before:content-['\_'] before:bg-[#000] before:bg-opacity-30 before:z-[1] before:w-full  before:h-full before:absolute before:inset-0 md:h-[740px]">
                <h1 className="text-white text-3xl font-bold z-[1] uppercase mb-3 md:text-5xl">Tra cứu sâu bệnh</h1>
                <h4 className="text-white z-[1] uppercase font-bold animate-converging-hand block">
                    Thấu hiểu cây trồng
                </h4>
                <button className="z-[1] py-2 px-4 border-2 mt-20 rounded-lg border-primary text-primary font-medium hover:text-white hover:bg-primary1 hover:border-primary1 transition duration-500">
                    <Link href={'/tra-cuu-sau-benh'}>
                        <a>Bắt đầu sử dụng</a>
                    </Link>
                </button>
            </section>

            <CardImgRight title={benhDaoOn.name} img={benhDaoOn.anh} symptom={benhDaoOn.trieuchung} />
            <CardImgLeft title={chayBiaLa.name} img={chayBiaLa.anh} symptom={chayBiaLa.trieuchung} />
            <CardImgRight title={benhVangLun.name} img={benhVangLun.anh} symptom={benhVangLun.trieuchung} />

            <section className=" relative block bg-slate-800">
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
                        <polygon className="text-slate-800 fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>

                <div className="container mx-auto px-4 pt-24 pb-10">
                    <div className="flex flex-wrap text-center justify-center">
                        <div className="w-full lg:w-6/12 px-4">
                            <h2 className="text-4xl font-semibold text-white font-qwitcher">Liên hệ với chúng tôi</h2>
                        </div>
                    </div>
                    <div className="container p-5 flex flex-col gap-5 md:flex md:flex-row mt-5">
                        <CardPhone />
                        <CardMessage />
                        <CardAddress />
                    </div>
                    <FormLetter />
                </div>
            </section>
        </>
    );
}
