import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Define the data directory and file path
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'waitlist.json');

    // Ensure data directory exists
    await fs.mkdir(dataDir, { recursive: true });

    // Read existing data or create new array
    let waitlist: { email: string; timestamp: string }[] = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      waitlist = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist yet, start with empty array
    }

    // Check if email already exists
    if (waitlist.some(entry => entry.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json(
        { message: 'You\'re already on the waitlist!' },
        { status: 200 }
      );
    }

    // Add new email to waitlist
    waitlist.push({
      email: email.toLowerCase(),
      timestamp: new Date().toISOString()
    });

    // Save updated waitlist
    await fs.writeFile(filePath, JSON.stringify(waitlist, null, 2));

    console.log(`✅ Added to waitlist: ${email}`);

    return NextResponse.json(
      { message: 'Successfully joined the waitlist!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}