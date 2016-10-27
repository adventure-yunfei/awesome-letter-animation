declare var require: any;
declare var module: any;
const d3: any = require('d3');
const animejs: any = require('animejs');
import {buildAwesomeLetterAnimation} from './letter/letter';

function awesomeLetterAnimation(str: string, svg: HTMLElement = null, callback: Function = null) {
    let $svg = null;
    if (svg) {
        $svg = d3.select(svg);
    } else {
        $svg = d3
            .select('body')
            .style('background-color', 'black')
            .append('svg')
            .style('width', 1000)
            .style('height', 800);
    }
    
    buildAwesomeLetterAnimation(str, $svg, null, callback);
}

awesomeLetterAnimation['_testHello'] = function () {
    const $svg = d3
        .select('body')
        .style('background-color', 'black')
        .append('svg')
        .style('width', 1000)
        .style('height', 800);

    buildAwesomeLetterAnimation('hello world', $svg, {x: 200, y: 200});
    // buildAwesomeLetterAnimation('中   二', $svg, {x: 200, y: 200});
};

awesomeLetterAnimation['d3'] = d3;
awesomeLetterAnimation['animejs'] = animejs;

module.exports = awesomeLetterAnimation;
