import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
	try {
		const { name, email, phone, message } = await req.json();

		if (!name || !email || !phone || !message) {
			return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
		}

		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: true,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		await transporter.sendMail({
			from: process.env.FROM_EMAIL,
			to: process.env.TO_EMAIL,
			subject: `New Contact Form Message from ${name}`,
			html: `
				<h2>New Contact Form Submission</h2>
				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Phone:</strong> ${phone}</p>
				<p><strong>Message:</strong></p>
				<p>${message}</p>
			`,
		});
		console.log('Sent');

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Email Error:', error);
		return NextResponse.json(
			{ error: 'Email failed to send' },
			{ status: 500 }
		);
	}
}
