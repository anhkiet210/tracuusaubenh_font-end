function Banner({ title }) {
    return (
        <>
            <section className="w-full h-[100px] md:h-[500px] bg-titleBg bg-[#31342b] bg-cover bg-center bg-no-repeat flex items-center justify-center text-4xl md:text-6xl font-bold text-primary font-qwitcher">
                {title}
            </section>
        </>
    );
}

export default Banner;
