import { Column } from "./Column";

const statusText: Text = document.getElementById('status')!.appendChild(document.createTextNode(''));
const constans: HTMLElement = document.getElementById('constans')!;
const diagrams: HTMLElement = document.getElementById('diagrams')!;

export const setStatus = async (v: string) => {
    console.log(v);
    statusText.nodeValue = v;
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 25));
};

export const addConstant = (column: Column): void => {
    constans
        .appendChild(document.createElement('div'))
        .appendChild(document.createTextNode(`${column.title} = ${column.avg()}`));
};

const addPoint = (color: string, pDomain: number, pValue: number): HTMLElement => {
    const point = document.createElement('div');
    point.className = 'point';
    point.style.bottom = `${pValue * 100}px`;
    point.style.left = `${pDomain * 1000}px`;
    point.style.backgroundColor = color;
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
        .appendChild(document.createTextNode(`${column.title}(${domain.title}) min=${column.min}, max=${column.max}, avg=${column.avg()}`))
    diagrams.appendChild(diagram);
};