R3(React + Reflux + REST api) + W(Websocket) Boilerplate
=====================

React를 기반으로 한 MVC 및 Websocket을 활용한 Boilerplate입니다.

개요
=====================

**적용기술**
SPA를 구현하기 위한 기술은 다음과 같습니다.

React : View Component를 구현합니다.

Reflux : Flux와 유사하게 Store, Action을 통해 비동기적으로 Modal을 구현합니다.

superagent : REST api 를 구현하기 위한 라이브러리를 사용했습니다.

socket.io : Websocket을 구현하기 위해 Server 및 Client측에서 사용합니다.

React-bootstrap : 기본 View 구조및 디자인을 하기 위해 bootstrap react component를 사용합니다.

Webpack : 파일 및 css의 build 또는 dev-server를 통한 개발환경 구축에 사용하였습니다.

**현재 구현 범위*

현재 구현 범위는 다음과 같습니다.

src/component/Header : react-bootstrap을 통해 Header Component를 구현했습니다.

src/component/ModalPopup : react-bootstrap을 이용한 modal을 공통으로 사용하기 위해, component로  분리하였습니다.

src/utils/Connection : superagent를 사용한 REST api GET, POST 및 socket.io를 사용하여 Websocket object를 생성합니다.

**사용법*

git repository를 clone 하신 후, npm install을 실행합니다.

npm install

다음과 같은 명령어를 통해서 현재의 Boilerplate가 사용가능합니다.

npm start : webpack dev server를 활용하여 실시간으로 파일을 빌드 및 실행해볼 수 있습니다. (http://localhost:3000 으로 접속)

npm run dist : 빌드 파일 배포시에, 이 실행어로 실행하면, dist 폴더에 빌드 파일이 생성됩니다.
