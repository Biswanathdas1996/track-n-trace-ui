import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TransctionModal from "../components/shared/TransctionModal";
import { useParams } from "react-router-dom";
import PublishArr from "../Admin/PublishArt";

const Mint = () => {
  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(null);
  const { token } = useParams();
  let history = useNavigate();

  const modalClose = () => {
    setStart(false);
    setResponse(null);
    history("/tokens");
  };
  return (
    <>
      {start && <TransctionModal response={response} modalClose={modalClose} />}
      <PublishArr token={token} />
    </>
  );
};
export default Mint;
