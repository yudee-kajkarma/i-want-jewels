type NewsletterSectionProps = {
  title?: string
  description?: string
}

export default function NewsletterSection({
  title = 'Join Our Jewellery Insider List',
  description = 'Subscribe to receive new jewellery releases, exclusive offers, and style inspiration directly to your inbox.',
}: NewsletterSectionProps) {
  return (
    <section className="px-4 py-5 md:px-8 md:py-8">
      <div className="mx-auto max-w-[1640px] rounded-[2.3rem] bg-[#f53aa9] px-6 py-14 text-center text-white shadow-[0_18px_60px_rgba(245,58,169,0.18)] md:px-12 md:py-20 lg:px-20">
        <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-5xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-4xl text-base leading-7 text-white/95 md:text-[1.05rem]">
          {description}
        </p>

        <form className="mx-auto mt-12 max-w-[770px]" action="#" method="post">
          <div className="flex flex-col rounded-[1.2rem] bg-white p-1.5 shadow-[0_8px_24px_rgba(17,17,17,0.12)] sm:flex-row sm:items-center">
            <input
              type="email"
              placeholder="Enter your e-mail"
              className="h-[60px] flex-1 rounded-[1rem] border-0 bg-transparent px-5 text-lg text-zinc-800 outline-none placeholder:text-[#97a2bc]"
            />
            <button
              type="submit"
              className="h-[56px] rounded-[1rem] bg-[#1f1d1e] px-8 text-base font-semibold uppercase text-white transition hover:bg-black sm:min-w-[198px]"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}