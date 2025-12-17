/**
 * Fills the code input fields sequentially with scanned barcode values.
 * Fills code1, then code2, then code3, then cycles back to code1.
 *
 * @param {string} barcodeValue - The scanned barcode value to fill in the next available field.
 * @returns {void}
 */
export function fillCodeFields(barcodeValue) {
  if (!barcodeValue) {
    return;
  }

  const code1El = document.getElementById('code1');
  const code2El = document.getElementById('code2');
  const code3El = document.getElementById('code3');

  if (!code1El || !code2El || !code3El) {
    return;
  }

  // Determine which field to fill next
  // Priority: code1 (if empty) -> code2 (if empty) -> code3 (if empty) -> code1 (cycle back)
  if (!code1El.value || code1El.value.trim() === '') {
    code1El.value = barcodeValue;
    code1El.dispatchEvent(new Event('input', { bubbles: true }));
    return;
  }

  if (!code2El.value || code2El.value.trim() === '') {
    code2El.value = barcodeValue;
    code2El.dispatchEvent(new Event('input', { bubbles: true }));
    return;
  }

  if (!code3El.value || code3El.value.trim() === '') {
    code3El.value = barcodeValue;
    code3El.dispatchEvent(new Event('input', { bubbles: true }));
    return;
  }

  // All fields are filled, cycle back to code1
  code1El.value = barcodeValue;
  code1El.dispatchEvent(new Event('input', { bubbles: true }));
}
