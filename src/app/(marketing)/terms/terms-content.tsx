'use client'

import { AlertTriangle, FileText, Github, Shield } from 'lucide-react'
import { Section, SubSection, TimelineItem } from '@/components/ui/section'
import { LegalHeader } from '../legal/legal-header'
import { LegalLanguage } from '../legal/legal-language'
import { LegalLanguageTransition } from '../legal/legal-language-transition'
import { useLegalLanguage } from '../legal/use-legal-language'
import { profile } from '@/core/config/profile'

interface ActionItem {
	title: string
	body: string
}

interface BulletItem {
	label: string
}

interface SectionCopy {
	heading: string
	summary: string[]
}

interface TermsCopy {
	title: string
	overviewTitle: string
	canDoTitle: string
	avoidTitle: string
	contentTitle: string
	fairUseTitle: string
	authTitle: string
	privacyTitle: string
	disclaimerTitle: string
	accuracyTitle: string
	adviceTitle: string
	availabilityTitle: string
	liabilityTitle: string
	changesTitle: string
	contactTitle: string
	updatedLabel: string
	overview: string[]
	personality: string
	license: string
	canDo: ActionItem[]
	cannotDo: ActionItem[]
	myContent: SectionCopy
	userContent: SectionCopy
	fairUse: string
	authIntro: string
	authBullets: BulletItem[]
	authNote: string
	privacyIntro: string
	privacyBullets: BulletItem[]
	privacyNote: string
	accuracy: string
	advice: string
	availability: string
	availabilityBullets: BulletItem[]
	availabilityNote: string
	liabilityIntro: string
	liabilityBullets: BulletItem[]
	liabilityNote: string
	changes: string[]
	contact: string
}

const lastUpdatedByLanguage: Record<LegalLanguage, string> = {
	en: 'April 7, 2026',
	hi: '7 अप्रैल 2026'
}

