import { Column } from "./Column";

const statusText: Text = document.getElementById('status')!.appendChild(document.createTextNode(''));
const constans: HTMLElement = document.getElementById('constans')!;
const diagrams: HTMLElement = document.getElementById('diagrams')!;

export const setStatus = (v: string) => {
    console.log(v);
    statusText.nodeValue = v;
};

export const addConstant = (column: Column): void => {
    constans
        .appendChild(document.createElement('div'))
        .appendChild(document.createTextNode(`${column.title} = ${column.avg()}`));
};

const svgNs = 'http://www.w3.org/2000/svg';

const addPoint = (pDomain: number, pValue: number): SVGElement => {
    const point = document.createElementNS(svgNs, 'rect');
    point.setAttribute('y', `${199 - pValue * 199}`);
    point.setAttribute('x', `${pDomain * 1999}`);
    point.setAttribute('width', `1`);
    point.setAttribute('height', `1`);
    return point;
};

export const addDiagram = (domain: Column, column: Column, data: number[][]): void => {
    const diagram = diagrams.appendChild(document.createElementNS(svgNs, 'svg'));
    diagram.classList.add('diagram');
    diagram.style.fill = column.color;

    for (const line of data) {
        if (isNaN(line[domain.index]) || isNaN(line[column.index])) {
            continue;
        }
        diagram.appendChild(addPoint(domain.getProprotion(line), column.getProprotion(line)));
    }

    diagrams
        .appendChild(document.createElement('strong'))
        .appendChild(document.createTextNode(`${column.title}(${domain.title}) min=${column.min}, max=${column.max}, avg=${column.avg()}, color=${column.color}`))
    diagrams.appendChild(diagram);
};