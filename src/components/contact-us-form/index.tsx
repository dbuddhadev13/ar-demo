'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const ContactSchema = z.object({
	name: z.string().min(1, 'Please enter name').min(2, 'Name is too short'),
	email: z.string().email('Please enter a valid email'),
	phone: z
		.string()
		.min(1, 'Please enter phone number')
		.startsWith('+', 'Please include country code')
		.min(6, 'Phone number is too short')
		.refine(
			(val) => /^\+?[0-9\s\-()]{6,20}$/.test(val),
			'Enter a valid phone number'
		),
	message: z
		.string()
		.min(1, 'Please enter message')
		.min(10, 'Message should have at least 10 characters'),
});

type ContactFormValues = z.infer<typeof ContactSchema>;

const ContactForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ContactFormValues>({
		resolver: zodResolver(ContactSchema),
		mode: 'onBlur',
	});

	const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			if (!res.ok) {
				console.error('Email failed');
				return;
			}

			console.log('Email sent');
			reset();
		} catch (err) {
			console.error('Error:', err);
		}
	};
	return (
		<div className="mx-auto mt-12 w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
			<h2 className="mb-2 text-xl font-semibold tracking-wide text-white">
				Contact Us
			</h2>

			<p className="mb-6 text-sm text-gray-300">
				Let`s talk about your project.
			</p>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
				<div>
					<label className="mb-1 block text-sm text-gray-300">Full Name</label>
					<input
						{...register('name')}
						className={`w-full rounded-lg border bg-black/20 p-3 text-white transition-all ${errors.name ? 'border-red-400' : 'border-white/10'} focus:border-cyan-300 focus:ring-1 focus:ring-cyan-400 focus:outline-none`}
						placeholder="Jane Doe"
					/>
					{errors.name && (
						<p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
					)}
				</div>

				<div>
					<label className="mb-1 block text-sm text-gray-300">Email</label>
					<input
						{...register('email')}
						className={`w-full rounded-lg border bg-black/20 p-3 text-white ${errors.email ? 'border-red-400' : 'border-white/10'} focus:border-cyan-300 focus:ring-1 focus:ring-cyan-400 focus:outline-none`}
						placeholder="you@company.com"
					/>
					{errors.email && (
						<p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
					)}
				</div>

				<div>
					<label className="mb-1 block text-sm text-gray-300">Phone</label>
					<input
						{...register('phone')}
						className={`w-full rounded-lg border bg-black/20 p-3 text-white ${errors.phone ? 'border-red-400' : 'border-white/10'} focus:border-cyan-300 focus:ring-1 focus:ring-cyan-400 focus:outline-none`}
						placeholder="+49 123 456 789"
					/>
					{errors.phone && (
						<p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
					)}
				</div>

				<div>
					<label className="mb-1 block text-sm text-gray-300">Message</label>
					<textarea
						{...register('message')}
						className={`min-h-[120px] w-full rounded-lg border bg-black/20 p-3 text-white ${errors.message ? 'border-red-400' : 'border-white/10'} focus:border-cyan-300 focus:ring-1 focus:ring-cyan-400 focus:outline-none`}
						placeholder="Write your message..."
					/>
					{errors.message && (
						<p className="mt-1 text-sm text-red-400">
							{errors.message.message}
						</p>
					)}
				</div>

				<button
					type="submit"
					className="mt-3 w-full transform rounded-xl bg-linear-to-br from-cyan-400 to-blue-600 py-3 font-medium text-white shadow-[0_8px_25px_rgba(0,150,255,0.45)] transition-all hover:-translate-y-px hover:shadow-[0_10px_35px_rgba(0,150,255,0.6)]"
				>
					Send Message
				</button>
			</form>
		</div>
	);
};

export default ContactForm;
