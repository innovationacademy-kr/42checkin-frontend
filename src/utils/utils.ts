export const DEFAULT_PROFILE = "https://cdn.intra.42.fr/users/medium_default.png";

export const getCookieValue = (key: string): string => {
  let cookieKey = key + "=";
  let result = "";
  const cookieArr = document.cookie.split(";");

  for (let i = 0; i < cookieArr.length; i++) {
    if (cookieArr[i][0] === " ") cookieArr[i] = cookieArr[i].substring(1);
    if (cookieArr[i].indexOf(cookieKey) === 0) {
      result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
      return result;
    }
  }
  return result;
};

// export const getTime = (strDate: string): string => {
//   return new Date(strDate).toLocaleTimeString()
// }

//TODO: seconds타입 
export const sec2hour = (seconds: any): any => {
  let m = (seconds / 60);
  const h = (m / 60);
  const s = seconds % 60;
  m = m % 60;
  return h + ":" + `0${m}`.slice(-2) + ":" + `0${s}`.slice(-2);
};
