type NewsletterSectionProps = {
  title?: string
  description?: string
}

export default function NewsletterSection({
  title = "Join Our Jewellery Insider List",
  description = "Subscribe to receive new jewellery releases, exclusive offers, and style inspiration directly to your inbox.",
}: NewsletterSectionProps) {
  return (
    <section className="px-3 py-4 sm:px-4 md:px-8 md:py-8">
      <div
        className="
          mx-auto max-w-[1640px]
          rounded-[1.8rem] sm:rounded-[2.3rem]
          bg-[#f53aa9]
          px-4 py-8
          sm:px-6 sm:py-10
          md:px-12 md:py-16
          lg:px-20 lg:py-20
          text-center text-white
          shadow-[0_18px_60px_rgba(245,58,169,0.18)]
        "
      >
        {/* Title */}
        <h2
          className="
            text-[1.9rem] leading-tight font-semibold tracking-[-0.03em]
            sm:text-4xl
            md:text-5xl
          "
        >
          {title}
        </h2>

        {/* Description */}
        <p
          className="
            mx-auto mt-4 max-w-4xl
            text-sm leading-6 text-white/95
            sm:text-base sm:leading-7
            md:mt-5 md:text-[1.05rem]
          "
        >
          {description}
        </p>

        {/* Form */}
        <form
          className="mx-auto mt-8 max-w-[770px] sm:mt-10 md:mt-12"
          action="#"
          method="post"
        >
          <div
            className="
              flex flex-col gap-2
              rounded-[1.1rem]
              bg-white p-1.5
              shadow-[0_8px_24px_rgba(17,17,17,0.12)]

              sm:flex-row sm:items-center sm:gap-0
            "
          >
            {/* Input */}
            <input
              type="email"
              placeholder="Enter your e-mail"
              className="
                h-[52px] w-full
                rounded-[0.9rem]
                border-0 bg-transparent
                px-4 text-sm text-zinc-800
                outline-none
                placeholder:text-[#97a2bc]

                sm:h-[60px] sm:flex-1 sm:px-5 sm:text-base
              "
            />

            {/* Button */}
            <button
              type="submit"
              className="
                h-[50px] w-full
                rounded-[0.9rem]
                bg-[#1f1d1e]
                px-6 text-sm font-semibold uppercase text-white
                transition hover:bg-black

                sm:h-[56px] sm:w-auto sm:min-w-[198px] sm:px-8 sm:text-base
              "
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}