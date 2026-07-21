'use client'

import { Cookie, Database, Eye, Mail, Shield, Users } from 'lucide-react'
import { Section, SubSection, TimelineItem } from '@/components/ui/section'
import { LegalHeader } from '../legal/legal-header'
import { LegalLanguage } from '../legal/legal-language'
import { LegalLanguageTransition } from '../legal/legal-language-transition'
import { useLegalLanguage } from '../legal/use-legal-language'
import { profile } from '@/core/config/profile'

interface InfoSection {
	title: string
	details: string[]
	note?: string
}

interface CookieSection {
	title: string
	items: string[]
}

interface UsageItem {
	title: string
	detail: string
	indicator: string
}

interface PrivacyCopy {
	title: string
	updatedLabel: string
	introTitle: string
	intro: string[]
	infoTitle: string
	infoSections: InfoSection[]
	usageTitle: string
	usageItems: UsageItem[]
	storageTitle: string
	storageLead: string
	storageItems: string[]
	storageNote: string
	cookiesTitle: string
	cookies: CookieSection[]
	rightsTitle: string
	rightsIntro: string
	rightsItems: string[]
	partnersTitle: string
	partnersIntro: string
	partnersItems: string[]
	contactTitle: string
	contactIntro: string
	contactNote: string
}

const lastUpdatedByLanguage: Record<LegalLanguage, string> = {
	en: 'April 7, 2026',
	hi: '7 अप्रैल 2026'
}

