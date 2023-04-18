import { FormButtonRow } from "../button";

export const PaginationButtons = ({ onPrev, onNext, curPage, lastPage }) => (
  <FormButtonRow>
    <a href="/#" role="button" onClick={onPrev} disabled={curPage === 1}>
      <span className="material-icons">arrow_back</span>
    </a>
    <center>{`Page ${curPage} of ${lastPage} `}</center>
    <a href="/#" role="button" onClick={onNext} disabled={curPage === lastPage}>
      <span className="material-icons">arrow_forward_ios</span>
    </a>
  </FormButtonRow>
);
