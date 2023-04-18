import { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import { PAGE_SIZE } from "../../helpers";
import { FormButtonRow, Search } from "../shared";
import { formatShortDate } from "../../helpers";

const Row = ({ trainee, onEdit, onDelete }) => {
  const { user } = useUser();
  return (
    <tr>
      <td>{trainee.badge}</td>
      <td>
        {trainee.last_name}, {trainee.first_name}
      </td>
      <td>{formatShortDate(trainee.birth_date)}</td>
      <td>{trainee.company_name}</td>
      <td>{trainee.nationality_name}</td>
      <td>
        <button
          type="button"
          onClick={() => onEdit(trainee)}
          disabled={![1].includes(user.role)}
        >
          Edit
        </button>
      </td>
      {/* <td>
        <button
          type="button"
          className="error"
          disabled={trainee.status === 1}
          onClick={() => onDelete(trainee)}
        >
          Delete
        </button>
      </td> */}
    </tr>
  );
};

export const Trainees = ({ trainees, onEdit, onDelete }) => {
  const [pagedTrainees, setPagedTrainees] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [curRow, setCurRow] = useState(0);
  const [search, setSearch] = useState("");

  const handlePrev = (e) => {
    e.preventDefault();
    setCurRow((r) => r - PAGE_SIZE);
    setCurPage((p) => p - 1);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurRow((r) => r + PAGE_SIZE);
    setCurPage((p) => p + 1);
  };

  useEffect(() => {
    const filtered = Array.from(trainees).filter(
      (t) =>
        !search ||
        `${t.last_name}, ${t.first_name}`
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
    );

    const paginated = filtered.slice(curRow, curRow + PAGE_SIZE);

    const lastPage =
      Math.floor(filtered.length / PAGE_SIZE) !== filtered.length / PAGE_SIZE
        ? Math.floor(filtered.length / PAGE_SIZE) + 1
        : filtered.length / PAGE_SIZE;

    setPagedTrainees(paginated);

    setLastPage(lastPage);
  }, [curRow, trainees, search]);

  return (
    <main className="container-fluid">
      <Search onChange={(e) => setSearch(e.target.value)} value={search} />
      <table role="grid">
        <thead>
          <tr>
            <th scope="col">Badge</th>
            <th scope="col">Name</th>
            <th scope="col">Birth date</th>
            <th scope="col">Company</th>
            <th scope="col">Nationality</th>
            <th></th>
          </tr>
        </thead>

        {pagedTrainees.length == 0 && <article>No records found</article>}

        <tbody>
          {pagedTrainees.map((trainee) => (
            <Row
              trainee={trainee}
              key={trainee.id}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>

        {pagedTrainees.length > 0 && (
          <tfoot>
            <tr>
              <td colSpan={9}>
                <FormButtonRow>
                  <a
                    href="#"
                    role="button"
                    onClick={handlePrev}
                    disabled={curPage === 1}
                  >
                    <span className="material-icons">arrow_back</span>
                  </a>
                  <center>{`Page ${curPage} of ${lastPage} `}</center>
                  <a
                    href="#"
                    role="button"
                    onClick={handleNext}
                    disabled={curPage === lastPage}
                  >
                    <span className="material-icons">arrow_forward_ios</span>
                  </a>
                </FormButtonRow>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </main>
  );
};