const privacyCopy: Record<LegalLanguage, PrivacyCopy> = {
	en: {
		title: 'Privacy Policy',
		updatedLabel: 'Last updated',
		introTitle: 'Introduction',
		intro: [
			'This Privacy Policy explains how I collect, use, and protect your information when you visit this portfolio.',
			'I only collect what is needed to run the site and respond to messages. No advertising trackers, and no third-party analytics.'
		],
		infoTitle: 'Information I Collect',
		infoSections: [
			{
				title: 'Contact Form Data',
				details: [
					'When you use the contact form, I receive your name, email address, and message.',
					'This data is only used to respond to your inquiry.'
				]
			},
			{
				title: 'Technical Data',
				details: [
					'Basic technical information such as IP address, browser headers, and essential cookies may be processed by hosting providers for security and reliability.'
				]
			}
		],
		usageTitle: 'How I Use Your Data',
		usageItems: [
			{
				title: 'Communicate with you',
				detail: 'I only use your contact information to respond to your messages.',
				indicator: 'Contact'
			},
			{
				title: 'Security and maintenance',
				detail: 'Basic request data helps keep the site secure and running smoothly.',
				indicator: 'Safety'
			}
		],
		storageTitle: 'Data Storage and Security',
		storageLead: 'Your data may be stored on:',
		storageItems: [
			'Vercel: Website hosting.',
			'Neon: Database hosting for contact submissions and site data.'
		],
		storageNote:
			'I take reasonable security measures to protect your data, including encryption in transit and limited access to personal information.',
		cookiesTitle: 'Cookies and Tracking',
		cookies: [
			{
				title: 'Essential Cookies',
				items: [
					'Theme preference (light/dark mode).',
					'Other cookies strictly needed for site functionality.'
				]
			}
		],
		rightsTitle: 'Your Rights',
		rightsIntro:
			'Under applicable privacy laws, you may have the right to:',
		rightsItems: [
			'Access: Request a copy of your personal data.',
			'Correction: Request correction of inaccurate data.',
			'Deletion: Request deletion of your personal data.',
			'Portability: Request your data in a machine-readable format.'
		],
		partnersTitle: 'Third-Party Services',
		partnersIntro: 'This site uses the following third-party services:',
		partnersItems: [
			'GitHub: Public contribution and activity APIs shown on the homepage.',
			'Spotify / YouTube Music: Optional now-playing / recent music widgets.',
			'Vercel: Website hosting.',
			'Neon: Database hosting for contact and site data.'
		],
		contactTitle: 'Contact',
		contactIntro:
			'If you have questions about this Privacy Policy or how I handle your data:',
		contactNote:
			'You can reach out via the contact form, email, LinkedIn, or GitHub.'
	},
	hi: {
		title: 'गोपनीयता नीति',
		updatedLabel: 'अंतिम अपडेट',
		introTitle: 'परिचय',
		intro: [
			'यह गोपनीयता नीति बताती है कि जब आप इस पोर्टफोलियो पर आते हैं तो मैं आपकी जानकारी कैसे एकत्र, उपयोग और सुरक्षित रखता हूँ।',
			'मैं केवल वही एकत्र करता हूँ जो साइट चलाने और संदेशों का जवाब देने के लिए ज़रूरी है। कोई विज्ञापन ट्रैकर नहीं, और कोई थर्ड-पार्टी एनालिटिक्स नहीं।'
		],
		infoTitle: 'मैं कौन-सी जानकारी एकत्र करता हूँ',
		infoSections: [
			{
				title: 'संपर्क फ़ॉर्म डेटा',
				details: [
					'जब आप संपर्क फ़ॉर्म का उपयोग करते हैं, तो मुझे आपका नाम, ईमेल पता और संदेश मिलता है।',
					'इस डेटा का उपयोग केवल आपकी पूछताछ का जवाब देने के लिए किया जाता है।'
				]
			},
			{
				title: 'तकनीकी डेटा',
				details: [
					'सुरक्षा और विश्वसनीयता के लिए होस्टिंग प्रदाता IP पता, ब्राउज़र हेडर और आवश्यक कुकीज़ जैसी बुनियादी तकनीकी जानकारी प्रोसेस कर सकते हैं।'
				]
			}
		],
		usageTitle: 'मैं आपके डेटा का उपयोग कैसे करता हूँ',
		usageItems: [
			{
				title: 'आपसे संपर्क',
				detail:
					'मैं आपकी संपर्क जानकारी का उपयोग केवल आपके संदेशों का जवाब देने के लिए करता हूँ।',
				indicator: 'संपर्क'
			},
			{
				title: 'सुरक्षा और रखरखाव',
				detail:
					'बुनियादी अनुरोध डेटा साइट को सुरक्षित और सुचारू रखने में मदद करता है।',
				indicator: 'सुरक्षा'
			}
		],
		storageTitle: 'डेटा भंडारण और सुरक्षा',
		storageLead: 'आपका डेटा इनमें संग्रहीत हो सकता है:',
		storageItems: [
			'Vercel: वेबसाइट होस्टिंग।',
			'Neon: संपर्क सबमिशन और साइट डेटा के लिए डेटाबेस होस्टिंग।'
		],
		storageNote:
			'मैं आपके डेटा की सुरक्षा के लिए उचित उपाय करता हूँ, जिनमें ट्रांज़िट में एन्क्रिप्शन और व्यक्तिगत जानकारी तक सीमित पहुँच शामिल है।',
		cookiesTitle: 'कुकीज़ और ट्रैकिंग',
		cookies: [
			{
				title: 'आवश्यक कुकीज़',
				items: [
					'थीम प्राथमिकता (लाइट/डार्क मोड)।',
					'अन्य कुकीज़ जो साइट की कार्यक्षमता के लिए सख्त रूप से आवश्यक हैं।'
				]
			}
		],
		rightsTitle: 'आपके अधिकार',
		rightsIntro:
			'लागू गोपनीयता कानूनों के तहत, आपके पास ये अधिकार हो सकते हैं:',
		rightsItems: [
			'पहुँच: अपने व्यक्तिगत डेटा की एक प्रति का अनुरोध करें।',
			'सुधार: गलत डेटा को सुधारने का अनुरोध करें।',
			'हटाना: अपने व्यक्तिगत डेटा को हटाने का अनुरोध करें।',
			'पोर्टेबिलिटी: अपना डेटा मशीन-पठनीय प्रारूप में माँगें।'
		],
		partnersTitle: 'थर्ड-पार्टी सेवाएँ',
		partnersIntro: 'यह साइट निम्न थर्ड-पार्टी सेवाओं का उपयोग करती है:',
		partnersItems: [
			'GitHub: होमपेज पर दिखने वाले सार्वजनिक योगदान और गतिविधि API।',
			'Spotify / YouTube Music: वैकल्पिक नाउ-प्लेइंग / हाल की संगीत विजेट।',
			'Vercel: वेबसाइट होस्टिंग।',
			'Neon: संपर्क और साइट डेटा के लिए डेटाबेस होस्टिंग।'
		],
		contactTitle: 'संपर्क',
		contactIntro:
			'यदि इस गोपनीयता नीति या आपके डेटा के प्रबंधन के बारे में आपके कोई प्रश्न हैं:',
		contactNote:
			'आप संपर्क फ़ॉर्म, ईमेल, LinkedIn या GitHub के माध्यम से संपर्क कर सकते हैं।'
	}
}


