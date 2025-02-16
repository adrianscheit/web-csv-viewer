import { Canvas } from "./canvas";
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

export const addDiagram = (domain: Column, column: Column, data: number[][]): void => {
    const canvas = new Canvas(`${column.title}(${domain.title}) ${new Date().toISOString()} min=${column.min}, max=${column.max}, avg=${column.avg()}, color=${column.color}`);
    results.appendChild(canvas.element);
    canvas.drawXAxis(column);
    canvas.drawColumn(data, domain, column);
};

export const addSummaryDiagram = (domain: Column, columns: Column[], data: number[][]): void => {
    const canvas = new Canvas(`SUMMARY(${domain.title}) ${new Date().toISOString()}`);
    results.appendChild(canvas.element);

    for (const column of columns) {
        canvas.drawColumn(data, domain, column);
    }
};