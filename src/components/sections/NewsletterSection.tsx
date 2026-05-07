type NewsletterSectionProps = {
    title?: string;
    description?: string;
};

export default function NewsletterSection({
    title = "Join Our Jewellery Insider List",
    description = "Subscribe to receive new jewellery releases, exclusive offers, and style inspiration directly to your inbox.",
}: NewsletterSectionProps) {
    return (
        <section className="font-parsi container mx-auto">
            <div className="bg-black text-center text-white ">
                <div className="mx-auto max-w-[1100px] px-4 py-12 sm:py-14 md:py-16 lg:py-20">
                    <h2 className="text-[26px] font-medium uppercase leading-tight tracking-[0.04em] sm:text-[34px] md:text-[42px] lg:text-[48px]">
                        {title}
                    </h2>
                    <p className="mx-auto mt-4 max-w-3xl text-[12px] leading-6 text-white/85 sm:text-[13px] md:text-[14px]">
                        {description}
                    </p>

                    <form
                        className="mx-auto mt-8 flex max-w-[800px] flex-col sm:mt-10 sm:flex-row md:mt-12"
                        action="#"
                        method="post"
                    >
                        <input
                            type="email"
                            placeholder="Enter your E-mail"
                            className="h-[52px] w-full bg-zinc-200 px-5 text-[14px] text-zinc-700 outline-none placeholder:text-zinc-500 sm:h-[60px] sm:flex-1 sm:px-6 sm:text-[15px]"
                        />
                        <button
                            type="submit"
                            className="h-[52px] w-full bg-pink-500 px-8 text-[13px] font-medium uppercase tracking-[0.22em] text-white transition hover:bg-pink-600 sm:h-[60px] sm:w-auto sm:min-w-[200px] sm:text-[14px]"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
            <div className="h-2 w-full bg-pink-500" />
        </section>
    );
}
