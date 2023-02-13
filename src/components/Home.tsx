import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import useUsernameStore from "../stores/UsernameStore";

const Home: React.FC = () => {
  const { username, projectList, setUsername, setProjectList } =
    useUsernameStore();

  const debouncedUsername = useDebounce(username, 500);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://api.github.com/users/${debouncedUsername}/repos`
      );
      setProjectList(result.data);
    };

    if (debouncedUsername) {
      fetchData();
    }
  }, [debouncedUsername, setProjectList]);

  return (
    <div className="main-container">
      <img
        width="100"
        height="100"
        alt="GitHub Logomark"
        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      ></img>
      <h1 className="title">GitHub Project Explorer</h1>
      <div className="main-input">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {projectList.length > 0 && (
        <ul className="list-none">
          {projectList.map((project) => (
            <div key={project.name} className="list-container">
              <li className="project-list">
                <h2 className="project-title">
                  <a
                    href={project.html_url}
                    target="_blank"
                    className="title-link"
                    rel="noreferrer"
                  >
                    {project.name}
                  </a>
                </h2>
                <p className="project-description">{project.description}</p>
                <Link
                  to={`/readme/${project.owner.login}/${project.name}/${project.default_branch}`}
                  className="readme-link"
                >
                  View README
                </Link>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
