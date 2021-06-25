# PIP 挙動調査報告

Picture-in-Picture とはwebページ内にあるvideoを常に再上に固定した別の独立したウィンドウを提供する機能です。

## 仕様
- [Picture-in-Picture W3C](https://www.w3.org/TR/picture-in-picture/)
- [Picture-in-Picture API - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Picture-in-Picture_API)

## 調査内容
- 何ができるのか
- ブラウザ毎の実装・挙動差異

### 何ができるのか
- video 要素を個別のウィンドウに切り出せる
  - 切り出せる要素は video 要素のみ
  - 追加で別の要素を足すことはできない
- 切り出したウィンドウを別のビデオに変更できる
  - ブラウザによって挙動の差異あり

### ブラウザ毎の差異
#### 共通箇所
- PIPウィンドウのコントロール種類
  - pause / play toggle
  - 元ウィンドウに戻る

#### chrome
- PIPウィンドウは1つのみ
  - 複数タブ間でもPIPウィンドウは共通で1つのみ
- PIP対象のvideo要素を切り替えた場合
  - video要素の再生状況に従う

#### Safari
- PIPウィンドウは1つのみ
  - 複数タブ間でもPIPウィンドウは共通で1つのみ
- PIP対象のvideo要素を切り替えた場合
  - 下記以外はvideo要素の再生状況に従う
  - **PIPから元に戻ったvideo要素はポーズになる**

#### Firefox
- Picture-in-Picture API ではなく独自仕様
- video要素毎にPIPウィンドウが存在可能