const termsCopy: Record<LegalLanguage, TermsCopy> = {
	en: {
		title: 'Terms of Service',
		overviewTitle: 'Overview',
		canDoTitle: 'What You Can Do',
		avoidTitle: 'What You Should Avoid',
		contentTitle: 'Content and Intellectual Property',
		fairUseTitle: 'Fair Use',
		authTitle: 'Accounts',
		privacyTitle: 'Privacy and Data',
		disclaimerTitle: 'Disclaimers',
		accuracyTitle: 'Content Accuracy',
		adviceTitle: 'No Professional Advice',
		availabilityTitle: 'Service Availability',
		liabilityTitle: 'Limitation of Liability',
		changesTitle: 'Changes to Terms',
		contactTitle: 'Contact',
		updatedLabel: 'Last updated',
		overview: [
			'Welcome to this site. These Terms of Service govern your use of my personal website and blog. By accessing or using this site, you agree to these terms.',
			'This is a personal portfolio and blog. I am not a company, just a developer sharing work and thoughts.'
		],
		personality: 'Friendly, direct, and transparent',
		license:
			'Unless a page states otherwise, the content and code samples published here are MIT licensed. You can copy, reuse, or remix them as long as you keep the license and attribution intact.',
		canDo: [
			{
				title: 'Read and share content',
				body: 'Feel free to read, share, and discuss posts. Linking is appreciated.'
			},
			{
				title: 'Reuse code',
				body: 'Code snippets and examples are MIT licensed unless a specific file says otherwise.'
			},
			{
				title: 'Interact',
				body: 'Browse the portfolio, blog posts, and public activity sections.'
			},
			{
				title: 'Contact',
				body: 'Reach out with questions, collaboration opportunities, or feedback.'
			}
		],
		cannotDo: [
			{
				title: 'Remove attribution',
				body: 'Do not strip the MIT license or misrepresent authorship of code or articles.'
			},
			{
				title: 'Abuse the platform',
				body: 'No spamming, harassment, or inappropriate behavior in comments or contact forms.'
			},
			{
				title: 'Automated scraping without care',
				body: 'Use scrapers responsibly. Hammering the site or bypassing protections is not allowed.'
			},
			{
				title: 'Security bypass',
				body: 'Do not attempt to circumvent security controls or reverse engineer private features.'
			}
		],
		myContent: {
			heading: 'My Content',
			summary: [
				'Blog posts, tutorials, and original content are my intellectual property. Unless noted, they are MIT licensed for you to reuse with attribution.',
				'When reusing, keep the license intact and credit this site.'
			]
		},
		userContent: {
			heading: 'User Content',
			summary: [
				'This site does not currently support public comments or reactions.',
				'You are responsible for what you post.'
			]
		},
		fairUse:
			'Limited quoting and sharing for educational, commentary, or criticism purposes is welcome under fair use principles, provided proper attribution is given.',
		authIntro:
			'This portfolio does not require an account. Public GitHub activity shown on the homepage comes from the public GitHub API.',
		authBullets: [
			{ label: 'No login is required to browse the site.' },
			{
				label: 'Contact submissions are stored so I can reply to you.'
			},
			{ label: 'Do not abuse the contact form or automated endpoints.' }
		],
		authNote:
			'If account features are added later, this section will be updated.',
		privacyIntro: 'Your privacy matters. My Privacy Policy explains:',
		privacyBullets: [
			{ label: 'What data I collect and why.' },
			{ label: 'How I use and protect your information.' },
			{ label: 'Your rights regarding your data.' }
		],
		privacyNote:
			'Using this site means you consent to the data collection practices described in the Privacy Policy.',
		accuracy:
			'I do my best to provide accurate information, but content may contain errors or become outdated. Technical tutorials might not work in all environments. Use at your own risk.',
		advice: 'This is a personal blog, not professional advice. Content reflects my personal opinions and experiences, not professional guidance.',
		availability:
			'This is a personal website, not a commercial service. I try to keep it running smoothly, but:',
		availabilityBullets: [
			{ label: 'No uptime guarantees or service level agreements.' },
			{ label: 'Temporary downtime for maintenance may occur.' },
			{ label: 'Features may change or be removed without notice.' }
		],
		availabilityNote:
			'This service is provided “as is” without warranties.',
		liabilityIntro: 'To the fullest extent permitted by law:',
		liabilityBullets: [
			{ label: 'I am not liable for damages arising from site use.' },
			{ label: 'I am not responsible for third-party content or links.' },
			{ label: 'I am not liable for code issues in tutorials.' }
		],
		liabilityNote:
			'This is a personal project. Use it responsibly and at your own risk.',
		changes: [
			'I may update these Terms occasionally. Changes are effective immediately upon posting. Continued use of the site means you accept the updated terms.',
			'Major changes will be announced in a blog post or site notice.'
		],
		contact:
			'You can reach out via mail. I will try to reply but cannot guarantee a response. Other channels are LinkedIn or GitHub.'
	},
	hi: {
		title: 'सेवा की शर्तें',
		overviewTitle: 'अवलोकन',
		canDoTitle: 'आप क्या कर सकते हैं',
		avoidTitle: 'आपको क्या नहीं करना चाहिए',
		contentTitle: 'सामग्री और बौद्धिक संपदा',
		fairUseTitle: 'उचित उपयोग',
		authTitle: 'खाते',
		privacyTitle: 'गोपनीयता और डेटा',
		disclaimerTitle: 'अस्वीकरण',
		accuracyTitle: 'सामग्री की सटीकता',
		adviceTitle: 'कोई पेशेवर सलाह नहीं',
		availabilityTitle: 'सेवा की उपलब्धता',
		liabilityTitle: 'दायित्व की सीमा',
		changesTitle: 'शर्तों में बदलाव',
		contactTitle: 'संपर्क',
		updatedLabel: 'अंतिम अपडेट',
		overview: [
			'इस साइट पर आपका स्वागत है। ये सेवा की शर्तें मेरी व्यक्तिगत वेबसाइट और ब्लॉग के उपयोग पर लागू होती हैं। साइट का उपयोग करके आप इन शर्तों से सहमत होते हैं।',
			'यह एक व्यक्तिगत पोर्टफोलियो और ब्लॉग है। मैं कोई कंपनी नहीं हूँ, केवल एक डेवलपर जो अपना काम और विचार साझा करता है।'
		],
		personality: 'मित्रवत, सीधा और पारदर्शी',
		license:
			'जब तक किसी पृष्ठ पर अन्यथा न लिखा हो, यहाँ प्रकाशित सामग्री और कोड नमूने MIT लाइसेंस के अधीन हैं। आप उन्हें कॉपी, पुन: उपयोग या रीमिक्स कर सकते हैं जब तक लाइसेंस और श्रेय बनाए रखें।',
		canDo: [
			{
				title: 'पढ़ें और साझा करें',
				body: 'पोस्ट पढ़ें, साझा करें और चर्चा करें। लिंक देना सराहनीय है।'
			},
			{
				title: 'कोड का पुन: उपयोग',
				body: 'कोड स्निपेट और उदाहरण MIT लाइसेंस के अधीन हैं जब तक किसी फ़ाइल में अन्यथा न कहा गया हो।'
			},
			{
				title: 'इंटरैक्ट करें',
				body: 'पोर्टफोलियो, ब्लॉग पोस्ट और सार्वजनिक गतिविधि अनुभाग देखें।'
			},
			{
				title: 'संपर्क करें',
				body: 'प्रश्न, सहयोग या फीडबैक के लिए संपर्क करें।'
			}
		],
		cannotDo: [
			{
				title: 'श्रेय हटाना',
				body: 'MIT लाइसेंस न हटाएँ और कोड या लेखों के लेखन को गलत तरीके से प्रस्तुत न करें।'
			},
			{
				title: 'प्लेटफ़ॉर्म का दुरुपयोग',
				body: 'टिप्पणियों या संपर्क फ़ॉर्म में स्पैम, उत्पीड़न या अनुचित व्यवहार न करें।'
			},
			{
				title: 'लापरवाह स्क्रैपिंग',
				body: 'स्क्रैपर्स का ज़िम्मेदारी से उपयोग करें। साइट पर दबाव डालना या सुरक्षा बाईपास करना अनुमति नहीं है।'
			},
			{
				title: 'सुरक्षा बाईपास',
				body: 'सुरक्षा नियंत्रणों को दरकिनार करने या निजी सुविधाओं को रिवर्स-इंजीनियर करने का प्रयास न करें।'
			}
		],
		myContent: {
			heading: 'मेरी सामग्री',
			summary: [
				'ब्लॉग पोस्ट, ट्यूटोरियल और मूल सामग्री मेरी बौद्धिक संपदा हैं। जब तक अन्यथा न कहा गया हो, वे श्रेय के साथ पुन: उपयोग के लिए MIT लाइसेंस के अधीन हैं।',
				'पुन: उपयोग करते समय लाइसेंस बनाए रखें और इस साइट को श्रेय दें।'
			]
		},
		userContent: {
			heading: 'उपयोगकर्ता सामग्री',
			summary: [
				'यह साइट वर्तमान में सार्वजनिक टिप्पणियों या प्रतिक्रियाओं का समर्थन नहीं करती।',
				'आप जो पोस्ट करते हैं उसके लिए आप ज़िम्मेदार हैं।'
			]
		},
		fairUse:
			'शैक्षिक, टिप्पणी या आलोचना के उद्देश्यों के लिए सीमित उद्धरण और साझा करना उचित उपयोग सिद्धांतों के तहत स्वागत योग्य है, बशर्ते उचित श्रेय दिया जाए।',
		authIntro:
			'इस पोर्टफोलियो के लिए खाते की आवश्यकता नहीं है। होमपेज पर दिखने वाली सार्वजनिक GitHub गतिविधि सार्वजनिक GitHub API से आती है।',
		authBullets: [
			{ label: 'साइट देखने के लिए लॉगिन आवश्यक नहीं है।' },
			{
				label: 'संपर्क सबमिशन संग्रहीत किए जाते हैं ताकि मैं जवाब दे सकूँ।'
			},
			{
				label: 'संपर्क फ़ॉर्म या स्वचालित एंडपॉइंट्स का दुरुपयोग न करें।'
			}
		],
		authNote:
			'यदि बाद में खाता सुविधाएँ जोड़ी जाती हैं, तो यह अनुभाग अपडेट किया जाएगा।',
		privacyIntro: 'आपकी गोपनीयता महत्वपूर्ण है। मेरी गोपनीयता नीति बताती है:',
		privacyBullets: [
			{ label: 'मैं कौन-सा डेटा एकत्र करता हूँ और क्यों।' },
			{ label: 'मैं आपकी जानकारी का उपयोग और सुरक्षा कैसे करता हूँ।' },
			{ label: 'आपके डेटा से जुड़े आपके अधिकार।' }
		],
		privacyNote:
			'इस साइट का उपयोग करने का अर्थ है कि आप गोपनीयता नीति में वर्णित डेटा एकत्र करने की प्रथाओं से सहमत हैं।',
		accuracy:
			'मैं सटीक जानकारी देने की पूरी कोशिश करता हूँ, लेकिन सामग्री में त्रुटियाँ हो सकती हैं या वह पुरानी हो सकती है। तकनीकी ट्यूटोरियल हर वातावरण में काम नहीं कर सकते। उपयोग अपने जोखिम पर करें।',
		advice:
			'यह एक व्यक्तिगत ब्लॉग है, पेशेवर सलाह नहीं। सामग्री मेरे व्यक्तिगत विचारों और अनुभवों को दर्शाती है, पेशेवर मार्गदर्शन नहीं।',
		availability:
			'यह एक व्यक्तिगत वेबसाइट है, व्यावसायिक सेवा नहीं। मैं इसे सुचारू रखने की कोशिश करता हूँ, लेकिन:',
		availabilityBullets: [
			{ label: 'कोई अपटाइम गारंटी या सेवा स्तर समझौते नहीं।' },
			{ label: 'रखरखाव के लिए अस्थायी डाउनटाइम हो सकता है।' },
			{
				label: 'सुविधाएँ बिना सूचना के बदल या हटाई जा सकती हैं।'
			}
		],
		availabilityNote:
			'यह सेवा “जैसी है” बिना वारंटी के प्रदान की जाती है।',
		liabilityIntro: 'कानून द्वारा अनुमत अधिकतम सीमा तक:',
		liabilityBullets: [
			{ label: 'साइट के उपयोग से उत्पन्न क्षति के लिए मैं उत्तरदायी नहीं हूँ।' },
			{
				label: 'थर्ड-पार्टी सामग्री या लिंक के लिए मैं ज़िम्मेदार नहीं हूँ।'
			},
			{ label: 'ट्यूटोरियल में कोड समस्याओं के लिए मैं उत्तरदायी नहीं हूँ।' }
		],
		liabilityNote:
			'यह एक व्यक्तिगत प्रोजेक्ट है। इसका ज़िम्मेदारी से और अपने जोखिम पर उपयोग करें।',
		changes: [
			'मैं इन शर्तों को कभी-कभी अपडेट कर सकता हूँ। बदलाव पोस्ट होते ही प्रभावी हो जाते हैं। साइट का निरंतर उपयोग अद्यतन शर्तों की स्वीकृति माना जाता है।',
			'बड़े बदलावों की घोषणा ब्लॉग पोस्ट या साइट नोटिस में की जाएगी।'
		],
		contact:
			'आप मेल के माध्यम से संपर्क कर सकते हैं। मैं जवाब देने की कोशिश करूँगा लेकिन प्रतिक्रिया की गारंटी नहीं दे सकता। अन्य चैनल LinkedIn या GitHub हैं।'
	}
}

