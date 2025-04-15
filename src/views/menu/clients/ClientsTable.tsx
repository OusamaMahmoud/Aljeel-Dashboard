import { useNavigate } from "react-router-dom";
import { Clients } from "../../api/clientsApi";

interface ProjectsTableProps {
  headers: string[];
  data: Clients[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const ClientsTable = ({
  data,
  headers,
  onDelete,
  onEdit,
}: ProjectsTableProps) => {
  const navigate = useNavigate();

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
            data.map((client: Clients) => (
              <tr
                onClick={() => navigate("client-preview", { state: client.id })}
                key={client.id}
              >
                <td>{client.id}</td>
                <td>
                  <img
                    src={client.logo}
                    className="object-contain w-16 h-16"
                    alt="logo"
                  />
                </td>
                <td className="flex items-center gap-3 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(client.id);
                    }}
                    className="btn btn-xs bg-bruColorLight2 "
                  >
                    Delete
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(client.id);
                    }}
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

export default ClientsTable;
