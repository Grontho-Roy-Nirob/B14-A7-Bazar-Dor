export function bn(value: number) {
  return value.toLocaleString("bn-BD");
}

export function toNumber(value: number | string): number {
  if (typeof value === "number") return value;

  value = value.replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d).toString());
  value = value.replace(/[,\s٬]/g, "");

  const price = Number(value);

  if (isNaN(price)) {
    throw new Error("Invalid price");
  }

  return price;
}

export function unitName(unit: string) {
  const units: { [key: string]: string } = {
    kg: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    l: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
  };

  return units[unit] || unit;
}

export function banglaDate() {
  return new Date().toLocaleDateString("bn-BD", {
    timeZone: "Asia/Dhaka",
  });
}
