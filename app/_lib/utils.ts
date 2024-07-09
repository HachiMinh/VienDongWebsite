export const COMPANY_NAME = "Viễn&nbsp;Đông";

/**
 * Split number digits by commas. For example, 1234567.89 returns "1,234,567.89"
 * 
 * @param number The number to split
 * @returns A string representation of the number with commas inserted
 */
export function splitDigits(number: number): string {
  const parts = number.toString().split(".");
  const integerPart = parts[0] || "0";

  // Reverse the integer part for easier comma insertion
  const reversedInteger = integerPart.split("").reverse().join("");
  let formattedInteger = "";
  for (let i = 0; i < reversedInteger.length; i++) {
    if (i > 0 && i % 3 === 0) {
      formattedInteger += ",";
    }
    formattedInteger += reversedInteger[i];
  }

  // Reverse the formatted integer back to normal order
  let result = formattedInteger.split("").reverse().join("");

  const decimalPart = parts[1];
  if (decimalPart !== undefined) {
    result += `.${decimalPart}`;
  }

  return result;
}
