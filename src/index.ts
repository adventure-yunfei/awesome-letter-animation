import letterAnimations from './letter-animations/letterAnimations';
const d3: any = require('d3');

const
    letter_a = letterAnimations.a,
    letter_m = letterAnimations.m;

const svg = d3
    .select('body')
    .append('svg')
    .attr('width', 1800)
    .attr('height', 800)
    .style('border', '1px solid gray');

const letterWidth = 120;
const svgPos = svg.node().getBoundingClientRect();
let prevPath = null;
Object.keys(letterAnimations)
    .forEach((key, idx) => {
        const letter = letterAnimations[key];
        let x = 0, y = 0;
        if (prevPath) {
            x = prevPath.node().getBoundingClientRect().right + 10 - svgPos.left;
        }
        prevPath = svg
            .append('path')
            .attr('d', `M${x},${y} ` + letter.path.join(' '));
    });

// window.d3 = d3;