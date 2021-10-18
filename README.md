# 개요

- 해당 저장소는 사회적 거리두기가 시행됨에 따라, 42서울 본과정생들의 클러스터 입장인원수를 파악하기 위한 서비스의 클라이언트 프로젝트입니다. 서버 프로젝트는 해당 [저장소](https://bitbucket.org/42seoul/checkin_back/src/master)로 이동해주세요.
- 시설관리자를 위한 어드민 사이트의 클라이언트 프로젝트는 해당 [저장소](https://bitbucket.org/42seoul/admin_front/src/master/)에서 확인하실 수 있습니다.

# 프로젝트 구조

```
├── src
│    ├── api
│    ├── pages
│    ├── components
│    ├── redux
│    ├── utils
│    └── admin
```

## 환경별 .env 파일 설정

`.env.sample`을 참고하여 각 환경에 필요한 파일들을 작성합니다.

- `.env.development`: 로컬 테스트용 환경변수
- `.env.test`: 테스트 서버용 환경변수
- `.env.production`: 상용 서버용 환경변수

## 설치 및 실행 방법

1. 해당 저장소를 클론해주세요.

2. 의존성 패키지들을 설치합니다.

   ```shell
   yarn
   ```

3. 환경에 맞게 .env파일을 작성합니다.

4. 서버를 실행합니다.

   ```shell
   yarn start
   ```

## 스크립트

```
yarn start
```

- 서버를 실행합니다.

```
yarn build
```

- production 배포용 빌드를 진행합니다

```
yarn test_build
```

- test 배포용 빌드를 진행합니다

## 사용스택

- Javascript
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [MUI](https://mui.com/)

## Git Branch

브랜치는 다음과 같이 운영됩니다.

- master: 실제 서비스에 배포되어 운영되고 있는 코드입니다.
- develop: 아직 서비스에 배포되지는 않았지만, 다음 버전에 배포될 코드입니다. 테스트서버에 배포되어 있는 코드입니다.
- feature: 개발 브랜치에서 뻗어나와 개발해야될 기능을 담은 코드입니다.

### 참고
- https://github.com/padawanR0k/42s_checkin_server/wiki
- [서버 프로젝트](https://github.com/padawanR0k/42s_checkin_server)
- [원본 레포지토리](https://github.com/42CivicHacking/42_checkIn)