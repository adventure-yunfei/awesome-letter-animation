const d3: any = require('d3');
import letterConfigs from './letterConfigs';
import Letter from './Letter';

const svg = d3
    .select('body')
    .style('background-color', 'black')
    .append('svg')
    .attr('width', 1800)
    .attr('height', 800);

let prevLetter: Letter = null;
let offset = {x: 300, y: 200};
Object.keys(letterConfigs)
    .forEach((key, idx) => {
        const letterCfg = letterConfigs[key];
        let baseX = 0, baseY = 0;
        if (prevLetter) {
            baseX = prevLetter.getBoundary().right + 10;
        }
        const letter = new Letter(letterCfg.path);
        letter.appendNodes(svg, offset);
        const boundary = letter.getBoundary();
        offset.x += boundary.right + 10;
    });

Letter.animateLetters();
