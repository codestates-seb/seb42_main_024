## 샵밥두비두바링두비두바루루룽

<div  align="center">
  <img width="80%" src="http://mainprojects4.s3-website.ap-northeast-2.amazonaws.com/9de1623c0ee671f360ea.png" alt="roobits">
</div>

</br>

- **`팀 명` :**  샵밥두비두바링두비두바루루룽
- **`프로젝트 명` :** 샵밥두비두바링두비두바루루룽
- **`프로젝트 기간` :** 2023.03.04 - 2023.04.07
- **`한줄 소개` :** ddunidubab ! 음악을 공유할 수 있는 사이트입니다
- **`팀원` :** 문희승, 강동우, 고한성, 유지건, 김찬희, 황민혁, 김유원, 하지웅
- **`배포 링크` :** http://mainprojects4.s3-website.ap-northeast-2.amazonaws.com/
- **`프로젝트 위키`** : https://www.notion.so/codestates/688b486bbbba4d3c8c13b781e44a7a79
- **`기술발표영상`** : https://www.youtube.com/watch?v=gNzR4NlBv1g
- **`서비스 메뉴얼`** : https://codestates.notion.site/93ef374689a548e1b168b403cf8fb3b6
- **`테이블 명세서`** : https://codestates.notion.site/ERD-9783a0db5d9f462380d17382b9788322
<br/>

## 팀원

| 문희승<br>(BE, 팀장) | 강동우<br>(BE) | 고한성<br>(BE) | 유지건<br>(BE) |
| :---: | :---: | :---: | :---: |
| <img src='https://user-images.githubusercontent.com/111185089/234260352-17ecb893-384a-41a2-b382-0b9951a1637e.jpg' width='100px' height='100px'> | <img src='https://user-images.githubusercontent.com/111185089/234261553-624c5778-7f88-4886-b931-bb58fa0d5e40.jpg' width='100px' height='100px'> | <img src='https://user-images.githubusercontent.com/111185089/234262139-d5dd2a30-b6cf-4b14-b1ff-43266115ef30.jpg' width='100px' height='100px'> | <img src='https://user-images.githubusercontent.com/111185089/234263831-36e61826-a1a6-4476-bbac-9f4b847f572d.jpg' width='100px' height='100px'> |
| - 빌드, 배포<br/>- 서버, 데이터베이스<br/>- DevOps | -Member & Spring Security<br/>- Playlist, Chatroom | -Like, Follow | - Board<br/>- Comment<br/>- Global |
| 김찬희<br>(FE, 부팀장) | 황민혁 <br>(FE) | 김유원 <br>(FE) | 하지웅 <br>(FE) |
| <img src='https://user-images.githubusercontent.com/111185089/234260352-17ecb893-384a-41a2-b382-0b9951a1637e.jpg' width='100px' height='100px'> |  |  |  |
| 123 | 123 | 123 | 123 |

## BE
<img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> <img src="https://img.shields.io/badge/spring boot-6DB33F?style=for-the-badge&logo=spring boot&logoColor=white"> <img src="https://img.shields.io/badge/spring data jpa-6DB33F?style=for-the-badge&logo=spring data jpa&logoColor=white"> <img src="https://img.shields.io/badge/spring boot security jpa-6DB33F?style=for-the-badge&logo=spring boot security&logoColor=white"> <img src="https://img.shields.io/badge/spring websocket-6DB33F?style=for-the-badge&logo=spring websocket&logoColor=white"><br/>
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/oauth2.0-EB5424?style=for-the-badge&logo=auth0&logoColor=white">
 

2023 03 09 16:19
audit 추가
comment entity 추가
like entity 추가
member entity 추가
song entity 추가

## FE
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">

### @ 깃허브 커밋 컨벤션

    1. 기본적으로 한글로 작성하며 클래스/모듈, 함수/메서드 등은 정확히 명시하는것을 권장 (애메하면 필수는 아님)
    EX) 유저컨트롤러 로그인 기능 작성 -> UserController의 postUser 메서드 작성

    2. 미완성된 작업 커밋 지양
        - feat 브랜치는 컴파일 에러만 나지 않는다면 일단 ok (되도록 함수단위의 완성을 지향)
        - dev 브랜치는 하나의 기능 단위를 완성으로 보고 머지 허용
        - main 브랜치는 하나의 도메인(fe. 하나의 페이지) 단위를 완성으로 보고 머지 허용

    3. pull request 후 merge는 로컬이 아닌 원격 깃허브 페이지에서 진행하는것을 원칙으로 함

    4. merge 하기 전 팀원에게 알리고, 팀원은 가능하면 동참해서 코드 확인 후 문제없을시 진행

    5. feat 브렌치 네이밍은 "feat/(진행중인 기능 or 작업)" 형식

    6. 커밋 메세지는 "타입 : 내용"을 header로 필수로 작성하고, 줄바꿈 후 body에 내용을 선택적으로 작성.

        @@@ 커밋 메세지 타입 @@@
        -  Feat = 새로운 기능 추가
        -  Fix = 버그 수정
        -  Revise = 오타, 코드 수정
        -  Docs = 문서 작성 및 수정
        -  Style = 웹 스타일링
        -  Refactor = 코드 리팩토링
        -  Chore = 빌드 업무 수정, 패키지 매니저 수정
        -  Test = 테스트 코드

        @@@ 커밋 메세지 예시 @@@
        Test : UserController 테스트케이스 작성 /  *** header 작성은 필수 ***
        Validation 검증, PostMember 메서드 검증, GetMember 메서드 검증 / *** body 작성은 선택 ***

### @ BE

    1. 주석은 코드 하단에 작성 ,

    

    3. 외부 mapper 라이브러리는 사용 X

    4. 네이밍 규칙
        - 기본적으로 카멜 케이스
        - DB컬럼 : 스네이크
        - URI : 스켈레톤

### @ FE

    1. Styled Component 사용

    2. 주석은 코드 상단에 줄바꿈

    3. global style 제작해서 사용

    4. prettier 규칙
        - single quote 체크
        - print width 75
        - tab width 2
        - bracket same line 체크

### @배포 

    - CI : github Actions
    - CD : AWS lightsale
## 프로젝트 설



