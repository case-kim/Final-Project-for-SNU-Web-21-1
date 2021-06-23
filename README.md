# Final-Project-for-SNU-Web-21-1


## 개요

"왜 심리테스트는 많은데, 각자 잘 맞는 마음을 가진 사람들을 만나지는 못할까?"
라는 문제점에서 출발했습니다.
저희는 각자 테스트를 통해, 본인의 심리를 파악하며,
자신과 가장 잘 맞는 사람을 찾아서 서로 대화할 수 있게 해본다

## 기능명세

### 개요
회원가입 및 로그인 / 구글 & 깃헙계정으로 진행가능. 회원가입 및 로그인 에러시 에러 메시지 뜸

비로그인시 메인 화면 송출.
로그인을 했으나, profile이 완료 안 됐을 시, 프로파일 완료 셋업 버튼이 뜬다
로그인을 했으나, 아직 테스트를 한 적 없으면, 테스트 버튼만 뜨고
로그인을 했고, 테스트를 했으면, 결과창, 
내부 라우팅은 /, /test, /result, /matching, /chatting 으로 구성 (React-Router-Dom 사용)

### Firebase DB
각자 개발이 달라서 firebase와 firestore를 혼용함.
#### Realtime DB
- accounts: 유저 개인 정보 저장
- partnerList: 파트너 매칭 정보 띄우기
- 
#### Firestore

#### Storage
-imagesOfFlowers: 각 유형에 맞는 꽃 이미지 저장
-images/avatars: user profile 저장
