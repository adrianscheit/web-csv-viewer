import { Column } from "./column";
import { addConstant, addDiagram, addSummaryDiagram, setStatus } from "./dom";

const parseFile = async (fileContent: string): Promise<void> => {
  await setStatus(`Parsing file...`);

  const fields: string[][] = fileContent
    .split(/\r\n|\n\r|\n|\r/)
    .map((line) => line.split(','))
    .filter((line) => line.length);
  const columns: Column[] = fields.shift()!.map((title, index) => new Column(title, index));
  console.log(columns);
  const data: number[][] = fields.map((line) => line.map((field) => +parseFloat(field)));

  await setStatus(`There are ${fields.length} lines and ${columns.length} columns in the loaded file. Analysing file data...`);

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
  for (let i = 0; i < diagramColumns.length; ++i) {
    await setStatus(`Drawing points ${Math.round(10 + 60 * i / diagramColumns.length)}%. Drawing ${diagramColumns[i].title}...`);
    addDiagram(domain, diagramColumns[i], data);
  }
  await setStatus(`Drawind summary diagram...`);
  addSummaryDiagram(domain, diagramColumns.slice(1), data);

  await setStatus(`Done!`);
};

(async () => {
  const params: { [key: string]: string } = Object.fromEntries(
    window.location.search
      .substring(1)
      .split('&')
      .map((keyValue) => keyValue.split('=').map((it) => window.decodeURIComponent(it)) as ([string, string]))
  );

  const fetchUrl = params['fetch'];
  if (fetchUrl) {
    (document.getElementsByName('fetch')[0] as HTMLInputElement).value = fetchUrl;
    await setStatus(`fetching ${fetchUrl}`);
    fetch(fetchUrl)
      .then((response: Response) => response.text().then((content: string) => parseFile(content).catch((reason) => setStatus(`fetch text failed: ${reason}`))))
      .catch((reason) => setStatus(`fetching failed: ${reason}`));
  }
})();

document.querySelector('input[type=file]')!.addEventListener('input', async (event) => {
  const files: FileList = (event.target as any).files;
  if (files.length === 1) {
    setStatus(`Reading a text file of ${files[0].size}B...`);
    const reader = new FileReader();
    reader.onload = () => {
      parseFile(reader.result as string);
    };
    reader.readAsText(files[0]);
  }
});
