import React, { useRef, useEffect } from 'react';

const DataPanel = ({
  data,
  selectedEarthquakeId,
  onRowHover,
  onRowClick,
}) => {
  const tableRef = useRef(null);

  // Scroll to selected row
  useEffect(() => {
    if (selectedEarthquakeId && tableRef.current) {
      const selectedRow = tableRef.current.querySelector(`[data-id="${selectedEarthquakeId}"]`);
      if (selectedRow) {
        selectedRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedEarthquakeId]);

  if (data.length === 0) {
    return <div className="p-4 text-center text-gray-500">No data available.</div>;
  }

  // Get headers from the first data object
  const headers = Object.keys(data[0]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-4">Earthquake Data Table</h2>
      <div className="overflow-auto flex-grow rounded-lg border border-gray-200">
        <table ref={tableRef} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                 {header.charAt(0).toUpperCase() + header.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr
                key={row.id}
                data-id={row.id} 
                className={`
                  ${selectedEarthquakeId === row.id ? 'bg-blue-100 border-l-4 border-blue-500' : 'hover:bg-gray-50'}
                  cursor-pointer transition-colors duration-150 ease-in-out
                `}
                onMouseEnter={() => onRowHover(row.id)}
                onMouseLeave={() => onRowHover(null)}
                onClick={() => onRowClick(row.id)}
              >
                {headers.map((header) => (
                  <td key={`${row.id}-${header}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {
                      header === 'time' || header === 'updated'
                        ? new Date(row[header]).toLocaleString()
                        : typeof row[header] === 'number'
                          ? row[header].toFixed(row[header] % 1 === 0 ? 0 : 4) // Format numbers
                          : row[header]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataPanel;