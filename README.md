# angular-weibo-emotify

Angular directive and service to emotify weibo text.

## Install

```
bower install angular-weibo-emotify
npm install angular-weibo-emotify
```

## Usage

Inject module into your application

```javascript
angular.module('YourApp', ['weibo-emotify']);
```

Use as [Directive](https://docs.angularjs.org/guide/directive)

```html
<!-- As a directive -->
<div weibo-emotify>{{ weibo_text }}</div>
```

Inject as [Service](https://docs.angularjs.org/guide/services)

```javascript
// Injected into controller
angular.module('someModule').controller('SomeCtrl', function ($scope, weiboEmotify, $sce) {
  var text = "GitHub 年会 2015 [照相机][围观]，图里的是 CEO。";
  
  $scope.text = $sce.trustAsHtml(weiboEmotify(text));
  // outputs: GitHub 年会 2015 <img text="[照相机]" alt="[照相机]" src="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/33/camera_org.gif"><img text="[围观]" alt="[围观]" src="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f2/wg_org.gif">，图里的是 CEO。

});

```
