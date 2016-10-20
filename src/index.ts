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
        let baseX = 0, baseY = 0;
        if (prevPath) {
            baseX = prevPath.node().getBoundingClientRect().right + 10 - svgPos.left;
        }
        let pathd = letter.path.map(([x, y], idx) => {
            const cmd = idx === 0 ? 'M' : 'L';
            return `${cmd}${baseX+x},${baseY+y}`;
        });
        prevPath = svg
            .append('path')
            .attr('d', pathd.concat('Z').join(' '));
    });

// window.d3 = d3;
