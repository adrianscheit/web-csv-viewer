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

export const addPoint = (column: Column, pDomain: number, pValue: number): void => {
};