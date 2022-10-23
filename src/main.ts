import { Column } from "./Column";
import { addConstant, setStatus } from "./dom";

document.querySelector('input[type=file]')!.addEventListener('input', (event) => {
  const files: FileList = (event.target as any).files;
  if (files.length === 1) {
    setStatus(`Reading a text file of ${files[0].size}B...`);
    const reader = new FileReader();
    reader.onload = () => {
      const fields: string[][] = (reader.result as string)
        .split(/\r\n|\n\r|\n|\r/)
        .map((line) => line.split(','))
        .filter((line) => line.length);
      const columns = fields.shift()!.map((title, index) => new Column(title, index));
      setStatus(`There are ${fields.length} lines and ${columns.length} columns in the loaded file. Analysing file...`);
      if (fields.length < 2 || columns.length < 2) {
        setStatus('the file is too small');
        return;
      }
      const data: number[][] = fields.map((line) => line.map((field) => +field));
      for (const line of data) {
        columns.forEach((column) => column.add(line[column.index]));
      }
      const domain: Column = columns.shift()!;
      setStatus(`The domain column has: ${JSON.stringify(domain)}`);
      setStatus(`The data columns: ${JSON.stringify(columns)}`);

      // print consts:
      const constColumns = columns.filter((column) => column.quantity && column.isConstant());
      for (const column of constColumns) {
        addConstant(column);
      }

      // draw diagram:
      const diagramColumns = columns.filter((column) => !column.isConstant());
      for (const line of data) {
        diagramColumns; // TODO
      }
    };
    reader.readAsText(files[0]);
  }
});
