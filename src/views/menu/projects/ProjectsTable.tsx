import { Projects } from "../../api/projectsApi";

interface ProjectsTableProps {
  headers: string[];
  lang: "en" | "ar";
  data: Projects[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const ProjectsTable = ({
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
            data.map((project: Projects) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.title[lang]}</td>
                <td>{project.type}</td>
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

export default ProjectsTable;
