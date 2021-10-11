export const DEFAULT_PROFILE = 'https://cdn.intra.42.fr/users/medium_default.png';

export const getCookieValue = key => {
  let cookieKey = key + '=';
  let result = '';
  const cookieArr = document.cookie.split(';');

  for (let i = 0; i < cookieArr.length; i++) {
    if (cookieArr[i][0] === ' ') cookieArr[i] = cookieArr[i].substring(1);
    if (cookieArr[i].indexOf(cookieKey) === 0) {
      result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
      return result;
    }
  }
  return result;
};

// export const getTime = strDate => {
//   if (!strDate) return null;
//   return new Date(strDate).toLocaleTimeString();
// };

export const sec2hour = seconds => {
  let m = parseInt(seconds / 60);
  const h = parseInt(m / 60);
  const s = seconds % 60;
  m = m % 60;
  return h + ':' + `0${m}`.slice(-2) + ':' + `0${s}`.slice(-2);
};
