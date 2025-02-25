export function getDate(val: any) {
  if (!val) {
    throw new Error("date is empty");
  }

  if (val?._seconds) {
    return new Date(val._seconds * 1000);
  }

  return new Date(val);
}

export function getDateOrNow(val: any) {
  if (!val) {
    return new Date();
  }

  return getDate(val);
}

export function getDateOrNull(val: any) {
  if (!val) {
    return null;
  }

  return getDate(val);
}
