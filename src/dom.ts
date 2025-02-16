import { Canvas } from "./canvas";
import { Column } from "./column";

export class Dom {
    private static readonly statusText: Text = document.getElementById('status')!.appendChild(document.createTextNode(''));
    private static readonly results: HTMLElement = document.getElementById('results')!;

    static setStatus = async (v: string) => {
        console.log(v);
        this.statusText.nodeValue = v;
        await new Promise<void>((resolve) => setTimeout(resolve, 10));
    };

    static addFile = (fileContentLength: number): void => {
        this.results
            .appendChild(document.createElement('h2'))
            .appendChild(document.createTextNode(`File loaded at ${new Date().toLocaleTimeString()} with ${fileContentLength} characters`));
    };

    static addConstant = (column: Column): void => {
        this.results
            .appendChild(document.createElement('li'))
            .appendChild(document.createTextNode(`${column.title} = ${column.avg()} (${column.quantity} times) ${new Date().toISOString()}`));
    };

    static addDiagram = (domain: Column, column: Column, data: number[][]): void => {
        const canvas = new Canvas(`${column.title}(${domain.title}) ${new Date().toISOString()} min=${column.min}, max=${column.max}, avg=${column.avg()}, color=${column.color}`);
        this.results.appendChild(canvas.element);
        canvas.drawXAxis(column);
        canvas.drawColumn(data, domain, column);
    };

    static addSummaryDiagram = (domain: Column, columns: Column[], data: number[][]): void => {
        const canvas = new Canvas(`SUMMARY(${domain.title}) ${new Date().toISOString()}`);
        this.results.appendChild(canvas.element);

        for (const column of columns) {
            canvas.drawColumn(data, domain, column);
        }
    };
}
