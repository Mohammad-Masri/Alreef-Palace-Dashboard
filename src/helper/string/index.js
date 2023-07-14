export const checkIfThisStringFoundInAnotherString = (full_string, sub_string) => {
  full_string = String(full_string).toLowerCase();
  sub_string = String(sub_string).toLowerCase();

  if (full_string.includes(sub_string)) {
    return true;
  }
  return false;
};
