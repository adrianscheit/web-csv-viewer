import { Column } from "./Column";
import { addConstant, addDiagram, setStatus } from "./dom";

document.querySelector('input[type=file]')!.addEventListener('input', (event) => {
  const files: FileList = (event.target as any).files;
  if (files.length === 1) {
    setStatus(`Reading a text file of ${files[0].size}B...`);
    const reader = new FileReader();
    reader.onload = async () => {
      const fields: string[][] = (reader.result as string)
        .split(/\r\n|\n\r|\n|\r/)
        .map((line) => line.split(','))
        .filter((line) => line.length);
      const columns = fields.shift()!.map((title, index) => new Column(title, index));
      const data: number[][] = fields.map((line) => line.map((field) => +field));
      await setStatus(`There are ${fields.length} lines and ${columns.length} columns in the loaded file. Analysing file...`);
      if (fields.length < 2 || columns.length < 2) {
        setStatus('the file is too small');
        return;
      }
      for (const line of data) {
        columns.forEach((column) => column.add(line[column.index]));
      }
      const domain: Column = columns.shift()!;
      await setStatus(`The domain column has: ${JSON.stringify(domain)}`);
      await setStatus(`The data columns: ${JSON.stringify(columns)}`);

      // print consts:
      for (const column of columns.filter((column) => column.quantity && column.isConstant())) {
        addConstant(column);
      }

      // draw diagram:
      const diagramColumns = columns.filter((column) => !column.isConstant());
      diagramColumns.forEach(async (column, index) => {
        await setStatus(`Drawing points ${100 * index / diagramColumns.length}%. Drawing ${column.title}...`);
        addDiagram(domain, column, data);
      });

      await setStatus(``);
    };
    reader.readAsText(files[0]);
  }
});
