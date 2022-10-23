import { Column } from "./Column";
import { addConstant, addDiagram, setStatus } from "./dom";

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
      console.log(columns);
      const data: number[][] = fields.map((line) => line.map((field) => +field));
      setStatus(`There are ${fields.length} lines and ${columns.length} columns in the loaded file. Analysing file...`);
      if (fields.length < 2 || columns.length < 2) {
        setStatus('the file is too small');
        return;
      }
      for (const line of data) {
        columns.forEach((column) => column.add(line[column.index]));
      }
      const domain: Column = columns[0];

      // print consts:
      for (const column of columns.filter((column) => column.quantity && column.isConstant())) {
        addConstant(column);
      }

      // draw diagram:
      const diagramColumns = columns.filter((column) => !column.isConstant());
      diagramColumns.forEach((column, index) => {
        setStatus(`Drawing points ${Math.round(100 * index / diagramColumns.length)}%. Drawing ${column.title}...`);
        addDiagram(domain, column, data);
      });

      setStatus(`Done!`);
    };
    reader.readAsText(files[0]);
  }
});
