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
  
    weiboEmotify.then(function (emotify){
        $scope.text = $sce.trustAsHtml(emotify(text));
        // outputs: GitHub 年会 2015 <img text="[照相机]" alt="[照相机]" src="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/33/camera_org.gif"><img text="[围观]" alt="[围观]" src="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f2/wg_org.gif">，图里的是 CEO。
    })

});

```

### Load `emotions_list` file
The `emotions_list` file is loaded from [GitHub](https://raw.githubusercontent.com/RoberMac/angular-weibo-emotify/master/dist/emotions_v1.min.json) and store it locally.

You can customize the URL: 

```javascript
angular.module('YourApp', ['weibo-emotify'])
.config(['weiboEmotifyProvider', function (weiboEmotifyProvider){
    weiboEmotifyProvider.setEmotionsURL('https://example.com/emotions_v1.json')
}])
```

## License
[MIT](https://github.com/RoberMac/angular-weibo-emotify/blob/master/LICENSE)