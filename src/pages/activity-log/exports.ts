import { typeActivityLog } from '@/types/types';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { useState } from 'react';

export const useExportLogs = () => {
  const [exportModal, setExportModal] = useState(false);
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);

  const reset = () => {
    setExportModal(false);
    setFromDate(undefined);
    setToDate(undefined);
  };

  const exportCSV = (
    data: typeActivityLog[],
    start: Date | undefined,
    end: Date | undefined,
  ) => {
    const periodInfo = `Logs from ${dayjs(start).format('DD-MM-YYYY')} to ${dayjs(end).format('DD-MM-YYYY')}\n`;
    const csvData = data
      .map((row) => {
        return {
          created_at: dayjs(row.created_at).format('DD-MM-YYYY'),
          user_name: row.admin.user_name,
          role: row.admin.role,
          activity_type: row.activity_type,
          description: row.description,
          ip_address: row.ip_address,
        };
      })
      .map((row) => Object.values(row).join(','))
      .join('\n');
    const csvHeader =
      Object.keys(
        data.map((header) => {
          return {
            Date: header.created_at,
            Name: header.admin.user_name,
            Role: header.admin.role,
            Activity: header.activity_type,
            Description: header.description,
            Ip_Address: header.ip_address,
          };
        })[0],
      ).join(',') + '\n';

    const csvContent = periodInfo + csvHeader + csvData;

    const blob = new Blob([csvContent], { type: 'text/csv' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    const formattedStart = dayjs(start).format('DD-MM-YYYY');
    const formattedEnd = dayjs(end).format('DD-MM-YYYY');
    link.download = `logs_${formattedStart}_to_${formattedEnd}.csv`;
    reset();
    link.click();
  };

  const exportJSON = (
    data: typeActivityLog[],
    start: Date | undefined,
    end: Date | undefined,
  ) => {
    const jsonContent = JSON.stringify(data, null, 2);

    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const formattedStart = dayjs(start).format('DD-MM-YYYY');
    const formattedEnd = dayjs(end).format('DD-MM-YYYY');
    link.download = `logs_${formattedStart}_to_${formattedEnd}.json`;
    reset();
    link.click();
  };

  const exportPDF = (
    data: typeActivityLog[],
    start: Date | undefined,
    end: Date | undefined,
  ) => {
    const doc = new jsPDF('landscape');
    const styledStart = dayjs(start).format('Do MMM YYYY');
    const styledEnd = dayjs(end).format('Do MMM YYYY');

    // Table headers
    const headers = [
      'Time Stamp',
      'User',
      'Role',
      'Activity Type',
      'Description',
      'IP Address',
    ];

    // Prepare data for the table
    const tableData = data.map((log) => [
      dayjs(log.created_at).format('YYYY-MM-DD hh:mma'),
      log.admin.user_name,
      log.admin.role,
      log.activity_type,
      log.description,
      log.ip_address,
    ]);

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`Logs from ${styledStart} to ${styledEnd}`, 150, 20, {
      align: 'center',
    });

    const textWidth = doc.getTextWidth(
      `Logs from ${styledStart} to ${styledEnd}`,
    );
    doc.line(150 - textWidth / 2, 22, 150 + textWidth / 2, 22);

    // Add the table using autoTable plugin
    autoTable(doc, {
      head: [headers],
      body: tableData,
      startY: 30, // Start below the title
      margin: { horizontal: 10 }, // Margin for the table
      theme: 'striped', // Optional: adds a striped effect to rows
    });

    const formattedStart = dayjs(start).format('DD-MM-YYYY');
    const formattedEnd = dayjs(end).format('DD-MM-YYYY');
    reset();
    doc.save(`Logs_${formattedStart}_to_${formattedEnd}.pdf`);
  };

  const exportToPNG = (
    dataArray: typeActivityLog[],
    start: Date | undefined,
    end: Date | undefined,
  ) => {
    // Create a hidden container to render the table
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '-9999px';
    container.style.width = '100%';
    container.style.padding = '20px';
    document.body.appendChild(container); // Add container to the DOM

    const styledStart = dayjs(start).format('Do MMM YYYY');
    const styledEnd = dayjs(end).format('Do MMM YYYY');

    const titleElement = document.createElement('h2');
    titleElement.style.textAlign = 'center';
    titleElement.style.marginBottom = '15px';
    titleElement.style.color = '#1C1C1E';
    titleElement.style.fontWeight = 'bold';
    titleElement.textContent = `Logs from ${styledStart} to ${styledEnd}`;
    container.appendChild(titleElement);

    // Create an HTML table to display the data
    const table = document.createElement('table');
    table.style.border = '1px solid black';
    table.style.borderCollapse = 'collapse';
    table.style.width = '100%';
    table.style.margin = '0 auto';
    table.style.wordBreak = 'break-word';

    const headers = [
      'Time Stamp',
      'User',
      'Role',
      'Activity Type',
      'Description',
      'Ip Address',
    ];
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    headers.forEach((header) => {
      const th = document.createElement('th');
      th.style.border = '1px solid black';
      th.style.padding = '6px';
      th.style.textAlign = 'center';
      th.style.color = '#1C1C1E';
      th.style.maxWidth = '200px';
      th.textContent = header;
      headerRow.appendChild(th);
    });

    // Generate table rows from data
    const tbody = document.createElement('tbody');
    dataArray.forEach((row) => {
      const tr = tbody.insertRow();
      const cells = [
        dayjs(row.created_at).format('YYYY-MM-DD hh:mma'),
        row.admin.user_name,
        row.admin.role,
        row.activity_type,
        row.description,
        row.ip_address,
      ];
      cells.forEach((cellData, index) => {
        const td = tr.insertCell();
        td.style.border = '1px solid black';
        td.style.padding = '6px';
        td.style.color = 'black';
        td.style.maxWidth = index === 5 ? '150px' : 'auto';
        td.style.wordBreak = 'break-word';
        td.textContent = cellData;
      });
    });

    table.appendChild(tbody);
    container.appendChild(table); // Append table to the hidden container

    // Use html2canvas to capture the table
    html2canvas(container).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      const formattedStart = dayjs(start).format('DD-MM-YYYY');
      const formattedEnd = dayjs(end).format('DD-MM-YYYY');
      link.download = `Logs_${formattedStart}_to_${formattedEnd}.png`;
      reset();
      link.click();

      // Clean up after download
      document.body.removeChild(container);
    });
  };

  const handleExport = (
    type: string,
    data: typeActivityLog[],
    startDate: Date | undefined,
    endDate: Date | undefined,
  ) => {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    if (start) {
      start.setHours(0, 0, 0, 0);
    }
    if (end) {
      end.setHours(23, 59, 59, 999);
    }

    const filteredData = data.filter((row) => {
      const rowDate = new Date(row.created_at);
      return start && rowDate >= start && end && rowDate <= end;
    });

    if (filteredData.length === 0) {
      toast.warning('No logs available for the selected date range.');
      return;
    }

    if (type === 'csv') {
      exportCSV(filteredData, start, end);
    } else if (type === 'json') {
      exportJSON(filteredData, start, end);
    } else if (type === 'pdf') {
      exportPDF(filteredData, start, end);
    } else if (type === 'png') {
      exportToPNG(filteredData, start, end);
    }
  };

  return {
    handleExport,
    exportModal,
    setExportModal,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
  };
};
