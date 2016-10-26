const d3: any = require('d3');
import {buildAwesomeLetterAnimation} from './letter/letter';


function _testHello() {
    const svg = d3
        .select('body')
        .style('background-color', 'black')
        .append('svg')
        .attr('width', 1800)
        .attr('height', 800);

    buildAwesomeLetterAnimation('i am here', svg, {x: 200, y: 200});
    // buildAwesomeLetterAnimation('中   二', svg, {x: 200, y: 200});
}

window['awesomeLetterAnimation'] = {
    buildAwesomeLetterAnimation,
    _testHello
};

export {
    buildAwesomeLetterAnimation
}
