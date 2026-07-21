'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Mail, User } from 'lucide-react'
import { toast } from 'sonner'
import { submitContactForm } from '@/server/actions/contact/submission'
import { EmailAutocomplete } from './email-autocomplete'
import { SendButton, type TSendStatus } from './send-button'
import { cn } from '@/shared/lib/cn'

const FORM_FIELDS = ['name', 'email', 'subject', 'message'] as const

function FieldError({ id, message }: { id: string; message?: string }) {
	return (
		<p
			id={id}
			role={message ? 'alert' : undefined}
			aria-hidden={!message}
			className={cn(
				'h-4 text-xs leading-4 text-destructive transition-opacity duration-150',
				message ? 'opacity-100' : 'opacity-0'
			)}
		>
			{message ?? ''}
		</p>
	)
}

export function ContactPopover() {
	const [isOpen, setIsOpen] = useState(false)
	const [status, setStatus] = useState<TSendStatus>('idle')
	const containerRef = useRef<HTMLDivElement>(null)
	const popoverRef = useRef<HTMLDivElement>(null)
	const triggerRef = useRef<HTMLButtonElement>(null)
	const nameRef = useRef<HTMLInputElement>(null)
	const emailRef = useRef<HTMLInputElement>(null)
	const subjectRef = useRef<HTMLInputElement>(null)
	const messageRef = useRef<HTMLTextAreaElement>(null)

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [subject, setSubject] = useState('')
	const [message, setMessage] = useState('')
	const [errors, setErrors] = useState<Record<string, string[]>>({})

	const resetForm = () => {
		setName('')
		setEmail('')
		setSubject('')
		setMessage('')
		setErrors({})
		setStatus('idle')
	}

	const closePopover = () => setIsOpen(false)

	const toggleOpen = () => {
		if (isOpen) {
			closePopover()
			return
		}
		resetForm()
		setIsOpen(true)
	}

	const focusFirstErrorField = (nextErrors: Record<string, string[]>) => {
		const firstInvalidField = FORM_FIELDS.find(
			field => nextErrors[field]?.length
		)

		if (firstInvalidField === 'name') {
			nameRef.current?.focus()
		} else if (firstInvalidField === 'email') {
			emailRef.current?.focus()
		} else if (firstInvalidField === 'subject') {
			subjectRef.current?.focus()
		} else if (firstInvalidField === 'message') {
			messageRef.current?.focus()
		}
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				closePopover()
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	const prevIsOpenRef = useRef(isOpen)
	useEffect(() => {
		if (isOpen) {
			const timer = setTimeout(() => {
				const firstInput = popoverRef.current?.querySelector('input')
				if (firstInput) {
					;(firstInput as HTMLElement).focus()
				} else {
					popoverRef.current?.focus()
				}
			}, 100)

			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.key === 'Escape') {
					closePopover()
				}

				if (e.key === 'Tab') {
					if (!popoverRef.current) return

					const focusableElements =
						popoverRef.current.querySelectorAll(
							'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
						)
					const firstElement = focusableElements[0] as HTMLElement
					const lastElement = focusableElements[
						focusableElements.length - 1
					] as HTMLElement

					if (e.shiftKey) {
						if (document.activeElement === firstElement) {
							lastElement.focus()
							e.preventDefault()
						}
					} else {
						if (document.activeElement === lastElement) {
							firstElement.focus()
							e.preventDefault()
						}
					}
				}
			}

			document.addEventListener('keydown', handleKeyDown)

			return () => {
				clearTimeout(timer)
				document.removeEventListener('keydown', handleKeyDown)
			}
		} else if (prevIsOpenRef.current === true && isOpen === false) {
			if (triggerRef.current) {
				triggerRef.current.focus()
			}
		}

		prevIsOpenRef.current = isOpen
	}, [isOpen])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setStatus('sending')
		setErrors({})

		const formData = new FormData(e.currentTarget)

		try {
			const result = await submitContactForm(formData)

			if (result.success) {
				setStatus('success')
				toast.success(result.message)
				setName('')
				setEmail('')
				setSubject('')
				setMessage('')
				setTimeout(() => {
					closePopover()
					setStatus('idle')
				}, 1200)
				return
			}

			setStatus('idle')

			const fieldErrors = result.errors ?? {}
			const hasVisibleError = FORM_FIELDS.some(
				field => fieldErrors[field]?.length
			)

			if (hasVisibleError) {
				setErrors(fieldErrors)
				focusFirstErrorField(fieldErrors)
			} else {
				toast.error(
					result.message ?? 'Something went wrong. Please try again.'
				)
			}
		} catch {
			setStatus('idle')
			toast.error('An unexpected error occurred.')
		}
	}

	return (
		<div className="relative inline-block text-left" ref={containerRef}>
			<button
				ref={triggerRef}
				type="button"
				onClick={toggleOpen}
				aria-haspopup="dialog"
				aria-expanded={isOpen}
				aria-controls={isOpen ? 'contact-popover-content' : undefined}
				className={cn(
					'text-muted-foreground hover:text-foreground transition-colors text-sm font-medium',
					isOpen && 'text-foreground'
				)}
			>
				Contact
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						ref={popoverRef}
						id="contact-popover-content"
						role="dialog"
						aria-modal="true"
						aria-labelledby="contact-form-title"
						initial={{ opacity: 0, y: 10, scale: 0.95 }}
						animate={{ opacity: 1, y: -10, scale: 1 }}
						exit={{ opacity: 0, y: 10, scale: 0.95 }}
						transition={{ duration: 0.2 }}
						className="fixed sm:absolute bottom-auto sm:bottom-full left-4 right-4 sm:left-auto sm:right-0 top-1/2 sm:top-auto -translate-y-1/2 sm:translate-y-0 sm:mb-2 w-auto sm:w-[350px] md:w-[400px] z-50 origin-center sm:origin-bottom-right"
					>
						<div className="bg-popover text-popover-foreground rounded-xl border shadow-xl overflow-hidden p-6">
							<div className="flex justify-between items-center mb-4">
								<h3
									id="contact-form-title"
									className="font-semibold text-lg flex items-center gap-2"
								>
									<Mail className="w-5 h-5 text-primary" />
									Get in touch
								</h3>
								<button
									type="button"
									onClick={closePopover}
									aria-label="Close contact form"
									className="text-muted-foreground hover:text-foreground rounded-full p-1 hover:bg-accent transition-colors"
								>
									<X className="w-4 h-4" />
								</button>
							</div>

							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="space-y-2">
									<label
										htmlFor="name"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										Name
									</label>
									<div className="relative">
										<User className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
										<input
											id="name"
											name="name"
											ref={nameRef}
											value={name}
											onChange={e =>
												setName(e.target.value)
											}
											autoComplete="name"
											aria-invalid={Boolean(errors.name)}
											aria-describedby="contact-name-error"
											className={cn(
												'flex h-9 w-full rounded-md border-0 bg-transparent pl-9 pr-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
												errors.name &&
													'focus-visible:ring-destructive'
											)}
											placeholder="Your name"
										/>
									</div>
									<FieldError
										id="contact-name-error"
										message={errors.name?.[0]}
									/>
								</div>

								<div className="space-y-2">
									<label
										htmlFor="email"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										Email
									</label>
									<div className="relative">
										<Mail className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground z-10" />
										<EmailAutocomplete
											id="email"
											name="email"
											ref={emailRef}
											value={email}
											onValueChange={setEmail}
											autoComplete="email"
											aria-invalid={Boolean(errors.email)}
											aria-describedby="contact-email-error"
											className={cn(
												'pl-9',
												errors.email &&
													'focus-visible:ring-destructive'
											)}
											placeholder="name@example.com"
										/>
									</div>
									<FieldError
										id="contact-email-error"
										message={errors.email?.[0]}
									/>
								</div>

								<div className="space-y-2">
									<label
										htmlFor="subject"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										Subject{' '}
										<span className="text-muted-foreground font-normal ml-1">
											(Optional)
										</span>
									</label>
									<input
										id="subject"
										name="subject"
										ref={subjectRef}
										value={subject}
										onChange={e =>
											setSubject(e.target.value)
										}
										autoComplete="off"
										aria-invalid={Boolean(errors.subject)}
										aria-describedby="contact-subject-error"
										className="flex h-9 w-full rounded-md border-0 bg-transparent px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
										placeholder="Project inquiry"
									/>
									<FieldError
										id="contact-subject-error"
										message={errors.subject?.[0]}
									/>
								</div>

								<div className="space-y-2">
									<label
										htmlFor="message"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										Message
									</label>
									<div className="relative">
										<textarea
											id="message"
											name="message"
											ref={messageRef}
											value={message}
											onChange={e =>
												setMessage(e.target.value)
											}
											rows={4}
											autoComplete="off"
											aria-invalid={Boolean(
												errors.message
											)}
											aria-describedby="contact-message-error"
											className={cn(
												'flex w-full rounded-md border-0 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none',
												errors.message &&
													'focus-visible:ring-destructive'
											)}
											placeholder="How can I help you?"
										/>
									</div>
									<FieldError
										id="contact-message-error"
										message={errors.message?.[0]}
									/>
								</div>

								<input
									type="text"
									name="_gotcha"
									style={{ display: 'none' }}
									tabIndex={-1}
									autoComplete="off"
								/>

								<div className="flex justify-end pt-2">
									<SendButton status={status} />
								</div>
							</form>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
