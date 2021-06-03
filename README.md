| 해당 저장소는 42서울 본과정생들의 클러스터 체크인, 체크아웃을 위한 사이트의 클라이언트 프로젝트입니다.

### 로컬환경에서의 실행
1. `yarn && yarn start`
### 배포
1. `yarn build`
2. 배포할 ec2에 파일 업로드
    - `scp -r {로컬에서 빌드디렉토리} {접근시사용할 아이디}@{서버ip}:{전달할 서버의 디렉토리}`
3. nginx를 사용중이므로 `/etc/nginx` 내부의 .conf를 수정해줍니다.

### 참고
- [서버 프로젝트](https://github.com/padawanR0k/42s_checkin_server)