import { Packages } from "../../api/packagesApi";

interface ProjectsTableProps {
  headers: string[];
  lang: "en" | "ar";
  data: Packages[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const PackagesTable = ({
  data,
  headers,
  lang,
  onDelete,
  onEdit,
}: ProjectsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((project: Packages) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.title[lang]}</td>
                <td className="flex items-center gap-3">
                  <button
                    onClick={() => onDelete(project.id)}
                    className="btn btn-xs bg-bruColorLight2 "
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onEdit(project.id)}
                    className="btn btn-xs bg-bruColorLight3 "
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length + 1}>No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PackagesTable;
