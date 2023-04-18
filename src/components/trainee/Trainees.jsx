import { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import { PAGE_SIZE } from "../../helpers";
import { PaginationButtons, Search } from "../shared";
import { formatShortDate } from "../../helpers";

const Row = ({ trainee, onEdit }) => {
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
          disabled={user.role !== 1}
        >
          Edit
        </button>
      </td>
      {/* <td>
        <button
          type="button"
          className="error"
          disabled={trainee.status === 1}
          onClick={true}
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
    const text = search.toLocaleLowerCase();

    const filtered = Array.from(trainees).filter(
      (t) =>
        !text ||
        `${t.last_name}, ${t.first_name}`.toLocaleLowerCase().includes(text) ||
        t.badge.toLocaleLowerCase().includes(text)
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

        <tbody>
          {pagedTrainees.length === 0 && (
            <tr>
              <td colSpan={9}>
                <article>No records found</article>
              </td>
            </tr>
          )}

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
                <PaginationButtons
                  onPrev={handlePrev}
                  onNext={handleNext}
                  curPage={curPage}
                  lastPage={lastPage}
                />
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </main>
  );
};
