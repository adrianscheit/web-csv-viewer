import { Column } from "./column";

export class Canvas {
    static readonly diagramWidth = 2048;
    static readonly diagramHeight = 256;

    readonly element: HTMLElement = document.createElement('section');
    private readonly h = this.element.appendChild(document.createElement('h4'));
    private readonly canvas = this.element.appendChild(document.createElement('canvas'));
    private readonly context: CanvasRenderingContext2D = this.canvas.getContext('2d')!;

    constructor(title: string) {
        this.h.appendChild(document.createTextNode(title));
        this.canvas.width = Canvas.diagramWidth + 1;
        this.canvas.height = Canvas.diagramHeight + 1;
    }

    drawXAxis(column: Column): void {
        this.context.strokeStyle = '#000';
        this.context.beginPath();
        const y = this.getY(column.getProportionForZero());
        this.context.moveTo(0, y);
        this.context.lineTo(Canvas.diagramWidth, y);
        this.context.stroke();
    }

    drawColumn(data: number[][], domain: Column, column: Column): void {
        this.context.strokeStyle = column.color;
        this.context.beginPath();
        let moveTo = true;
        for (const line of data) {
            if (isNaN(line[domain.index]) || isNaN(line[column.index])) {
                moveTo = true;
                continue;
            }
            const x = domain.getProportion(line) * Canvas.diagramWidth;
            const y = this.getY(column.getProportion(line));
            if (moveTo) {
                this.context.moveTo(x, y);
                moveTo = false;
            } else {
                this.context.lineTo(x, y);
            }
        }
        this.context.stroke();
    }

    private getY(proportion: number): number {
        return 0.5 + Canvas.diagramHeight - proportion * Canvas.diagramHeight;
    }

}