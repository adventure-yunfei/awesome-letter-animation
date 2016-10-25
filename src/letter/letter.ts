import letterConfigs, {LetterConfig} from './letterConfigs';
const anime: any = require('animejs');
const d3: any = require('d3');

function _appendFillPath(letterCfg: LetterConfig, $svg, offset = {x: 0, y: 0}) {
    const offsetX = offset.x;
    const offsetY = offset.y;
    const pathd = letterCfg.path.map(([x, y], idx) => {
        const cmd = idx === 0 ? 'M' : 'L';
        return `${cmd}${offsetX+x},${offsetY+y}`;
    });

    $svg.append('path')
        .classed('text-fill', true)
        .style('opacity', '0')
        .style('fill', 'rgb(249, 193, 0)')
        .attr('d', pathd.join(' ') + ' Z');
}

function _appendLinePath(letterCfg: LetterConfig, $svg, offset = {x: 0, y: 0}) {
    const offsetX = offset.x;
    const offsetY = offset.y;
    const path = letterCfg.path;
    const invisibleIdxMap = !letterCfg.invisibleLines ? {} : letterCfg.invisibleLines.reduce((result, invisibleIdx) => {
        result[invisibleIdx] = true;
        return result;
    }, {});

    let [prevX, prevY] = path[0];
    prevX += offsetX;
    prevY += offsetY;
    for (let i = 1, len = path.length; i < len; i++) {
        let [currX, currY] = path[i];
        currX += offsetX;
        currY += offsetY;
        
        const pathNode = $svg.append('path')
            .classed('text-line', true)
            .attr('d', `M${prevX},${prevY} L${currX},${currY}`)
            .style('stroke', invisibleIdxMap[i] ? 'transparent' : 'rgb(249, 193, 0)')
            .style('stroke-width', '2px')
            .style('transform-origin', '0% 0%')
            .attr('start', `${prevX},${prevY}`)
            .attr('end', `${currX},${currY}`);

        prevX = currX;
        prevY = currY;
    }
}

export function appendLetterNodes(word: string, $svg, offset = {x: 0, y: 0}) {
    const letterCfg = letterConfigs[word];
    _appendFillPath(letterCfg, $svg, offset);
    _appendLinePath(letterCfg, $svg, offset);
}

export function animateLetters() {
    function getTranslate(linePathNode: Element) : {translateX: number, translateY: number} {
        function getLinePoints(linePathNode: Element) {
            const getPoint = (pointStr: string) => {
                const [x, y] = pointStr.split(',');
                return {x: Number(x), y: Number(y)};
            };
            return {
                start: getPoint(linePathNode.getAttribute('start')),
                end: getPoint(linePathNode.getAttribute('end'))
            };
        }
        const TRANSLATE_LENGTH = 1200;
        let {start, end} = getLinePoints(linePathNode);
        if (start.x === end.x) {
            // vertical
            return {
                translateX: 0,
                translateY: anime.random(0,1) === 0 ? TRANSLATE_LENGTH : - TRANSLATE_LENGTH
            };
        } else if (start.y === end.y) {
            // horizontal
            return {
                translateX: anime.random(0,1) === 0 ? TRANSLATE_LENGTH : - TRANSLATE_LENGTH,
                translateY: 0
            };
        } else {
            // diagonal
            const ratio = (end.y - start.y) / (end.x - start.x);
            const translateY = Math.round(Math.sin(Math.atan(ratio)) * TRANSLATE_LENGTH);
            return {
                translateX: Math.round(translateY * ratio),
                translateY: translateY
            };
        }
    }

    anime({
        targets: 'path.text-line',
        translateX: (target: Element) => getTranslate(target).translateX,
        translateY: (target: Element) => getTranslate(target).translateY,
        scale: 4,
        opacity: {
            value: [1, 0],
            duration: 100,
        },
        stroke: '#fff',
        delay: (target: Element, index: number) => index * 25,
        duration: 500,
        easing: 'easeInOutQuad',
        direction: 'reverse',

        complete() {
            anime({
                targets: 'path.text-fill',
                fill: '#FFF',
                opacity: [1, 0],
                delay(target: Element, index: number) {
                    return anime.random(0, 450);
                },
                easing: 'easeOutExpo',
                duration: 200,
                direction: 'reverse',

                complete() {
                    anime({
                        targets: 'path.text-line',
                        opacity: 0,
                        duration: 2000
                    });
                }
            });
        }
    });
}

export function getLetterBoundary(word: string) {
    const {path} = letterConfigs[word];
    let [minX, minY] = path[0];
    let maxX = minX, maxY = minY;

    for (let i = 1, len = path.length; i < len; i++) {
        const [x, y] = path[i];
        if (x < minX) {
            minX = x;
        } else if (x > maxX) {
            maxX = x;
        }
        if (y < minY) {
            minY = y;
        } else if (y > maxY) {
            maxY = y;
        }
    }

    return {
        top: minY,
        bottom: maxY,
        left: minX,
        right: maxX
    };
}

export function buildAwesomeLetterAnimation(str: string, $svg, offset: {x: number, y: number} = null) {
    let prevWord = null;
    offset = offset || {x: 0, y: 0};
    str.toLowerCase().split('').forEach(word => {
        if (prevWord) {
            offset.x += getLetterBoundary(prevWord).right + 10;
        }
        appendLetterNodes(word, $svg, offset);

        prevWord = word;
    });

    animateLetters();
}
