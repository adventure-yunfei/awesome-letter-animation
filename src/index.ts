declare var require: any;
declare var module: any;
const d3: any = require('d3');
const animejs: any = require('animejs');
import {buildAwesomeLetterAnimation} from './letter/letter';

function awesomeLetterAnimation(str: string) {
    const svg = d3
        .select('body')
        .style('background-color', 'black')
        .append('svg')
        .attr('width', 1800)
        .attr('height', 800);
    buildAwesomeLetterAnimation(str, svg);
}

awesomeLetterAnimation['_testHello'] = function () {
    const svg = d3
        .select('body')
        .style('background-color', 'black')
        .append('svg')
        .attr('width', 1800)
        .attr('height', 800);

    buildAwesomeLetterAnimation('hello world', svg, {x: 200, y: 200});
    // buildAwesomeLetterAnimation('中   二', svg, {x: 200, y: 200});
};

awesomeLetterAnimation['d3'] = d3;
awesomeLetterAnimation['animejs'] = animejs;

module.exports = awesomeLetterAnimation;
