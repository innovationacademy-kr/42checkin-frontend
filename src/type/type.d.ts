interface User {
  isLogin: boolean;
  id: string;
  cardNum: string;
  status: "in" | "out";
  profile: string;
  isAdmin: boolean;
}
interface Config {
  openAt: string | null;
  closeAt: string | null;
  gaepo: number;
  seocho: number;
  seochoLimitation: number;
  gaepoLimitation: number;
}
interface Status {
  seocho: number;
  gaepo: number;
}

interface Usage {
  login: string;
  date: string;
  seconds: string;
}