export default function TermsContent() {
	const { language, setLanguage } = useLegalLanguage()
	const lastUpdated = lastUpdatedByLanguage[language]
	const copy = termsCopy[language]

	return (
		<div className="space-y-6">
			<LegalHeader language={language} onLanguageChange={setLanguage} />

			<LegalLanguageTransition language={language}>
				<div className="space-y-6">
			<header className="px-4 pt-2 md:px-5">
				<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
					{copy.personality}
				</p>
				<h1 className="mb-2 text-2xl font-semibold tracking-tight text-foreground">
					{copy.title}
				</h1>
				<p className="text-sm text-muted-foreground">
					{copy.updatedLabel}: {lastUpdated}
				</p>
			</header>

			<div className="space-y-4">
				<Section title={copy.overviewTitle}>
					<div className="space-y-4 px-4 text-sm leading-relaxed text-muted-foreground md:px-5">
						{copy.overview.map(function (paragraph) {
							return <p key={paragraph}>{paragraph}</p>
						})}
						<p className="rounded-none border border-border/50 bg-muted/30 p-3 text-xs text-foreground">
							{copy.license}
						</p>
					</div>
				</Section>

				<Section title={copy.canDoTitle}>
					<div className="space-y-3 px-4 md:px-5">
						{copy.canDo.map(function (item) {
							return (
								<TimelineItem
									key={item.title}
									title={item.title}
									icon={FileText}
									indicator="✓"
								>
									{item.body}
								</TimelineItem>
							)
						})}
					</div>
				</Section>

				<Section title={copy.avoidTitle}>
					<div className="space-y-3 px-4 md:px-5">
						{copy.cannotDo.map(function (item, index) {
							return (
								<TimelineItem
									key={`${item.title}-${index}`}
									title={item.title}
									icon={
										index === 0
											? Github
											: index === 1
												? AlertTriangle
												: Shield
									}
									indicator="✗"
								>
									{item.body}
								</TimelineItem>
							)
						})}
					</div>
				</Section>

				<Section title={copy.contentTitle}>
					<div className="space-y-4 px-4 md:px-5">
						<SubSection title={copy.myContent.heading}>
							<div className="space-y-2 text-sm text-muted-foreground">
								{copy.myContent.summary.map(
									function (paragraph) {
										return (
											<p key={paragraph}>{paragraph}</p>
										)
									}
								)}
							</div>
						</SubSection>

						<SubSection title={copy.userContent.heading}>
							<div className="space-y-2 text-sm text-muted-foreground">
								{copy.userContent.summary.map(
									function (paragraph) {
										return (
											<p key={paragraph}>{paragraph}</p>
										)
									}
								)}
							</div>
						</SubSection>

						<SubSection title={copy.fairUseTitle}>
							<div className="text-sm text-muted-foreground">
								<p>{copy.fairUse}</p>
							</div>
						</SubSection>
					</div>
				</Section>

				<Section title={copy.authTitle}>
					<div className="space-y-4 px-4 text-sm leading-relaxed text-muted-foreground md:px-5">
						<p>{copy.authIntro}</p>
						<ul className="list-inside list-disc space-y-1 text-xs">
							{copy.authBullets.map(function (item) {
								return <li key={item.label}>{item.label}</li>
							})}
						</ul>
						<p>{copy.authNote}</p>
					</div>
				</Section>

				<Section title={copy.privacyTitle}>
					<div className="space-y-4 px-4 text-sm leading-relaxed text-muted-foreground md:px-5">
						<p>{copy.privacyIntro}</p>
						<ul className="list-inside list-disc space-y-1 text-xs">
							{copy.privacyBullets.map(function (item) {
								return <li key={item.label}>{item.label}</li>
							})}
						</ul>
						<p>{copy.privacyNote}</p>
					</div>
				</Section>

				<Section title={copy.disclaimerTitle}>
					<div className="space-y-4 px-4 md:px-5">
						<SubSection
							title={copy.accuracyTitle}
							icon={AlertTriangle}
						>
							<div className="text-sm text-muted-foreground">
								<p>{copy.accuracy}</p>
							</div>
						</SubSection>

						<SubSection title={copy.adviceTitle} icon={Shield}>
							<div className="text-sm text-muted-foreground">
								<p>{copy.advice}</p>
							</div>
						</SubSection>
					</div>
				</Section>

				<Section title={copy.availabilityTitle}>
					<div className="space-y-4 px-4 text-sm leading-relaxed text-muted-foreground md:px-5">
						<p>{copy.availability}</p>
						<ul className="list-inside list-disc space-y-1 text-xs">
							{copy.availabilityBullets.map(function (item) {
								return <li key={item.label}>{item.label}</li>
							})}
						</ul>
						<p>{copy.availabilityNote}</p>
					</div>
				</Section>

				<Section title={copy.liabilityTitle}>
					<div className="space-y-4 px-4 text-sm leading-relaxed text-muted-foreground md:px-5">
						<p>{copy.liabilityIntro}</p>
						<ul className="list-inside list-disc space-y-1 text-xs">
							{copy.liabilityBullets.map(function (item) {
								return <li key={item.label}>{item.label}</li>
							})}
						</ul>
						<p className="text-xs">{copy.liabilityNote}</p>
					</div>
				</Section>

				<Section title={copy.changesTitle}>
					<div className="space-y-4 px-4 text-sm leading-relaxed text-muted-foreground md:px-5">
						{copy.changes.map(function (paragraph) {
							return <p key={paragraph}>{paragraph}</p>
						})}
					</div>
				</Section>

				<Section title={copy.contactTitle}>
					<div className="space-y-4 px-4 text-sm leading-relaxed text-muted-foreground md:px-5">
						<p>{copy.contact}</p>
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
