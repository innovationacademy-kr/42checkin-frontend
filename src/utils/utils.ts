export const DEFAULT_PROFILE = "https://cdn.intra.42.fr/users/medium_default.png";

export const getCookieValue = (key: string | undefined): string => {
  const cookieKey = `${key}=`;
  let result = "";
  const cookieArr = document.cookie.split(";");

  for (let i = 0; i < cookieArr.length; i += 1) {
    if (cookieArr[i][0] === " ") cookieArr[i] = cookieArr[i].substring(1);
    if (cookieArr[i].indexOf(cookieKey) === 0) {
      result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
      return result;
    }
  }
  return result;
};
