javascript: (() => {
  const selector = '.statsTbl6';
  const tables = document.querySelectorAll(selector);
  if (tables.length < 2) return alert('対象のテーブルが見つかりません。');
  const table = tables[1];

  let csvContent = `"","HOME成功率","HOME総数","AWAY総数","AWAY成功率",\n`;

  const extractText = (node) => {
    let text = node.innerText.trim().replace(/"/g, '""');
    text = text.replace(/^-$/, '');
    text = text.replace(/\(\)/g, '');
    text = text.replace(/-(?!\d)/g, '');
    return text;
  };

  const categories = table.querySelectorAll('tr.tr3');
  categories.forEach((cat) => {
    const categoryName = extractText(cat.querySelector('td'));
    const dataRows = cat.nextElementSibling.querySelectorAll('td:not(.dsktp)');
    if (dataRows.length === 0) return;

    let rowData = `"${categoryName}",`;
    dataRows.forEach((td, index) => {
      rowData += `"${extractText(td)}"`;
      if (index < dataRows.length - 1) rowData += ',';
    });
    csvContent += `${rowData}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'table_data.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
})();
