// Utils
export function ip2int(ip: string): number {
  const parts = ip.split('.');

  return parts.reduce<number>((res, part) => {
    return (res << 8) + parseInt(part);
  }, 0);
}