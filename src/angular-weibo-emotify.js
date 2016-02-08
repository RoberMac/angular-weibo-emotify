/*!
 * angular-weibo-emotify - Angular directive and service to emotify weibo text
 * https://github.com/RoberMac/angular-weibo-emotify
 *
 * Copyright (c) 2015 RoberTu <robertu0717@gmail.com>
 * @license MIT
 * @version v0.3.0
 */

angular.module('weibo-emotify', [])
.provider('weiboEmotify', function (){

    this.setEmotionsURL = function (url){
        this.emotionsURL = url
    }

    this.$get = ['$window', '$http', '$q', function($window, $http, $q){
        if (!this.emotionsURL) {
            throw new Error('`emotionsURL` is required')
        }

        var ls = $window.localStorage;
        var emotions_list = ls && JSON.parse(ls.getItem('weiboEmotions'));
        var emotionsURL = this.emotionsURL;

        return $q(function (resolve, reject){
            if (!emotions_list || emotions_list['_v'] !== '2.0'){
                $http.get(emotionsURL)
                .success(function (data){

                    if (Object.prototype.toString.call(data) !== '[object Object]') {
                        reject('`emotions_list` is not a Object')
                        return;
                    }
                    if (data['_v'] !== '2.0') {
                        reject('`emotions_list` is not v2.0')
                        return;
                    }

                    ls && ls.setItem('weiboEmotions', JSON.stringify(data))
                    emotions_list = data
                    resolve()
                })
                .error(function (err){
                    reject(err)
                })
            } else {
                resolve()
            }
        })
        .then(function (){
            return weiboEmotifyFactory
        })
        .catch(function (err){
            throw new Error(err)
        })

        function weiboEmotifyFactory(_str){
            if (!_str) return;

            var _text = _str
            .replace(/\[[\u4e00-\u9fa5\w]+\]/g, function (str){
                /**
                 * Key Structure
                 *
                 * [key] -> key
                 *
                 */
                var key = str.replace(/[\[\]]/g, '');
                var _id = emotions_list[key];

                if (!_id) return str;

                /**
                 * URL Structure
                 *
                 * 1) Prefix (Static): http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/
                 * 2) ID
                 * 3) Type: '+' -> '_thumb' | '-' -> '_org' | '@' -> ''
                 * 4) Suffix: '?' -> '.png' | '.gif'
                 *
                 */
                var prefix = 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/';
                var id     = _id.replace(/\-|\+|\@/g, '/').replace('?', '');
                var type   = _id.indexOf('-') > 0 ? '_org' : _id.indexOf('+') > 0 ? '_thumb' : '';
                var suffix = _id.indexOf('?') > 0 ? '.png' : '.gif';

                return '<img text="' + str + '" alt="' + str + '" src="'
                        + prefix
                        + id
                        + type
                        + suffix
                        + '">';
            });

            return _text || '';
        }
    }]
})
.directive('weiboEmotify', ['$timeout', 'weiboEmotify', function ($timeout, weiboEmotify){

    return {
        restrict: 'A',
        link: function (scope, elem, attrs){
            weiboEmotify
            .then(function (emotify){
                $timeout(function () {
                    elem.html(emotify(elem.html()));
                })
            })
        }
    }
}])