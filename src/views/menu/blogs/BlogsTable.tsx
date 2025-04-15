import { useEffect } from "react";
import { Blogs } from "../../api/blogsApi";

interface ProjectsTableProps {
  headers: string[];
  lang: "en" | "ar";
  data: Blogs[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const BlogsTable = ({
  data,
  headers,
  lang,
  onDelete,
  onEdit,
}: ProjectsTableProps) => {
  useEffect(() => {
    console.log("DEBUG=>",data);
  }, [data]);
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
            data.map((team: Blogs) => (
              <tr key={team.id}>
                <td>{team.id}</td>
                <td>{team.title[lang]}</td>
                <td>{team.text[lang]}</td>
                <td className="flex items-center gap-3">
                  <button
                    onClick={() => onDelete(team.id)}
                    className="btn btn-xs bg-bruColorLight2 "
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onEdit(team.id)}
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

export default BlogsTable;
