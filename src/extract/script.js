"use strict";
const fs = require('fs');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'v2.json')
const DIST_PATH = path.resolve(ROOT_PATH, '../emotions_v2.json')

const emotionsSrc = JSON.parse(fs.readFileSync(SRC_PATH));

/**
 * URL Structure
 *
 * 1) Prefix (Static): http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/
 * 2) ID
 * 3) Type: '+' -> '_thumb' | '-' -> '_org' | '@' -> ''
 * 4) Suffix: '?' -> '.png' | '.gif'
 *
 */
let emotionsDist = {}
emotionsSrc.forEach(item => {
    const key = item.phrase.replace(/[\[\]]/g, '');

    // 刪除前綴
    let url = item.url.replace('http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/', '');

    if (url.indexOf('_org') > 0){
        url = url.replace(/\//, '-').replace('_org', '');
    } else if (url.indexOf('_thumb') > 0){
        url = url.replace(/\//, '+').replace('_thumb', '');
    } else {
        url = url.replace(/\//, '@');
    }

    if (url.indexOf('.png') > 0){
        url = url.replace('.png', '?')
    } else {
        url = url.replace('.gif', '')
    }
    emotionsDist[key] = url
})

fs.writeFileSync(DIST_PATH, JSON.stringify(emotionsDist, null, 4))