export default function PrivacyContent() {
	const { language, setLanguage } = useLegalLanguage()
	const lastUpdated = lastUpdatedByLanguage[language]
	const copy = privacyCopy[language]

	return (
		<div className="space-y-6">
			<LegalHeader language={language} onLanguageChange={setLanguage} />

			<LegalLanguageTransition language={language}>
				<div className="space-y-6">
			<header className="px-4 pt-2 md:px-5">
				<h1 className="mb-2 text-2xl font-semibold tracking-tight text-foreground">
					{copy.title}
				</h1>
				<p className="text-sm text-muted-foreground">
					{copy.updatedLabel}: {lastUpdated}
				</p>
			</header>

			<div className="space-y-4">
				<Section title={copy.introTitle}>
					<div className="space-y-4 px-4 text-sm leading-relaxed text-muted-foreground md:px-5">
						{copy.intro.map(function (paragraph) {
							return <p key={paragraph}>{paragraph}</p>
						})}
					</div>
				</Section>

				<Section title={copy.infoTitle}>
					<div className="space-y-4 px-4 md:px-5">
						{copy.infoSections.map(function (info, index) {
							return (
								<SubSection
									key={info.title}
									title={info.title}
									icon={mapInfoIcon(index)}
								>
									<div className="space-y-2 text-sm text-muted-foreground">
										<ul className="list-inside list-disc space-y-1 text-xs">
											{info.details.map(
												function (detail) {
													return (
														<li key={detail}>
															{detail}
														</li>
													)
												}
											)}
										</ul>
										{info.note ? (
											<p className="text-xs text-foreground">
												{info.note}
											</p>
										) : null}
									</div>
								</SubSection>
							)
						})}
					</div>
				</Section>

				<Section title={copy.usageTitle}>
					<div className="space-y-3 px-4 md:px-5">
						{copy.usageItems.map(function (item, index) {
							return (
								<TimelineItem
									key={item.title}
									title={item.title}
									icon={mapUsageIcon(index)}
									indicator={item.indicator}
								>
									{item.detail}
								</TimelineItem>
							)
						})}
					</div>
				</Section>

				<Section title={copy.storageTitle}>
					<div className="space-y-4 px-4 text-sm leading-relaxed text-muted-foreground md:px-5">
						<p>{copy.storageLead}</p>
						<ul className="list-inside list-disc space-y-1 text-xs">
							{copy.storageItems.map(function (item) {
								return <li key={item}>{item}</li>
							})}
						</ul>
						<p>{copy.storageNote}</p>
					</div>
				</Section>

				<Section title={copy.cookiesTitle}>
					<div className="space-y-4 px-4 md:px-5">
						{copy.cookies.map(function (cookieSection) {
							return (
								<SubSection
									key={cookieSection.title}
									title={cookieSection.title}
									icon={Cookie}
								>
									<div className="text-sm text-muted-foreground">
										<ul className="list-inside list-disc space-y-1 text-xs">
											{cookieSection.items.map(
												function (item) {
													return (
														<li key={item}>
															{item}
														</li>
													)
												}
											)}
										</ul>
									</div>
								</SubSection>
							)
						})}
					</div>
				</Section>

				<Section title={copy.rightsTitle}>
					<div className="space-y-4 px-4 text-sm leading-relaxed text-muted-foreground md:px-5">
						<p>{copy.rightsIntro}</p>
						<ul className="list-inside list-disc space-y-1 text-xs">
							{copy.rightsItems.map(function (item) {
								return <li key={item}>{item}</li>
							})}
						</ul>
						<p className="font-mono text-xs">
							{profile.emailDisplay}
						</p>
					</div>
				</Section>

				<Section title={copy.partnersTitle}>
					<div className="space-y-4 px-4 text-sm leading-relaxed text-muted-foreground md:px-5">
						<p>{copy.partnersIntro}</p>
						<ul className="list-inside list-disc space-y-1 text-xs">
							{copy.partnersItems.map(function (item) {
								return <li key={item}>{item}</li>
							})}
						</ul>
					</div>
				</Section>

				<Section title={copy.contactTitle}>
					<div className="space-y-4 px-4 text-sm leading-relaxed text-muted-foreground md:px-5">
						<p>{copy.contactIntro}</p>
						<p>{copy.contactNote}</p>
						<p className="font-mono text-xs">
							{profile.emailDisplay}
						</p>
					</div>
				</Section>
			</div>
				</div>
			</LegalLanguageTransition>
		</div>
	)
}

function mapInfoIcon(index: number) {
	if (index === 0) return Mail
	if (index === 1) return Database
	return Eye
}

function mapUsageIcon(index: number) {
	if (index === 0) return Eye
	if (index === 1) return Users
	if (index === 2) return Mail
	return Shield
}
