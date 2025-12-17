/**
 * Email service for sending barcode scan results via Gmail.com.
 * Opens Gmail.com compose window with pre-filled data.
 * No API keys or external services required.
 */

import { log } from '../utils/log.js';

/**
 * Opens Gmail.com compose window with barcode scan results.
 * The user will need to click "Send" in Gmail to actually send the email.
 *
 * @param {Object} formData - The form data containing barcode codes and user info.
 * @param {string} formData.code1 - First barcode code.
 * @param {string} formData.code2 - Second barcode code.
 * @param {string} formData.code3 - Third barcode code.
 * @param {string} formData.phoneNumber - User's phone number.
 * @param {string} formData.email - User's email address (recipient).
 * @returns {Promise<void>} - A promise that resolves when Gmail is opened.
 * @throws {Error} - If validation fails.
 */
export async function sendBarcodeEmail(formData) {
  const { code1, code2, code3, phoneNumber, email } = formData;

  // Validate that at least one barcode code is provided
  if (!code1 && !code2 && !code3) {
    throw new Error('At least one barcode code must be provided');
  }

  // Validate recipient email
  if (!email || !email.trim()) {
    throw new Error('Recipient email address is required');
  }

  // Prepare email content
  const subject = encodeURIComponent('Barcode Scan Results');
  
  const bodyLines = [
    'Barcode Scan Results',
    '',
    'Code 1: ' + (code1 || 'Not scanned'),
    'Code 2: ' + (code2 || 'Not scanned'),
    'Code 3: ' + (code3 || 'Not scanned'),
    '',
    'Phone Number: ' + (phoneNumber || 'Not provided'),
    'Email: ' + email,
    '',
    'Scan Time: ' + new Date().toLocaleString()
  ];
  
  const body = encodeURIComponent(bodyLines.join('\n'));

  // Create Gmail compose URL
  // Gmail compose URL format: https://mail.google.com/mail/?view=cm&fs=1&to=EMAIL&su=SUBJECT&body=BODY
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${subject}&body=${body}`;

  log.info('Opening Gmail.com with barcode results:', { email, code1, code2, code3 });

  try {
    // Open Gmail.com in a new tab
    window.open(gmailUrl, '_blank');
    
    // Return a resolved promise to maintain compatibility with async/await
    return Promise.resolve();
  } catch (error) {
    log.error('Failed to open Gmail:', error);
    throw new Error('Failed to open Gmail.com. Please check your browser popup settings.');
  }
}

