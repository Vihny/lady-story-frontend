import './table.scss';
  
export interface Coluna {
    header: string;
    accessor: string;
}

interface TableProps {
    columns: Coluna[];
    data: Record<string, string | number>[];
  }
  
const Table = ({ columns, data }: TableProps) => {
  return (
    <div className="container-table">
        <table>
            <thead>
                <tr>
                {columns.map((col) => (
                    <th key={col.accessor}>{col.header}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                <tr key={row.id}>
                    {columns.map((col) => (
                    <td key={col.accessor}>{row[col.accessor]}</td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default Table;
