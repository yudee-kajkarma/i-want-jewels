import type { Metadata } from 'next'
import PrivacyPolicyPage from '@/views/PrivacyPolicyPage'

const URL = 'https://www.iwantjewels.com/privacy-policy'
const TITLE = 'Privacy Policy | I Want Jewels'
const DESCRIPTION =
  'How I Want Jewels collects, uses, shares and protects your personal information, including Google and Facebook sign-in data, and how to request access or deletion.'

// The policy is in English only, so every language version points to the
// English page as its canonical.
export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: 'website' },
}

export default function Page() {
  return <PrivacyPolicyPage />
}
