'use client'

import { useState, type FormEvent } from 'react'
import { toast } from 'react-hot-toast'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { sendContactMessage } from '../services/contactService'

const contactDetails = [
  'I Want Jewels Boutique',
  // '12 Diamond Street, Antwerp 2000',
  // 'Phone: +32 466 88 88 88',
  'Email: info@iwantjewels.com',
]

const openHours = [
  'Mon - Fri: 7:30am - 8:00pm PST',
  'Saturday: 8:00am - 6:00pm PST',
  'Sunday: 9:00am - 5:00pm PST',
]

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedMessage = message.trim()

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      toast.error('Please fill in your name, email, and message.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await sendContactMessage({
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
      })

      toast.success(response.message || 'Thank you for your message. We will get back to you soon!')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      toast.error('Unable to send your message right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header />

      <main>
        <section className="bg-[linear-gradient(180deg,_#f6f1e8,_#fff_80%)] px-4 py-14 text-center md:py-20">
          <h1 className="text-3xl font-semibold md:text-4xl">Contact Us</h1>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">Homepage / Contact Us</p>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 md:py-18">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
            <div>
              <h2 className="text-3xl font-semibold md:text-4xl">Get In Touch With Our Team</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500 md:text-base">
                Reach out for support, product questions, or order assistance. We&apos;re always happy to help.
              </p>

              <form className="mt-8 space-y-4" onSubmit={(event) => void handleSubmit(event)}>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Your Name*"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    className="h-12 rounded-md border border-zinc-200 px-4 text-sm outline-none transition focus:border-zinc-900"
                  />
                  <input
                    type="email"
                    placeholder="Your Email*"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="h-12 rounded-md border border-zinc-200 px-4 text-sm outline-none transition focus:border-zinc-900"
                  />
                </div>

                <textarea
                  placeholder="Your Message*"
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                  className="w-full rounded-md border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-zinc-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            <div className="space-y-10 lg:pl-6">
              <div>
                <h3 className="text-2xl font-semibold">Our Store</h3>
                <div className="mt-4 space-y-2 text-sm leading-6 text-zinc-600">
                  {contactDetails.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold">Open Hours</h3>
                <div className="mt-4 space-y-2 text-sm leading-6 text-zinc-600">
                  {openHours.map((time) => (
                    <p key={time}>{time}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16">
          <div className="overflow-hidden rounded-sm border border-zinc-200 bg-zinc-100 shadow-sm">
            <iframe
              title="Store location map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=4.381%2C51.207%2C4.431%2C51.229&layer=mapnik&marker=51.2181%2C4.4025"
              className="h-[420px] w-full md:h-[520px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
