"use client";

import { useState, type FormEvent } from "react";
import { toast } from "react-hot-toast";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { sendContactMessage } from "../services/contactService";

const contactDetails = [
    "I Want Jewels Boutique",
    "Email: info@iwantjewels.com",
];

const openHours = [
    "Mon - Fri: 7:30am - 8:00pm PST",
    "Saturday: 8:00am - 6:00pm PST",
    "Sunday: 9:00am - 5:00pm PST",
];

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedMessage = message.trim();

        if (!trimmedName || !trimmedEmail || !trimmedMessage) {
            toast.error("Please fill in your name, email, and message.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await sendContactMessage({
                name: trimmedName,
                email: trimmedEmail,
                message: trimmedMessage,
            });

            toast.success(
                response.message ||
                    "Thank you for your message. We will get back to you soon!",
            );
            setName("");
            setEmail("");
            setMessage("");
        } catch {
            toast.error(
                "Unable to send your message right now. Please try again.",
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-parsi">
            <Header />

            <main>
                <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:px-10 lg:py-16">
                    <div className="mx-auto max-w-[1480px]">
                        <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                            Homepage / Contact Us
                        </p>
                        <h1 className="mt-3 text-[28px] font-medium uppercase tracking-[0.06em] text-zinc-900 sm:text-[36px] lg:text-[44px]">
                            Contact Us
                        </h1>
                    </div>
                </section>
                <section className="mx-auto max-w-[1480px] px-6 py-12 lg:px-10 lg:py-16">
                    <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
                        <div>
                            <h2 className="text-[14px] font-medium uppercase tracking-[0.22em] text-zinc-600 sm:text-xl">
                                Get In Touch With Our Team
                            </h2>
                            <p className="mt-4 max-w-2xl text-[14px] leading-7 text-zinc-600">
                                Reach out for support, product questions, or
                                order assistance. We&apos;re always happy to
                                help.
                            </p>

                            <form
                                className="mt-8 space-y-4"
                                onSubmit={(event) => void handleSubmit(event)}
                            >
                                <div className="grid gap-4 md:grid-cols-2">
                                    <input
                                        type="text"
                                        placeholder="Your Name*"
                                        value={name}
                                        onChange={(event) =>
                                            setName(event.target.value)
                                        }
                                        required
                                        className="h-12 border border-zinc-300 bg-white px-4 text-[14px] text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Your Email*"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                        required
                                        className="h-12 border border-zinc-300 bg-white px-4 text-[14px] text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900"
                                    />
                                </div>

                                <textarea
                                    placeholder="Your Message*"
                                    rows={6}
                                    value={message}
                                    onChange={(event) =>
                                        setMessage(event.target.value)
                                    }
                                    required
                                    className="w-full border border-zinc-300 bg-white px-4 py-3 text-[14px] text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900"
                                />

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-pink-500 px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60 sm:text-[13px]"
                                >
                                    {isSubmitting
                                        ? "Sending..."
                                        : "Send Message"}
                                </button>
                            </form>
                        </div>

                        <div className="space-y-10 lg:pl-6">
                            <div>
                                <h3 className="text-[14px] font-medium uppercase tracking-[0.22em] text-zinc-600">
                                    Our Store
                                </h3>
                                <div className="mt-4 space-y-2 text-[14px] leading-7 text-zinc-700">
                                    {contactDetails.map((detail) => (
                                        <p key={detail}>{detail}</p>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[14px] font-medium uppercase tracking-[0.22em] text-zinc-600">
                                    Open Hours
                                </h3>
                                <div className="mt-4 space-y-2 text-[14px] leading-7 text-zinc-700">
                                    {openHours.map((time) => (
                                        <p key={time}>{time}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
