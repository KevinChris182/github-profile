import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const Readme: React.FC<{
  match: {
    params: { owner_name: string; project_name: string; branch_name: string };
  };
}> = ({ match }) => {
  const [readme, setReadme] = useState<string>();

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const result = await axios.get(
          `https://raw.githubusercontent.com/${match.params.owner_name}/${match.params.project_name}/${match.params.branch_name}/README.md`
        );
        setReadme(result.data);
      } catch (err) {
        // do nothing
      }
    };

    fetchReadme();
  }, [
    match.params.project_name,
    match.params.owner_name,
    match.params.branch_name,
  ]);

  return (
    <div className="readme-container">
      {readme ? (
        <ReactMarkdown>{readme}</ReactMarkdown>
      ) : (
        <ReactMarkdown>{"No Readme Found."}</ReactMarkdown>
      )}
    </div>
  );
};

export default Readme;
