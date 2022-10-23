import { Column } from "./Column";

const statusText: Text = document.getElementById('status')!.appendChild(document.createTextNode(''));
const constans: HTMLElement = document.getElementById('constans')!;
const diagrams: HTMLElement = document.getElementById('diagrams')!;

export const setStatus = (v: string): void => {
    statusText.nodeValue = v;
    console.log(v);
};

export const addConstant = (column: Column): void => {
    constans
        .appendChild(document.createElement('div'))
        .appendChild(document.createTextNode(`${column.title} = ${column.avg()}`));
};

const addPoint = (color: string, pDomain: number, pValue: number): HTMLElement => {
    const point = document.createElement('div');
    point.className = 'point';
    point.style.bottom = `${pValue * 100 + 10}px`;
    point.style.left = `${pDomain * 1000 + 50}px`;
    point.style.borderColor = color;
    return point;
};

export const addDiagram = (domain: Column, column: Column, data: number[][]): void => {
    const diagram = diagrams.appendChild(document.createElement('div'));
    diagram.className = 'diagram';

    for (const line of data) {
        if (isNaN(line[domain.index]) || isNaN(line[column.index])) {
            continue;
        }
        diagram.appendChild(addPoint(
            column.color,
            domain.getProprotion(line),
            column.getProprotion(line),
        ));
    }

    diagrams
        .appendChild(document.createElement('strong'))
        .appendChild(document.createTextNode(`${column.title}(${domain.title})`))
    diagrams.appendChild(diagram);
};