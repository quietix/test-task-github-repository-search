import type { Repository } from "../../types";
import styles from "./ReposContainer.module.scss";

interface ReposContainerProps {
  repos: Repository[];
}

function RepoContainer({ repos }: ReposContainerProps) {
  return (
    <div className={styles["repos-container"]}>
      {repos.map((repo: Repository) => (
        <div key={repo.id} className={styles["repo-card"]}>
          {repo.owner && (
            <a
              href={repo.html_url}
              target="_blank"
              className={styles["repo-header"]}
            >
              <div className={styles["owner-avatar"]}>
                <img
                  src={repo.owner.avatar_url}
                  alt={`${repo.owner.login}'s avatar`}
                  className={styles["avatar"]}
                />
              </div>
              <div className={styles["repo-info"]}>
                <h3 className={styles["repo-name"]}>{repo.name}</h3>
                <p className={styles["owner-login"]}>by {repo.owner.login}</p>
              </div>
            </a>
          )}
          <ul className={styles["repo-stats"]}>
            <li className={styles["stars"]}>Stars: {repo.stargazers_count}</li>
            <li className={styles["forks"]}>Forks: {repo.forks_count}</li>
            <li className={styles["issues"]}>
              Issues: {repo.open_issues_count}
            </li>
            <li className={styles["languages"]}>
              Language: {repo.language ?? "N/A"}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default RepoContainer;
