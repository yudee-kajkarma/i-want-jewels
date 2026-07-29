import type { Metadata } from 'next'
import ResourceArticleV2Page from '../../../../../views/ResourceArticleV2Page'
import type {
  V2ArticleSection,
  V2HeroIntro,
  V2QuickSummary,
  V2FAQItem,
  V2CTABlock,
} from '../../../../../views/ResourceArticleV2Page'
import { getCategoryBySlug, getArticleBySlug, getRelatedArticles } from '../../../../../data/resources'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Mother of the Bride Jewellery Gifts',
  description:
    'Choose mother of the bride jewellery gifts with lab grown diamond earrings, studs, drops, huggies, butterfly earrings and elegant wedding gift ideas.',
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-1.jpg',
  title: 'Mother of the Bride Jewellery Gifts:',
  subtitle: 'Elegant Earrings for the Wedding Day and After',
  paragraphs: [
    'Mother of the bride jewellery should feel elegant, thoughtful and wearable beyond the wedding day. This is not just a wedding accessory. It is often a thank-you gift, a sentimental keepsake and something she may wear during one of the most photographed and emotional days of the family.',
    'The best earrings for the mother of the bride or mother of the groom should complement her outfit without competing with the bride or bridal party. Classic diamond studs are the safest choice. Drop earrings are ideal when the outfit is formal, satin, structured or evening-ready. Butterfly earrings are strong when the gift should feel meaningful. Huggies are best if she prefers modern everyday jewellery. Minimalist earrings work well for a clean, understated mother-of-the-bride look.',
    'At IWantJewels, Cadenza M diamond stud earrings, Cadenza S lab-grown diamond studs, Orsola drop earrings, Concetta Long earrings, Concetta Short earrings, Alidi Farfalla butterfly earrings, Farfalla butterfly earrings, Amadea Huggie earrings and Laluce minimalist diamond earrings all work for different mother of the bride gift needs. Pave Hoops can work for a modern mother-of-the-bride outfit, while Lusso should only be used if she genuinely loves bold evening jewellery.',
  ],
  shopLabel: 'Shop Mother of the Bride Jewellery Gifts',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Choose mother of the bride jewellery gifts.',
    'Choose mother of the groom jewellery gifts.',
    'Pick earrings she can wear on the wedding day and after.',
    'Decide between diamond studs, drop earrings, huggies, butterfly earrings, hoops and minimalist earrings.',
    'Match earrings to mother-of-the-bride dresses, colours, necklines and hairstyles.',
    'Choose sentimental wedding jewellery gifts for mum.',
    'Choose jewellery for stepmum, grandmother or an important mother figure.',
    'Find IWantJewels product recommendations by wedding role and outfit style.',
  ],
  image: '/blog-images/blog-image-3.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Mother of the Bride Jewellery Gift Selector',
    content: [
      { type: 'paragraph', text: 'Use this table as the main gift decision tool.' },
      {
        type: 'table',
        headers: ['Gift Need', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Safest mother of the bride gift', 'Medium diamond studs', 'Cadenza M'],
          ['Subtle wedding gift', 'Small diamond studs', 'Cadenza S'],
          ['Elegant wedding-day gift', 'Drop earrings', 'Orsola'],
          ['Formal mother of the bride gift', 'Long drops or polished studs', 'Concetta Long, Cadenza M'],
          ['Soft wedding outfit gift', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
          ['Meaningful wedding gift for mum', 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
          ['Modern mother of the bride gift', 'Huggies', 'Amadea Huggie'],
          ['Minimalist mother of the bride gift', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
          ['Mother of the groom gift', 'Classic studs or elegant drops', 'Cadenza M, Orsola'],
          ['Wedding morning thank-you gift', 'Studs, butterfly earrings or drops', 'Cadenza M, Alidi Farfalla, Orsola'],
          ['If unsure of her style', 'Diamond studs', 'Cadenza M, Cadenza S'],
        ],
      },
    ],
  },
  {
    heading: 'What Makes Jewellery a Good Mother of the Bride Gift?',
    content: [
      { type: 'paragraph', text: 'A good mother of the bride jewellery gift should feel special without becoming too difficult to wear again. The wedding day is emotional, formal and highly photographed, so the jewellery should look polished with her outfit. But the gift should also make sense after the wedding with dinners, family events, holidays, date nights, birthdays and everyday styling.' },
      { type: 'paragraph', text: 'Earrings are especially strong because they do not require sizing and can be chosen around her outfit, hairstyle and personal taste. A pair of diamond studs can become a classic keepsake. A pair of drops can complete her wedding outfit. Butterfly earrings can carry sentimental meaning. Huggies or minimalist earrings can feel modern and practical for someone who prefers understated jewellery.' },
      {
        type: 'table',
        headers: ['What Makes It a Strong Gift', 'Why It Matters'],
        rows: [
          ['Wedding-day elegance', 'The earrings should look polished in photos'],
          ['Rewear value', 'She should be able to wear them after the wedding'],
          ['Personal meaning', 'The gift can feel like a thank-you and keepsake'],
          ['Comfort', 'She may wear them for many hours'],
          ['Outfit match', 'The jewellery should suit her dress colour and neckline'],
          ['Hairstyle visibility', 'Earrings should show without overpowering her look'],
          ['Metal colour match', 'The gift should suit her usual jewellery tone'],
          ['Timelessness', 'Mother-of-the-bride jewellery should not feel too trend-led'],
        ],
      },
      { type: 'see-also', text: 'Wedding party jewellery gifts', href: '/resources/jewellery-gift-guides/wedding-party-jewellery-gifts' },
    ],
  },
  {
    heading: 'Safest Mother of the Bride Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'The safest mother of the bride jewellery gifts are classic diamond studs, elegant drops and understated huggies. These pieces are polished, versatile and easy to wear again.' },
      { type: 'paragraph', text: 'Cadenza M is the strongest safe gift because it feels refined and visible without being too bold. Cadenza S works better if she prefers very subtle jewellery. Orsola is ideal if she enjoys elegant occasion outfits. Amadea and Laluce are better if she prefers modern or minimalist everyday styling.' },
      {
        type: 'table',
        headers: ['Safe Gift Option', 'Best For', 'Product Direction'],
        rows: [
          ['Medium diamond studs', 'Safest classic wedding gift', 'Cadenza M'],
          ['Small diamond studs', 'Subtle everyday sparkle', 'Cadenza S'],
          ['Drop earrings', 'Elegant wedding-day styling', 'Orsola'],
          ['Long drops', 'Formal wedding or black-tie styling', 'Concetta Long'],
          ['Huggies', 'Modern everyday wear', 'Amadea'],
          ['Minimalist earrings', 'Understated mother-of-the-bride look', 'Laluce'],
          ['Butterfly earrings', 'Meaningful sentimental gift', 'Alidi Farfalla, Farfalla'],
          ['Short drops', 'Soft wedding outfit styling', 'Concetta Short'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for mum', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-mum' },
    ],
  },
  {
    heading: 'Mother of the Bride vs Mother of the Groom Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'Mother of the bride and mother of the groom jewellery gifts can follow the same styling principles. Both should feel elegant, respectful and wearable. The main difference is often the emotional purpose. A mother of the bride gift may feel like a thank-you from the bride, while a mother of the groom gift may feel like a welcome, appreciation or wedding-day keepsake.' },
      { type: 'paragraph', text: 'For both, classic studs and elegant drops are safest. If the gift is sentimental, butterfly earrings can work beautifully. If the mother figure has modern taste, huggies or minimalist earrings may feel more natural.' },
      {
        type: 'table',
        headers: ['Recipient', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Mother of the bride', 'Classic studs, drops or meaningful earrings', 'Cadenza M, Orsola, Alidi Farfalla'],
          ['Mother of the groom', 'Classic studs, drops or huggies', 'Cadenza M, Orsola, Amadea'],
          ['Stepmum', 'Studs, huggies or delicate drops', 'Cadenza M, Amadea, Concetta Short'],
          ['Grandmother', 'Classic studs or elegant drops', 'Cadenza M, Orsola'],
          ['Mother figure', 'Butterfly earrings, studs or drops', 'Alidi Farfalla, Cadenza M, Orsola'],
          ['Modern mother figure', 'Huggies or minimalist earrings', 'Amadea, Laluce'],
          ['Formal wedding mother gift', 'Long drops or polished studs', 'Concetta Long, Cadenza M'],
          ['If unsure', 'Diamond studs', 'Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Mother of the Bride Earrings by Dress Colour',
    content: [
      { type: 'paragraph', text: 'Dress colour is one of the easiest ways to choose earrings for the mother of the bride. The earrings should support the outfit and make the look feel finished without drawing attention away from the bride.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-5.jpg',
        content: [
          {
            type: 'table',
            headers: ['Dress Colour', 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ['Navy', 'Medium studs, drops or huggies', 'Cadenza M, Orsola, Amadea'],
              ['Champagne', 'Drops, short drops or classic studs', 'Orsola, Concetta Short, Cadenza M'],
              ['Blush', 'Butterfly earrings, short drops or studs', 'Farfalla, Concetta Short, Cadenza M'],
              ['Dusty blue', 'Studs, huggies or minimalist earrings', 'Cadenza M, Amadea, Laluce'],
              ['Sage green', 'Gold drops, studs or huggies', 'Orsola, Cadenza M, Amadea'],
              ['Emerald green', 'Gold drops, polished studs or hoops', 'Orsola, Cadenza M, Pave Hoops'],
              ['Burgundy', 'Drops, long drops or medium studs', 'Orsola, Concetta Long, Cadenza M'],
              ['Silver or grey', 'White/silver tone studs or minimalist earrings', 'Cadenza M, Cadenza S, Laluce'],
              ['Black', 'Drops, studs or refined hoops', 'Orsola, Cadenza M, Pave Hoops'],
              ['Floral', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
              ['Satin', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Pastel', 'Butterfly earrings, short drops or small studs', 'Farfalla, Concetta Short, Cadenza S'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Jewellery with satin dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-satin-dress' },
    ],
  },
  {
    heading: 'Mother of the Bride Earrings by Neckline',
    content: [
      { type: 'paragraph', text: 'The neckline of the dress helps decide whether earrings should be simple, long, soft or more visible. If the neckline has heavy detail, choose studs or minimalist earrings. If the neckline is open, drops or butterfly earrings can look elegant.' },
      {
        type: 'table',
        headers: ['Dress Neckline', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['V-neck', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Sweetheart neckline', 'Butterfly earrings, short drops or studs', 'Farfalla, Concetta Short, Cadenza M'],
          ['Off-shoulder dress', 'Drops, studs or huggies', 'Orsola, Cadenza M, Amadea'],
          ['Strapless dress', 'Drops or polished studs', 'Orsola, Cadenza M'],
          ['Square neckline', 'Studs, huggies or short drops', 'Cadenza S, Amadea, Concetta Short'],
          ['High-neck dress', 'Studs, huggies or minimalist earrings', 'Cadenza M, Amadea, Laluce'],
          ['Halter dress', 'Studs or slim long drops', 'Cadenza M, Concetta Long'],
          ['Cowl neck', 'Studs or soft drops', 'Cadenza M, Orsola'],
          ['One-shoulder dress', 'Studs or clean drops', 'Cadenza M, Orsola'],
          ['Detailed neckline', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
        ],
      },
      { type: 'see-also', text: 'Jewellery for sweetheart neckline', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-sweetheart-neckline' },
    ],
  },
  {
    heading: 'Mother of the Bride Earrings by Hairstyle',
    content: [
      { type: 'paragraph', text: 'Hairstyle changes how visible the earrings are. A low bun or updo can carry drops beautifully. Hair down may need medium studs, huggies or visible drops. Short hair can look polished with studs, huggies, drops or refined hoops.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-7.jpg',
        content: [
          {
            type: 'table',
            headers: ['Hairstyle', 'Best Earring Direction', 'Product Direction'],
            rows: [
              ['Soft waves', 'Drops, medium studs or butterfly earrings', 'Orsola, Cadenza M, Farfalla'],
              ['Hair down', 'Medium studs, huggies or drops', 'Cadenza M, Amadea, Orsola'],
              ['Half-up hair', 'Studs, huggies or butterfly earrings', 'Cadenza M, Amadea, Farfalla'],
              ['Low bun', 'Drops, long drops or butterfly earrings', 'Orsola, Concetta Long, Farfalla'],
              ['Sleek bun', 'Drops, studs or huggies', 'Orsola, Cadenza M, Amadea'],
              ['Chignon', 'Drops or polished studs', 'Orsola, Cadenza M'],
              ['Short hair', 'Studs, huggies, drops or refined hoops', 'Cadenza M, Amadea, Orsola, Pave Hoops'],
              ['Braided updo', 'Studs, huggies or soft drops', 'Cadenza M, Amadea, Concetta Short'],
            ],
          },
        ],
      },
    ],
  },
  {
    heading: 'Mother of the Bride Jewellery by Wedding Style',
    content: [
      { type: 'paragraph', text: 'Wedding style should guide whether the jewellery feels classic, modern, romantic or formal.' },
      { type: 'paragraph', text: 'A classic wedding usually works best with studs or elegant drops. A modern wedding can support huggies or minimalist earrings. A romantic garden wedding can use butterfly earrings or short drops. A black-tie wedding may call for long drops or polished diamond studs.' },
      {
        type: 'table',
        headers: ['Wedding Style', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Classic wedding', 'Diamond studs or elegant drops', 'Cadenza M, Orsola'],
          ['Modern wedding', 'Huggies or minimalist earrings', 'Amadea, Laluce'],
          ['Romantic wedding', 'Butterfly earrings or soft drops', 'Farfalla, Concetta Short'],
          ['Garden wedding', 'Butterfly earrings, studs or huggies', 'Farfalla, Cadenza M, Amadea'],
          ['Beach wedding', 'Small studs, huggies or minimalist earrings', 'Cadenza S, Amadea, Laluce'],
          ['Black-tie wedding', 'Long drops or polished studs', 'Concetta Long, Cadenza M'],
          ['City wedding', 'Huggies, studs or refined hoops', 'Amadea, Cadenza M, Pave Hoops'],
          ['Minimal wedding', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Evening wedding', 'Drops, long drops or medium studs', 'Orsola, Concetta Long, Cadenza M'],
          ['Family-focused wedding', 'Classic studs or meaningful butterfly earrings', 'Cadenza M, Alidi Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Wedding party jewellery gifts', href: '/resources/jewellery-gift-guides/wedding-party-jewellery-gifts' },
    ],
  },
  {
    heading: 'Elegant Diamond Studs for Mother of the Bride',
    content: [
      { type: 'paragraph', text: 'Diamond studs are one of the safest and most timeless mother of the bride jewellery gifts. They work with almost every dress colour, neckline and wedding style.' },
      { type: 'paragraph', text: 'Cadenza M diamond stud earrings are the strongest classic option because they feel polished and wedding-ready while still being wearable after the wedding. Cadenza S is better when she prefers subtle jewellery or when the gift should feel smaller and softer.' },
      {
        type: 'table',
        headers: ['Stud Gift Need', 'Best Product Direction', 'Why It Works'],
        rows: [
          ['Safest mother of the bride gift', 'Cadenza M', 'Polished, timeless and elegant'],
          ['Subtle wedding gift', 'Cadenza S', 'Simple and wearable'],
          ['Mother of the groom gift', 'Cadenza M', 'Classic and suitable for many styles'],
          ['High-neck dress', 'Cadenza M or Cadenza S', 'Keeps the neckline clean'],
          ['Detailed dress', 'Cadenza S or Cadenza M', 'Avoids overdoing the look'],
          ['Wedding-day and after gift', 'Cadenza M', 'Strong rewear value'],
          ['If unsure', 'Cadenza M', 'Safest elevated direction'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond stud earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-stud-earrings-guide' },
    ],
  },
  {
    heading: 'Drop Earrings for Mother of the Bride Dresses',
    content: [
      { type: 'paragraph', text: 'Drop earrings are ideal when the mother of the bride outfit needs movement and a more occasion-ready finish.' },
      { type: 'paragraph', text: 'Orsola is the strongest all-round drop recommendation. It works with satin dresses, navy dresses, champagne outfits, green dresses, black dresses and formal wedding styling. Concetta Short is better for soft, delicate dresses. Concetta Long is best for black-tie weddings, evening weddings and formal mother-of-the-bride gowns.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-9.jpg',
        content: [
          {
            type: 'table',
            headers: ['Drop Earring Need', 'Best Direction', 'Product Direction'],
            rows: [
              ['Best all-round wedding drop', 'Drop earrings', 'Orsola'],
              ['Soft dress styling', 'Short drops', 'Concetta Short'],
              ['Formal mother of the bride gown', 'Long drops', 'Concetta Long'],
              ['Satin dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Navy dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Champagne dress', 'Short drops or drops', 'Concetta Short, Orsola'],
              ['Black dress', 'Drops, medium studs or hoops', 'Orsola, Cadenza M, Pave Hoops'],
              ['Drop ear stack', 'Drop + small stud', 'Orsola + Cadenza S'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond drop earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-drop-earrings-guide' },
    ],
  },
  {
    heading: 'Butterfly Earrings for Meaningful Wedding Gifts',
    content: [
      { type: 'paragraph', text: 'Butterfly earrings work beautifully when the gift should feel emotional, symbolic and personal.' },
      { type: 'paragraph', text: 'For the mother of the bride, butterfly earrings can represent growth, change, beauty, family and a new chapter. This makes Alidi Farfalla and Farfalla strong choices for a sentimental wedding morning gift or thank-you gift.' },
      {
        type: 'table',
        headers: ['Butterfly Gift Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Most meaningful mother of the bride gift', 'Butterfly earrings', 'Alidi Farfalla'],
          ['Soft symbolic gift', 'Butterfly earrings', 'Farfalla'],
          ['Wedding morning gift', 'Butterfly earrings or studs', 'Alidi Farfalla, Cadenza M'],
          ['Mother of the groom sentimental gift', 'Butterfly earrings', 'Farfalla'],
          ['Family new chapter gift', 'Butterfly earrings', 'Alidi Farfalla'],
          ['Soft dress styling', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
          ['Butterfly ear stack', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
          ['If she prefers classic jewellery', 'Studs instead', 'Cadenza M, Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'Huggies and Minimalist Earrings for Modern Mothers',
    content: [
      { type: 'paragraph', text: 'Huggies and minimalist earrings are ideal if the mother of the bride prefers clean, modern and comfortable jewellery.' },
      { type: 'paragraph', text: 'Amadea Huggie earrings are strong because they can be worn on the wedding day and after. Laluce minimalist diamond earrings are better when the look should stay quiet and understated. Cadenza S can pair with either for a simple stack.' },
      {
        type: 'table',
        headers: ['Modern Gift Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Modern mother of the bride gift', 'Huggies', 'Amadea'],
          ['Minimal wedding look', 'Minimalist earrings', 'Laluce'],
          ['Everyday rewear gift', 'Huggies or small studs', 'Amadea, Cadenza S'],
          ['Clean outfit styling', 'Minimalist earrings or studs', 'Laluce, Cadenza S'],
          ['Modern ear stack', 'Small stud + huggie', 'Cadenza S + Amadea'],
          ['If huggies feel too casual', 'Medium studs', 'Cadenza M'],
          ['If minimalist feels too quiet', 'Drops or medium studs', 'Orsola, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Minimalist jewellery styling guide', href: '/resources/earring-style-guides/minimalist-jewellery-styling-guide' },
    ],
  },
  {
    heading: 'Jewellery Gifts for Stepmum, Grandmother and Mother Figures',
    content: [
      { type: 'paragraph', text: 'Wedding jewellery gifts can also be chosen for stepmums, grandmothers, aunties or important mother figures. These gifts should usually stay elegant, wearable and not too trend-led.' },
      { type: 'paragraph', text: 'Classic studs are safest for almost every mother figure. Drop earrings are strong for someone who enjoys dressy outfits. Butterfly earrings are strong when the gift should carry emotion or appreciation.' },
      {
        type: 'table',
        headers: ['Recipient', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Stepmum', 'Studs, huggies or delicate drops', 'Cadenza M, Amadea, Concetta Short'],
          ['Grandmother', 'Classic studs or elegant drops', 'Cadenza M, Orsola'],
          ['Auntie / mother figure', 'Studs, butterfly earrings or drops', 'Cadenza M, Farfalla, Orsola'],
          ['Godmother', 'Classic studs or meaningful earrings', 'Cadenza M, Alidi Farfalla'],
          ['Mother figure thank-you gift', 'Butterfly earrings or polished studs', 'Alidi Farfalla, Cadenza M'],
          ['Modern mother figure', 'Huggies or minimalist earrings', 'Amadea, Laluce'],
          ['Formal family gift', 'Long drops or medium studs', 'Concetta Long, Cadenza M'],
          ['If unsure', 'Medium studs', 'Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for mum', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-mum' },
    ],
  },
  {
    heading: 'Mother of the Bride Jewellery by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Metal colour should match both her outfit and her usual jewellery. If the earrings are meant for the wedding day, choose a tone that suits her dress. If the gift is more personal and not necessarily for the wedding outfit, choose the metal colour she already wears most often.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-11.jpg',
        content: [
          {
            type: 'table',
            headers: ['Metal Colour', 'Gift Feeling', 'Best For'],
            rows: [
              ['Yellow gold', 'Warm, classic and elegant', 'Champagne, green, burgundy, black, cream and warm-toned dresses'],
              ['White or silver tone', 'Clean, bright and timeless', 'Navy, grey, silver, dusty blue, black and cool-toned dresses'],
              ['Rose gold', 'Soft, feminine and sentimental', 'Blush, champagne, pink, floral and pastel dresses'],
              ['Mixed metals', 'Personal and modern', 'Ear stack lovers and contemporary styling'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'For mother of the bride gifts, yellow gold is strong for warm wedding palettes, white or silver tone is strong for cool palettes, and rose gold is strong for soft sentimental styling.' },
      { type: 'see-also', text: 'Gold vs white vs rose gold lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Product Pathways by Mother of the Bride Gift Need',
    content: [
      { type: 'subheading', text: 'For the Safest Mother of the Bride Gift' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They are classic, polished and easy to wear with many wedding outfits.' },
      { type: 'subheading', text: 'For a Subtle Wedding Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs. They are delicate, simple and easy to rewear after the wedding.' },
      { type: 'subheading', text: 'For an Elegant Wedding-Day Gift' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings. They add movement and polish for ceremony, reception and formal family photos.' },
      { type: 'subheading', text: 'For a Formal Mother of the Bride Gift' },
      { type: 'paragraph', text: 'Choose Concetta Long earrings. They work best for black-tie weddings, evening gowns and formal mother-of-the-bride styling.' },
      { type: 'subheading', text: 'For a Soft Dress or Romantic Wedding' },
      { type: 'paragraph', text: 'Choose Concetta Short earrings or Farfalla butterfly earrings. They work beautifully with blush, champagne, pastel, floral and soft satin dresses.' },
      { type: 'subheading', text: 'For a Meaningful Wedding Gift for Mum' },
      { type: 'paragraph', text: 'Choose Alidi Farfalla butterfly earrings. They are strongest when the gift should feel personal, emotional and keepsake-led.' },
      { type: 'subheading', text: 'For a Modern Mother of the Bride Gift' },
      { type: 'paragraph', text: 'Choose Amadea Huggie earrings or Laluce minimalist diamond earrings. These work well if she prefers clean, modern and easy-to-repeat jewellery.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Mother of the Bride Gift Role', 'Why It Works'],
        rows: [
          ['Cadenza M diamond stud earrings', 'Best safe classic gift', 'Polished, timeless and wedding-ready'],
          ['Cadenza S lab-grown diamond studs', 'Best subtle gift', 'Simple, delicate and wearable after the wedding'],
          ['Orsola drop earrings', 'Best elegant wedding-day gift', 'Adds movement and polish'],
          ['Concetta Long earrings', 'Best formal gift', 'Refined for black-tie and evening weddings'],
          ['Concetta Short earrings', 'Best soft dress gift', 'Delicate and feminine for romantic outfits'],
          ['Alidi Farfalla butterfly earrings', 'Best meaningful gift for mum', 'Personal, symbolic and sentimental'],
          ['Farfalla butterfly earrings', 'Best soft symbolic gift', 'Strong for family meaning and new-chapter gifting'],
          ['Amadea Huggie earrings', 'Best modern everyday gift', 'Close-fitting, wearable and stack-friendly'],
          ['Laluce minimalist diamond earrings', 'Best understated gift', 'Clean and quiet for minimal style'],
          ['Pave Hoops', 'Best modern shape option', 'Works if she likes visible but refined jewellery'],
          ['Lusso bold statement earrings', 'Best bold option only if she loves standout jewellery', 'Use only for intentionally bold evening styling'],
        ],
      },
      { type: 'paragraph', text: 'Choose mother of the bride jewellery that feels elegant on the wedding day and wearable after it. Pick Cadenza M for classic sparkle, Orsola for graceful movement, Concetta Long for formal styling, Alidi Farfalla for meaning, Amadea for modern huggies and Laluce for understated elegance.' },
    ],
  },
  {
    heading: 'Common Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing earrings that are too trend-led for a formal family wedding look. Mother of the bride jewellery should usually feel elegant and timeless.' },
      { type: 'paragraph', text: 'Another mistake is choosing jewellery that only works with one outfit. A strong gift should still be wearable after the wedding day.' },
      { type: 'paragraph', text: 'A third mistake is ignoring the dress neckline. If the dress has heavy detail, high coverage or embellishment, studs or minimalist earrings may work better than drops.' },
      { type: 'paragraph', text: 'Another mistake is forgetting hairstyle. If her hair is down, very small earrings may disappear. If her hair is in a bun or chignon, drops can look beautiful.' },
      { type: 'paragraph', text: 'A fifth mistake is choosing the wrong metal colour. The earrings should either match her wedding outfit or the metal tone she normally wears.' },
      { type: 'paragraph', text: 'Finally, do not forget comfort. The mother of the bride or groom will wear the jewellery for many hours through photos, ceremony, dinner, speeches and dancing.' },
      { type: 'see-also', text: 'Gold-plated jewellery care guide', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },
  {
    heading: 'Final Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing mother of the bride jewellery, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Is the gift for the mother of the bride, mother of the groom, stepmum, grandmother or mother figure?',
          'Will she wear the earrings on the wedding day?',
          'What colour is her dress?',
          'What neckline does the dress have?',
          'What hairstyle will she wear?',
          'Is the wedding classic, modern, romantic, garden, city, beach or black-tie?',
          'Should the jewellery feel classic, meaningful, modern or formal?',
          'What metal colour does she normally wear?',
          'What metal colour suits the dress?',
          'Would diamond studs be safest?',
          'Would drop earrings suit the outfit better?',
          'Would butterfly earrings feel meaningful?',
          'Can she wear the earrings after the wedding?',
          'Are the earrings comfortable for long wear?',
          'Are the earrings easy to clean and store?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose Cadenza M for classic polish. Choose Orsola for elegant wedding-day movement, Alidi Farfalla for meaning, Concetta Long for formal outfits and Amadea or Laluce for modern everyday wear.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What jewellery is best for the mother of the bride?', answer: 'The best mother of the bride jewellery is elegant, comfortable and suited to her outfit. Diamond studs, drop earrings, butterfly earrings, huggies and minimalist earrings can all work depending on her dress and personal style.' },
  { question: 'Are earrings a good mother of the bride gift?', answer: 'Yes, earrings are a strong mother of the bride gift because they are easy to choose, can be worn on the wedding day and can still be used after the wedding.' },
  { question: 'What earrings should the mother of the bride wear?', answer: 'The mother of the bride can wear diamond studs for a classic look, drop earrings for elegance, huggies for modern styling or butterfly earrings for meaningful detail.' },
  { question: 'What earrings are safest for the mother of the bride?', answer: 'Medium diamond studs are the safest choice because they are polished, timeless and easy to wear with many dress styles.' },
  { question: 'What jewellery should I gift the mother of the groom?', answer: 'Classic diamond studs, elegant drop earrings, huggies or meaningful butterfly earrings can all work for the mother of the groom depending on her style.' },
  { question: 'Are butterfly earrings good for a mother of the bride gift?', answer: 'Yes, butterfly earrings can be meaningful because they can symbolise growth, beauty, transformation and new beginnings.' },
  { question: 'What earrings should the mother of the bride wear with a navy dress?', answer: 'A navy dress works well with medium diamond studs, drop earrings or huggies. Cadenza M, Orsola and Amadea are strong directions.' },
  { question: 'What earrings should the mother of the bride wear with a satin dress?', answer: 'A satin mother of the bride dress usually works best with drop earrings or medium diamond studs.' },
  { question: 'What metal colour is best for mother of the bride jewellery?', answer: 'Choose the metal colour that suits her dress and what she already wears. Yellow gold feels warm, white or silver tone feels clean, and rose gold feels soft and sentimental.' },
  { question: 'What IWantJewels earrings are best for mother of the bride gifts?', answer: 'Cadenza M, Cadenza S, Orsola, Concetta Long, Concetta Short, Alidi Farfalla, Farfalla, Amadea and Laluce are strong mother of the bride gift options depending on her outfit and style.' },
]

const cta: V2CTABlock = {
  heading: 'Mother of the bride jewellery should feel elegant on the wedding day and wearable after it. Choose diamond studs for classic polish, drop earrings for graceful movement, long drops for formal styling, butterfly earrings for meaning, huggies for modern comfort and minimalist earrings for understated elegance.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want a wedding gift with real diamond sparkle. Choose Cadenza M for safe classic sparkle, Orsola for elegant movement, Concetta Long for formal wedding outfits, Alidi Farfalla for sentimental gifting, Amadea for modern huggies and Laluce for clean understated style.',
  primaryLabel: 'Shop Mother of the Bride Jewellery Gifts',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Wedding Party Jewellery Gifts',
  secondaryHref: '/resources/jewellery-gift-guides/wedding-party-jewellery-gifts',
  tertiaryLabel: 'Read the Wedding Party Jewellery Gifts Guide',
  tertiaryHref: '/resources/jewellery-gift-guides/wedding-party-jewellery-gifts',
}

export default function Page() {
  const category = getCategoryBySlug('occasion-jewellery-guides')
  const article = getArticleBySlug('occasion-jewellery-guides', 'mother-of-the-bride-jewellery-gifts')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('occasion-jewellery-guides', 'mother-of-the-bride-jewellery-gifts', 3)
  return (
    <ResourceArticleV2Page
      category={category}
      article={article}
      relatedArticles={relatedArticles}
      heroIntro={heroIntro}
      quickSummary={quickSummary}
      content={articleContent}
      cta={cta}
      faq={faq}
    />
  )
}
