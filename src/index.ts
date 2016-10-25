const d3: any = require('d3');
import {buildAwesomeLetterAnimation} from './letter/letter';

const svg = d3
    .select('body')
    .style('background-color', 'black')
    .append('svg')
    .attr('width', 1800)
    .attr('height', 800);

buildAwesomeLetterAnimation('Iamhere', svg, {x: 200, y: 200});
