import { Column } from "./column";

const statusText: Text = document.getElementById('status')!.appendChild(document.createTextNode(''));
const results: HTMLElement = document.getElementById('results')!;

export const setStatus = async (v: string) => {
    console.log(v);
    statusText.nodeValue = v;
    await new Promise<void>((resolve) => setTimeout(resolve, 20))
};

export const addFile = (fileContentLength: number): void => {
    results
        .appendChild(document.createElement('h3'))
        .appendChild(document.createTextNode(`File loaded at ${new Date().toLocaleTimeString()} with ${fileContentLength} characters`));
};

export const addConstant = (column: Column): void => {
    results
        .appendChild(document.createElement('li'))
        .appendChild(document.createTextNode(`${column.title} = ${column.avg()} (${column.quantity} times) ${new Date().toISOString()}`));
};

const diagramWidth = 2048;
const diagramHeight = 256;

const getY = (proportion: number): number => diagramHeight - proportion * diagramHeight;

const drawColumn = (data: number[][], domain: Column, column: Column, context: CanvasRenderingContext2D): void => {
    context.strokeStyle = column.color;
    context.beginPath();
    let moveTo = true;
    for (const line of data) {
        if (isNaN(line[domain.index]) || isNaN(line[column.index])) {
            moveTo = true;
            continue;
        }
        const x = domain.getProportion(line) * diagramWidth;
        const y = getY(column.getProportion(line));
        if (moveTo) {
            context.moveTo(x, y);
            moveTo = false;
        } else {
            context.lineTo(x, y);
        }
    }
    context.stroke();
}

export const addDiagram = (domain: Column, column: Column, data: number[][]): void => {
    results
        .appendChild(document.createElement('h4'))
        .appendChild(document.createTextNode(`${column.title}(${domain.title}) ${new Date().toISOString()} min=${column.min}, max=${column.max}, avg=${column.avg()}, color=${column.color}`))
    const canvas = results.appendChild(results.appendChild(document.createElement('canvas')));

    canvas.className = 'diagram';
    canvas.width = diagramWidth + 1;
    canvas.height = diagramHeight + 1;
    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;

    context.fillStyle = '#aaa';
    context.fillRect(0, getY(column.getProportionForZero()), diagramWidth, 1);
    drawColumn(data, domain, column, context);
};

export const addSummaryDiagram = (domain: Column, columns: Column[], data: number[][]): void => {
    results
        .appendChild(document.createElement('h4'))
        .appendChild(document.createTextNode(`SUMMARY(${domain.title}) ${new Date().toISOString()}`))
    const canvas = results.appendChild(results.appendChild(document.createElement('canvas')));
    canvas.className = 'diagram';
    canvas.width = diagramWidth + 1;
    canvas.height = diagramHeight + 1;
    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;

    for (const column of columns) {
        drawColumn(data, domain, column, context);
    }
};