interface User {
  isLogin: boolean;
  id: string;
  cardNum: string;
  status: "in" | "out";
  profile: string;
}
interface Config {
  openAt: string;
  closeAt: string;
  seocho: number;
  gaepo: number;
}
interface Status {
  seocho: number;
  gaepo: number;
}
