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

const addPoint = (pDomain: number, pValue: number, canvasRenderingContext2D: CanvasRenderingContext2D): void => {
    canvasRenderingContext2D.fillRect(pDomain * 2048, 256 - pValue * 256, 1, 1);
};

export const addDiagram = (domain: Column, column: Column, data: number[][]): void => {
    const canvas = diagrams.appendChild(document.createElement('canvas'));
    canvas.className = 'diagram';
    canvas.width = 2049;
    canvas.height = 257;
    const context = canvas.getContext('2d')!;
    context.fillStyle = column.color;

    for (const line of data) {
        if (isNaN(line[domain.index]) || isNaN(line[column.index])) {
            continue;
        }
        addPoint(domain.getProprotion(line), column.getProprotion(line), context);
    }

    diagrams
        .appendChild(document.createElement('strong'))
        .appendChild(document.createTextNode(`${column.title}(${domain.title}) min=${column.min}, max=${column.max}, avg=${column.avg()}, color=${column.color}`))
    diagrams.appendChild(canvas);
};