import { useMemo, useState, useEffect } from "react";
import { FinancialRecord, useFinancialRecords } from "../../context/financial-record-context";
import { useTable, Column, CellProps } from "react-table";

interface EditableCellProps extends CellProps<FinancialRecord> {
  updateRecord: (rowIndex: number, columnId: string, value: any) => void;
  editable: boolean;
}

const EditableCell: React.FC<EditableCellProps> = ({
  value: initialValue,
  row,
  column,
  updateRecord,
  editable,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    setIsEditing(false);
    updateRecord(row.index, column.id, value);
  };

  return (
    <div
      onClick={() => editable && setIsEditing(true)}
      style={{ cursor: editable ? "pointer" : "default" }}
    >
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          onBlur={onBlur}
          style={{ width: "100%" }}
        />
      ) : typeof value === "string" ? (
        value
      ) : (
        value.toString()
      )}
    </div>
  );
};

function FinancialRecordList() {
  const { records, updateRecord, deleteRecord } = useFinancialRecords();
  const [allRecords, setAllRecords] = useState<FinancialRecord[]>([]);
  const [displayedRecords, setDisplayedRecords] = useState<FinancialRecord[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Load all records initially
  useEffect(() => {
    setAllRecords(records); // Store all records
    setDisplayedRecords(records); // Display all records initially
  }, [records]);

  // Filter records by date range
  const filterRecordsByDate = () => {
    if (!startDate || !endDate) {
      setDisplayedRecords(allRecords); // Show all records if no filter
      return;
    }

    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(23, 59, 59, 999); // Include the entire end date

    const filtered = allRecords.filter((record) => {
      const recordDate = new Date(record.date).getTime();
      return recordDate >= start && recordDate <= end;
    });
    
    setDisplayedRecords(filtered); // Update displayed records with filtered data
  };

  // Call filter function when dates change
  useEffect(() => {
    filterRecordsByDate();
  }, [startDate, endDate, allRecords]);

  const updateCellRecord = (rowIndex: number, columnId: string, value: any) => {
    const id = displayedRecords[rowIndex]?._id;
    updateRecord(id ?? "", { ...displayedRecords[rowIndex], [columnId]: value });
  };

  const columns: Array<Column<FinancialRecord>> = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
        Cell: (props) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: (props) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        ),
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: (props) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        ),
      },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
        Cell: (props) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        ),
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: (props) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={false} />
        ),
      },
      {
        Header: "Delete",
        id: "delete",
        Cell: ({ row }) => (
          <button
            onClick={() => deleteRecord(row.original._id ?? "")}
            className="p-2 rounded-md text-white bg-red-400 hover:bg-red-600"
          >
            Delete
          </button>
        ),
      },
    ],
    [displayedRecords]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: displayedRecords, // Use filtered records for table data
  });

  return (
    <div className="p-4">
      {/* Date Filter Controls */}
      <div className="mb-4 flex space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Records Table */}
      <div>
        <table
          {...getTableProps()}
          className="border-collapse border-spacing-2 border border-gray-300 w-full"
        >
          <thead className="text-xl bg-violet-200">
            {headerGroups.map((hg) => (
              <tr {...hg.getHeaderGroupProps()} className="border-b border-gray-300">
                {hg.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="border border-gray-300 p-2 text-left">
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border-b border-gray-300">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="border border-gray-300 p-2">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FinancialRecordList;
