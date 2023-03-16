## 샵밥두비두바링두비두바루루룽

## 규칙

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

## 개발환경

### @ BE

    - Spring Boot 2.7.9
        - spring sercurity
        - OAuth2
        - JWT 
        - MySql
        - gson
        - p6spy
        - Java 11
        - SpringWeb
        - SpringDataJpa
        - Lombok

        ## Mapper : 
        - git book
        - restdocs
        - swagger 



    - IntelliJ IDEA

2023 03 09 16:19
audit 추가
comment entity 추가
like entity 추가
member entity 추가
song entity 추가

### @ FE

    - React 18.2.0
        - JavaScript ES6+
        - Node.js
        - Webpack
        - Babel
        - React
        - Styledcomponents
        - Axios
        - Redux


    - Visual Studio Code
    - Node version ?

### @배포 

    - CI : github Actions
    - CD : AWS lightsale
## 프로젝트 설명

- 작성 필요

## 팀원

- FE: 김유원, 김찬희, 하지웅, 황민혁
- BE: 강동우, 유지건, 고한성, 문희승

## Project Wiki

프로젝트 팀 정보, 기획, 아키텍쳐에 대한 자세한 안내입니다.
https://www.notion.so/codestates/688b486bbbba4d3c8c13b781e44a7a79

