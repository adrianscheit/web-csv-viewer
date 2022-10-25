import { Column } from "./Column";

const statusText: Text = document.getElementById('status')!.appendChild(document.createTextNode(''));
const constans: HTMLElement = document.getElementById('constans')!;
const diagrams: HTMLElement = document.getElementById('diagrams')!;

export const setStatus = async (v: string) => {
    console.log(v);
    statusText.nodeValue = v;
    await new Promise<void>((resolve) => setTimeout(resolve, 10))
};

export const addConstant = (column: Column): void => {
    constans
        .appendChild(document.createElement('div'))
        .appendChild(document.createTextNode(`${column.title} = ${column.avg()}`));
};

const diagramWidth = 2048;
const diagramHeight = 256;

const drawColumn = (data: number[][], domain: Column, column: Column, context: CanvasRenderingContext2D): void => {
    for (const line of data) {
        if (isNaN(line[domain.index]) || isNaN(line[column.index])) {
            continue;
        }
        context.fillRect(
            domain.getProprotion(line) * diagramWidth,
            diagramHeight - column.getProprotion(line) * diagramHeight,
            1,
            1
        );
    }
}

export const addDiagram = (domain: Column, column: Column, data: number[][]): void => {
    const canvas = diagrams.appendChild(document.createElement('canvas'));
    canvas.className = 'diagram';
    canvas.width = diagramWidth + 1;
    canvas.height = diagramHeight + 1;
    const context = canvas.getContext('2d')!;
    context.fillStyle = column.color;

    drawColumn(data, domain, column, context);

    diagrams
        .appendChild(document.createElement('strong'))
        .appendChild(document.createTextNode(`${column.title}(${domain.title}) min=${column.min}, max=${column.max}, avg=${column.avg()}, color=${column.color}`))
    diagrams.appendChild(canvas);
};

export const addSummaryDiagram = (domain: Column, columns: Column[], data: number[][]): void => {
    const canvas = diagrams.appendChild(document.createElement('canvas'));
    canvas.className = 'diagram';
    canvas.width = diagramWidth + 1;
    canvas.height = diagramHeight + 1;
    const context = canvas.getContext('2d')!;

    for (const column of columns) {
        context.fillStyle = column.color;
        drawColumn(data, domain, column, context);
    }

    diagrams
        .appendChild(document.createElement('strong'))
        .appendChild(document.createTextNode(`SUMMARY(${domain.title})`))
    diagrams.appendChild(canvas);
};