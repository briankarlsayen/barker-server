const generatePass = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

function generateUUID() {
  let d = new Date().getTime();
  let d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = Math.random() * 16;
    if (d > 0) {
      // Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      // Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

const generateZero = (length) => {
  let zeros = "";
  for (let i = 0; i < length; i++) {
    zeros += "0";
  }
  return zeros;
};

// * gen six digits number
function generateOTPCode() {
  const max = 999999; // * 6 digits num
  const randNum = Math.floor(Math.random() * max).toString();
  const countlen = 6 - randNum.length;
  const addZeros = generateZero(countlen).toString();
  return `${addZeros}${randNum}`;
}

module.exports = { generatePass, generateUUID, generateZero, generateOTPCode };
