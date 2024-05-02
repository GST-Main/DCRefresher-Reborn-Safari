<p align="center">
    <img src="https://github.com/green1052/DCRefresher-Reborn/raw/main/src/assets/icons/logo/Icon.png" width="200px"/>
</p>

# DCRefresher Reborn

원본: DCRefresher - DCRefresher Reborn

**이 프로젝트는 [DCRefersher Reborn](https://github.com/green1052/DCRefresher-Reborn)의 사파리 지원을 위한 포크프로젝트 입니다. 대부분의 기여는 원저작자들에게 있습니다.**

## 현재 미구현

Safari의 독보적인 성능으로 인해 일부 기능이 제거되었습니다. (추후 수정)

* 차단, 메모 내역 내보내기, 가져오기
* 단축키 기능
* 기타 확인되지 않은 기능

## 빌드

먼저 스크립트와 페이지를 빌드 합니다.
```
pnpm install

pnpm dev:mv3
# or
pnpm build:mv3
```
엑스코드 프로젝트를 열어서 프로젝트 설정 - Signing & Capabillites - Team을 설정 후 빌드

앱 서명이 불가능하면 Safari 설정에서 "서명되지 않은 확장 프로그램 허용" 옵션을 켜야 합니다.
