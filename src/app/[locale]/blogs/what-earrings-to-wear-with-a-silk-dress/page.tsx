import { localizedAlternates } from '@/i18n/metadata'
import React from "react";
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogSidebar from "@/components/shared/BlogSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const base = {
    title: "What Earrings to Wear With a Silk Dress | Cadenza M Diamond Stud Earrings",
    description:
        "Wondering what earrings to wear with a silk dress? Discover timeless styling tips and why the Cadenza M Lab-Grown Diamond Stud Earrings are the perfect match for silk outfits."
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/blogs/what-earrings-to-wear-with-a-silk-dress', locale),
  }
}

const articleData: ArticleSection[] = [
    {
        content: [
            {
                type: "paragraph",
                text: "Silk dresses have a unique quality that very few fabrics can match.",
            },
            {
                type: "paragraph",
                text: "They don't need excessive styling to look elegant. The fabric already creates movement, softness and a natural sense of luxury. That is exactly why choosing the right jewellery becomes so important. The wrong earrings can easily overpower the outfit, while the right pair quietly enhances everything the dress already does well.",
            },
            {
                type: "paragraph",
                text: "This is one of the reasons people often hesitate before getting dressed for an anniversary dinner, a wedding, a cocktail evening or a formal celebration. The dress feels perfect, but the jewellery suddenly becomes a difficult decision.",
            },
            {
                type: "paragraph",
                text: "Should you wear statement earrings?",
            },
            {
                type: "paragraph",
                text: "Would drop earrings be too dramatic?",
            },
            {
                type: "paragraph",
                text: "Do diamond studs look too simple?",
            },
            {
                type: "paragraph",
                text: "The answer is usually much simpler than people expect.",
            },
            {
                type: "paragraph",
                text: "Silk is already the statement.",
            },
            {
                type: "paragraph",
                text: "Your jewellery should complement the fabric rather than compete with it.",
            },
            {
                type: "paragraph",
                text: "This approach has become increasingly popular among stylists because modern luxury is no longer about wearing more accessories. Instead, it is about creating balance. Every element of an outfit should work together naturally without one piece demanding all the attention.",
            },
            {
                type: "paragraph",
                text: "That is exactly why timeless diamond stud earrings remain one of the safest choices for silk dresses.",
            },
            {
                type: "paragraph",
                text: "Their clean design allows the texture and movement of silk to remain the focal point while introducing just enough sparkle to brighten the face. Instead of distracting from the elegance of the outfit, they enhance it.",
            },
            {
                type: "paragraph",
                text: "Medium diamond studs are particularly versatile because they provide noticeable brilliance without becoming overwhelming. They suit minimalist silk slip dresses, elegant midi dresses and sophisticated evening gowns equally well.",
            },
            {
                type: "paragraph",
                text: "The Cadenza M Lab-Grown Diamond Stud Earrings have been designed around this timeless philosophy. Their classic medium solitaire design combines brilliant lab-grown diamonds, premium 925 sterling silver and luxurious 14kt gold plating to create earrings that pair beautifully with silk while remaining versatile enough for everyday elegance. Rather than becoming jewellery reserved for special occasions, they naturally become part of a modern wardrobe.",
            },
        ],
    },
    {
        heading: "Quick Answer",
        content: [
            {
                type: "paragraph",
                text: "The best earrings to wear with a silk dress are timeless medium diamond stud earrings. They add refined sparkle without distracting from the natural elegance of the fabric. The Cadenza M Lab-Grown Diamond Stud Earrings combine a classic solitaire design with brilliant lab-grown diamonds, making them an ideal choice for weddings, anniversary dinners, cocktail parties and formal occasions.",
            },
        ],
    },
    {
        heading: "Frequently Asked Questions",
        content: [
            {
                type: "paragraph",
                text: "Do diamond stud earrings go with silk dresses?",
            },
            {
                type: "paragraph",
                text: "Yes. Diamond stud earrings complement the soft elegance of silk without overwhelming the overall outfit.",
            },
            {
                type: "paragraph",
                text: "Should I wear statement earrings with a silk dress?",
            },
            {
                type: "paragraph",
                text: "Only if the dress is extremely simple. Most silk dresses already create visual elegance, making timeless diamond studs the more balanced option.",
            },
            {
                type: "paragraph",
                text: "What jewellery looks best with satin and silk fabrics?",
            },
            {
                type: "paragraph",
                text: "Classic diamond jewellery, delicate bracelets and refined rings usually work best because they enhance rather than compete with luxurious fabrics.",
            },
            {
                type: "paragraph",
                text: "Are medium diamond studs suitable for evening events?",
            },
            {
                type: "paragraph",
                text: "Absolutely. Medium solitaire diamond studs provide enough brilliance for formal occasions while remaining elegant and understated.",
            },
        ],
    },
    {
        heading: "Why Silk Dresses Look Best With Timeless Jewellery",
        content: [
            {
                type: "paragraph",
                text: "One of the biggest strengths of silk is that it naturally creates elegance without requiring excessive styling. The way the fabric catches light, drapes across the body and moves while walking already gives an outfit a luxurious appearance. Because the dress itself becomes the visual focus, jewellery should support that elegance rather than interrupt it.",
            },
            {
                type: "paragraph",
                text: "This explains why classic jewellery consistently outperforms trend-led accessories when paired with silk. Timeless pieces create harmony, while oversized statement earrings can sometimes compete with the softness of the fabric. The result is often an outfit that feels less balanced than intended.",
            },
            {
                type: "paragraph",
                text: "Diamond stud earrings solve this beautifully because they introduce sparkle in a controlled, refined way. They illuminate the face without adding unnecessary volume around the neckline or shoulders. Whether the silk dress features a high neckline, cowl neck, V-neck or minimalist slip silhouette, solitaire studs maintain visual balance.",
            },
            {
                type: "paragraph",
                text: "The Cadenza M Lab-Grown Diamond Stud Earrings reflect this philosophy perfectly. Their medium solitaire setting allows the brilliance of the lab-grown diamonds to enhance the luxurious appearance of silk while maintaining timeless sophistication. Premium 925 sterling silver and elegant 14kt gold plating further reinforce their refined aesthetic, making them an effortless companion for elegant fabrics.",
            },
            {
                type: "subheading",
                text: "Why Diamond Studs Pair Perfectly with Silk Dresses",
            },
            {
                type: "table",
                headers: ["Feature", "Styling Benefit"],
                rows: [
                    ["Medium Solitaire Design", "Adds sparkle without overpowering silk"],
                    ["Timeless Elegance", "Complements every silk dress style"],
                    ["Premium Craftsmanship", "Enhances luxury fabrics beautifully"],
                    ["Everyday Versatility", "Suitable beyond formal occasions"],
                    ["Comfortable Wear", "Perfect for long events and celebrations"],
                ],
            },
        ],
    },
    {
        heading: "The Best Jewellery Doesn't Compete With the Dress",
        content: [
            {
                type: "paragraph",
                text: "One of the easiest ways to elevate an outfit is surprisingly simple: Allow one element to become the hero.",
            },
            {
                type: "paragraph",
                text: "When wearing a silk dress, that hero is usually the fabric itself. The smooth texture, natural movement and understated luxury already make a statement. Choosing jewellery that supports rather than competes with these qualities creates a look that feels refined, confident and timeless.",
            },
            {
                type: "paragraph",
                text: "That is exactly why medium diamond stud earrings continue to remain one of the most recommended styling choices for silk dresses. They prove that true elegance is rarely about wearing more jewellery. It is about choosing jewellery that allows every part of the outfit to work together beautifully.",
            },
            {
                type: "subheading",
                text: "Silk Dress Occasions Where Medium Diamond Studs Shine",
            },
            {
                type: "table",
                headers: ["Occasion", "Why They Work"],
                rows: [
                    ["Anniversary Dinner", "Elegant without excess"],
                    ["Wedding Guest Outfit", "Timeless sophistication"],
                    ["Cocktail Party", "Refined sparkle"],
                    ["Formal Dinner", "Balanced evening styling"],
                    ["Luxury Celebration", "Understated glamour"],
                    ["Evening Event", "Effortless elegance"],
                ],
            },
        ],
    },
    {
        heading:
            "How to Match Diamond Stud Earrings with Different Silk Dress Styles",
        content: [
            {
                type: "paragraph",
                text: "Not every silk dress looks the same.",
            },
            {
                type: "paragraph",
                text: "Some are designed for elegant evening dinners, while others are perfect for weddings, cocktail parties or formal celebrations. The colour, neckline, sleeve design and silhouette all influence the overall appearance of the outfit. This is exactly why choosing jewellery should never be an afterthought.",
            },
            {
                type: "paragraph",
                text: "Fortunately, timeless diamond stud earrings make this decision much easier.",
            },
            {
                type: "paragraph",
                text: "Unlike oversized statement earrings that often suit only one particular style, medium diamond studs adapt naturally to different dress designs. Whether your silk dress is minimal or more detailed, they introduce just enough brilliance to elevate the outfit without changing its overall character.",
            },
            {
                type: "paragraph",
                text: "A classic silk slip dress, for example, already creates a clean and sophisticated silhouette. Adding dramatic jewellery often disrupts that simplicity. Medium solitaire diamond studs maintain the elegance of the dress while bringing attention to the face rather than overwhelming the neckline.",
            },
            {
                type: "paragraph",
                text: "Similarly, dresses with high necklines or long sleeves benefit from understated jewellery because the clothing itself already creates visual interest. In these situations, diamond studs become the perfect finishing touch rather than another competing feature.",
            },
            {
                type: "paragraph",
                text: "The Cadenza M Lab-Grown Diamond Stud Earrings have been designed around exactly this level of versatility. Their timeless solitaire setting showcases brilliant lab-grown diamonds within a refined design crafted from premium 925 sterling silver and finished with luxurious 14kt gold plating. This allows them to pair effortlessly with almost every silk dress style while remaining elegant enough for countless other occasions throughout the year.",
            },
            {
                type: "paragraph",
                text: "Another reason medium diamond studs perform so well is that they complement changing fashion trends instead of following them. Silk dresses continue evolving through different colours, cuts and silhouettes each season, yet timeless solitaire earrings remain just as relevant because their beauty comes from proportion rather than fashion.",
            },
            {
                type: "subheading",
                text: "Best Earrings for Different Silk Dress Styles",
            },
            {
                type: "table",
                headers: ["Silk Dress Style", "Why Medium Diamond Studs Work"],
                rows: [
                    ["Slip Dress", "Keeps the look elegant and balanced"],
                    ["Satin Midi Dress", "Adds refined sparkle"],
                    ["High-Neck Silk Dress", "Frames the face beautifully"],
                    ["Wrap Dress", "Complements the flowing silhouette"],
                    ["Off-Shoulder Silk Dress", "Creates understated luxury"],
                ],
            },
        ],
    },
    {
        heading:
            "Why Medium Diamond Stud Earrings Are More Versatile Than Statement Earrings",
        content: [
            {
                type: "paragraph",
                text: "There is a common belief that formal outfits require dramatic jewellery.",
            },
            {
                type: "paragraph",
                text: "In reality, the opposite is often true.",
            },
            {
                type: "paragraph",
                text: "The more elegant the clothing, the more carefully jewellery should be selected. Luxury styling is rarely about wearing the largest diamonds or the boldest accessories. Instead, it is about achieving balance so that every element works together naturally.",
            },
            {
                type: "paragraph",
                text: "Statement earrings certainly create impact, but they also limit flexibility. They often suit one hairstyle, one neckline or one particular event. Medium diamond stud earrings offer something far more valuable.",
            },
            {
                type: "paragraph",
                text: "They adapt.",
            },
            {
                type: "paragraph",
                text: "They work with loose waves, sleek ponytails, elegant updos and shoulder-length hairstyles.",
            },
            {
                type: "paragraph",
                text: "They complement V-necks, cowl necks, halter dresses and minimalist silhouettes.",
            },
            {
                type: "paragraph",
                text: "Most importantly, they never feel excessive.",
            },
            {
                type: "paragraph",
                text: "This adaptability is exactly why timeless solitaire earrings remain one of the strongest investments in any jewellery collection. Instead of purchasing different earrings for every formal occasion, one beautifully crafted pair can accompany weddings, anniversary dinners, cocktail parties, milestone birthdays and elegant evenings throughout the year.",
            },
            {
                type: "paragraph",
                text: "The Cadenza M Lab-Grown Diamond Stud Earrings reflect this philosophy through timeless craftsmanship rather than trend-driven design. Their balanced medium solitaire setting offers noticeable brilliance while remaining understated enough for everyday sophistication. Combined with premium 925 sterling silver, luxurious 14kt gold plating and brilliant lab-grown diamonds, they deliver exceptional versatility across every season and every occasion.",
            },
            {
                type: "subheading",
                text: "Medium Diamond Studs vs Statement Earrings",
            },
            {
                type: "table",
                headers: ["Feature", "Medium Diamond Studs", "Statement Earrings"],
                rows: [
                    ["Silk Dresses", "Perfectly balanced", "Can overpower the fabric"],
                    ["Everyday Wear", "Excellent", "Limited"],
                    ["Formal Dinners", "Elegant", "Sometimes excessive"],
                    ["Weddings", "Timeless choice", "Depends on outfit"],
                    ["Long-Term Versatility", "Outstanding", "Occasion specific"],
                ],
            },
        ],
    },
    {
        heading: "Why Timeless Jewellery Makes Dressing Simpler",
        content: [
            {
                type: "paragraph",
                text: "One of the greatest benefits of timeless jewellery is confidence.",
            },
            {
                type: "paragraph",
                text: "You never need to question whether it works.",
            },
            {
                type: "paragraph",
                text: "When a jewellery piece naturally complements almost every outfit, getting dressed becomes much easier. Instead of standing in front of the mirror comparing different accessories, you already know the earrings will work.",
            },
            {
                type: "paragraph",
                text: "This is particularly valuable for women who regularly attend formal dinners, weddings, celebrations and business events. A dependable pair of medium diamond stud earrings removes uncertainty while maintaining an elegant appearance across every occasion.",
            },
            {
                type: "paragraph",
                text: "The Cadenza M Lab-Grown Diamond Stud Earrings have been created with this exact purpose. Their timeless medium solitaire design allows them to move effortlessly from daytime sophistication to evening elegance while maintaining the same refined appearance. Rather than becoming jewellery reserved for one special outfit, they become a trusted favourite that continues enhancing your wardrobe for years to come.",
            },
            {
                type: "subheading",
                text: "Why Timeless Jewellery Is Always Worth Investing In",
            },
            {
                type: "table",
                headers: ["Quality", "Long-Term Benefit"],
                rows: [
                    ["Timeless Design", "Never feels outdated"],
                    ["Premium Craftsmanship", "Built for years of wear"],
                    ["Everyday Versatility", "Suitable for countless occasions"],
                    ["Elegant Simplicity", "Complements every wardrobe"],
                    ["Emotional Value", "Creates lasting memories"],
                ],
            },
        ],
    },
    {
        heading:
            "Common Mistakes to Avoid When Pairing Earrings with a Silk Dress",
        content: [
            {
                type: "paragraph",
                text: "Silk is one of the few fabrics that naturally looks luxurious without requiring excessive accessories. Its smooth texture, soft movement and subtle shine already create an elegant statement, which is why choosing the right jewellery becomes so important. Unfortunately, many people assume that because silk feels luxurious, it must be paired with equally dramatic jewellery.",
            },
            {
                type: "paragraph",
                text: "In reality, that approach often produces the opposite effect.",
            },
            {
                type: "paragraph",
                text: "One of the most common styling mistakes is wearing oversized statement earrings with an already elegant silk dress. If the dress features a satin finish, flowing silhouette or rich colour, large earrings can compete with the fabric instead of complementing it. Rather than creating harmony, the outfit begins to feel visually crowded.",
            },
            {
                type: "paragraph",
                text: "Another mistake is choosing jewellery that only works for one particular occasion. Many women buy bold earrings specifically for weddings or formal dinners, only to discover that they are difficult to wear again. Jewellery should become part of your wardrobe rather than something reserved for one evening each year.",
            },
            {
                type: "paragraph",
                text: "This is one of the biggest reasons timeless medium diamond stud earrings continue remaining a favourite among stylists. Their understated brilliance allows the silk dress to remain the centre of attention while adding just enough sparkle to brighten the overall look. Whether you're attending a wedding, anniversary dinner, cocktail reception or formal celebration, they create elegance without appearing overstyled.",
            },
            {
                type: "paragraph",
                text: "The Cadenza M Lab-Grown Diamond Stud Earrings have been created with this balance in mind. Their medium solitaire design combines brilliant lab-grown diamonds, premium 925 sterling silver and luxurious 14kt gold plating, allowing them to complement luxurious fabrics instead of competing with them. Because they are designed around timeless proportions rather than changing trends, they continue looking sophisticated regardless of the dress style or occasion.",
            },
            {
                type: "paragraph",
                text: "Comfort is another factor that is often overlooked. Silk dresses are chosen because they feel effortless and graceful. Jewellery should offer the same experience. Lightweight, well-balanced earrings allow you to enjoy an evening without constantly adjusting your accessories or feeling weighed down.",
            },
            {
                type: "paragraph",
                text: "The finest styling decisions are usually the simplest ones. Instead of adding more jewellery, choosing one beautifully crafted pair of diamond studs often creates the most refined result.",
            },
            {
                type: "subheading",
                text: "Common Styling Mistakes and Better Alternatives",
            },
            {
                type: "table",
                headers: ["Common Mistake", "Better Styling Choice"],
                rows: [
                    ["Oversized statement earrings", "Medium solitaire diamond studs"],
                    ["Too many accessories", "Minimal, balanced jewellery"],
                    ["Trend-driven jewellery", "Timeless classic designs"],
                    ["Earrings for one occasion only", "Versatile everyday luxury"],
                    ["Heavy evening jewellery", "Comfortable premium craftsmanship"],
                ],
            },
        ],
    },
    {
        heading:
            "Why the Cadenza M Lab-Grown Diamond Stud Earrings Are the Perfect Match for Silk Dresses",
        content: [
            {
                type: "paragraph",
                text: "When choosing jewellery for elegant fabrics, versatility matters just as much as beauty.",
            },
            {
                type: "paragraph",
                text: "The ideal earrings should feel appropriate with a silk slip dress at an anniversary dinner, a satin midi dress at a wedding, a tailored silk blouse during a business event and an evening gown at a formal celebration. That kind of flexibility is exactly what transforms fine jewellery from an occasional accessory into an everyday investment.",
            },
            {
                type: "paragraph",
                text: "The Cadenza M Lab-Grown Diamond Stud Earrings have been designed around this philosophy.",
            },
            {
                type: "paragraph",
                text: "Their medium solitaire setting creates a beautiful balance between subtle elegance and noticeable brilliance. The carefully selected lab-grown diamonds reflect light naturally, adding sparkle without overwhelming the softness of silk. Crafted from premium 925 sterling silver and finished with luxurious 14kt gold plating, they combine timeless craftsmanship with everyday practicality.",
            },
            {
                type: "paragraph",
                text: "Another reason these earrings work so well is their ability to adapt to changing personal style. Fashion evolves over time, but classic solitaire jewellery rarely loses its appeal. Whether your wardrobe includes minimalist neutral tones, bold evening dresses or sophisticated tailoring, medium diamond studs continue complementing every outfit.",
            },
            {
                type: "paragraph",
                text: "That long-term versatility makes them one of the smartest jewellery investments.",
            },
            {
                type: "paragraph",
                text: "Instead of purchasing separate earrings for dinners, weddings, anniversaries and celebrations, one beautifully crafted pair accompanies every occasion with effortless elegance.",
            },
            {
                type: "paragraph",
                text: "The emotional value also grows naturally over time. Earrings first worn with a favourite silk dress at an anniversary dinner may later accompany birthdays, family celebrations, holidays and countless memorable evenings. Gradually, they become more than jewellery. They become part of your personal story.",
            },
            {
                type: "subheading",
                text: "Why Cadenza M Complements Silk Better Than Trend-Led Jewellery",
            },
            {
                type: "table",
                headers: ["Feature", "Benefit"],
                rows: [
                    ["Medium Solitaire Design", "Perfect balance of sparkle and elegance"],
                    ["Lab-Grown Diamonds", "Brilliant light reflection"],
                    ["925 Sterling Silver", "Premium durability"],
                    ["14kt Gold Plating", "Luxurious timeless finish"],
                    ["Everyday Versatility", "Suitable for every elegant occasion"],
                    ["Classic Styling", "Complements every silk dress beautifully"],
                ],
            },
        ],
    },
    {
        content: [
            {
                type: "faq",
                title: "Frequently Asked Questions",
                items: [
                    {
                        question: "What earrings look best with a silk dress?",
                        answer: "Medium diamond stud earrings are one of the best choices because they enhance the elegance of silk without distracting from the fabric's natural beauty.",
                    },
                    {
                        question: "Are diamond stud earrings suitable for formal silk dresses?",
                        answer: "Yes. Diamond stud earrings provide timeless sophistication and pair beautifully with silk dresses worn for weddings, formal dinners, cocktail parties and celebrations.",
                    },
                    {
                        question: "Should I wear statement earrings with a silk dress?",
                        answer: "Only in specific situations. Most silk dresses already make a visual statement, so timeless diamond studs usually create a more balanced and elegant appearance.",
                    },
                    {
                        question: "Can medium diamond studs be worn with different colours of silk dresses?",
                        answer: "Absolutely. They complement black, navy, emerald, champagne, blush, ivory, burgundy and almost every other silk colour because diamonds are naturally versatile.",
                    },
                    {
                        question: "Are the Cadenza M Lab-Grown Diamond Stud Earrings suitable for everyday wear?",
                        answer: "Yes. Their timeless medium solitaire design allows them to transition effortlessly between everyday styling and formal occasions, making them one of the most versatile jewellery choices available.",
                    },
                    {
                        question: "Are lab-grown diamonds real diamonds?",
                        answer: "Yes. Lab-grown diamonds have the same physical, chemical and optical properties as mined diamonds and offer identical brilliance, durability and beauty.",
                    },
                    {
                        question: "Will medium diamond stud earrings ever go out of style?",
                        answer: "No. Classic solitaire diamond studs have remained timeless for generations because they prioritise elegance, quality and proportion rather than seasonal trends.",
                    },
                    {
                        question: "How should I care for diamond stud earrings?",
                        answer: "Store them in a soft jewellery box, clean them regularly with a lint-free cloth and avoid prolonged exposure to perfumes, lotions and harsh chemicals to preserve their brilliance and finish.",
                    },
                ],
            },
        ],
    },
    {
        heading: "Conclusion",
        content: [
            {
                type: "paragraph",
                text: "Silk dresses are naturally elegant, which is why they deserve jewellery that enhances rather than competes with their beauty. The most successful styling decisions are rarely the boldest ones. Instead, they focus on balance, timeless design and effortless sophistication.",
            },
            {
                type: "paragraph",
                text: "Medium diamond stud earrings achieve this beautifully by introducing refined sparkle without overwhelming the softness and movement of silk. They work across different dress styles, colours and occasions while remaining just as elegant years later as they are today.",
            },
            {
                type: "paragraph",
                text: "The Cadenza M Lab-Grown Diamond Stud Earrings combine brilliant lab-grown diamonds, premium 925 sterling silver, luxurious 14kt gold plating and a timeless medium solitaire design to create jewellery that complements silk effortlessly. Their versatility allows them to transition from elegant dinners and weddings to milestone celebrations and everyday luxury without ever feeling out of place.",
            },
            {
                type: "paragraph",
                text: "If you're looking for earrings that pair beautifully with silk dresses while continuing to add value to your jewellery collection for years to come, the Cadenza M Lab-Grown Diamond Stud Earrings offer exactly that balance of timeless craftsmanship, everyday versatility and understated elegance.",
            },
        ],
    },
];

const BlogPage = () => (
    <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12 relative mb-20">
            <div className="flex-1 w-full lg:w-2/3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/blog-images/blog-image-27.jpg"
                    alt=""
                    className="w-full h-auto mb-6"
                />
                <h1 className="text-4xl md:text-5xl font-play font-semibold text-[#1f2732] mb-6">
                    What Earrings to Wear With a Silk Dress
                </h1>
                <DynamicArticle sections={articleData} />
            </div>
            <BlogSidebar
                className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit"
                currentHref="/blogs/what-earrings-to-wear-with-a-silk-dress"
            />
        </div>
        <Footer />
    </div>
);

export default BlogPage;
