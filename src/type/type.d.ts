interface User {
  isLogin: boolean;
  id: string;
  cardNum: string;
  status: "in" | "out";
  profile: string;
}
interface Config {
  openAt: string | null;
  closeAt: string | null;
  seocho: number;
  gaepo: number;
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

interface CheckBox {
  id: number;
  text: string;
  checked: boolean;
}
