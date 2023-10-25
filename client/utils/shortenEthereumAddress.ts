export function shortenEthereumAddress(address: string, length = 4) {
  if (address.length <= 2 + 2 * length) {
    return address; // Address is already shorter or of equal length
  } else {
    const prefix = address.slice(0, 2 + length);
    const suffix = address.slice(-length);
    return `${prefix}...${suffix}`;
  }
}
