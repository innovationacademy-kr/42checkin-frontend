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

// export const getTime = (strDate: string): string => {
//   return new Date(strDate).toLocaleTimeString()
// }

// TODO: seconds타입
export const sec2hour = (seconds: number): string => {
  let minute = seconds / 60;
  const second = seconds % 60;
  const hh = minute / 60;
  minute %= 60;
  const mm = `0${minute}`.slice(-2);
  const ss = `0${second}`.slice(-2);
  return `${hh}:${mm}:${ss}`;
};
