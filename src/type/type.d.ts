interface User {
  isLogin: boolean;
  id: string;
  cardNum: string;
  status: "in" | "out";
}
interface Config {
  beginAt: string;
  endAt: string;
  seocho: number;
  gaepo: number;
}
interface Status {
  seocho: number;
  gaepo: number;
}
