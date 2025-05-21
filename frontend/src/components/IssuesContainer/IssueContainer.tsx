import type { Issue } from "../../types";
import styles from "./IssuesContainer.module.scss";

interface IssuesContainerProps {
  issues: Issue[];
}

function IssuesContainer({ issues }: IssuesContainerProps) {
  return (
    <div className={styles["issues-container"]}>
      {issues.map((issue: Issue) => (
        <div key={issue.id} className={styles["issue-card"]}>
          <div className={styles["header"]}>
            <a
              href={issue.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles["title"]}
            >
              #{issue.number} - {issue.title}
            </a>
            <span className={styles["state"]}>{issue.state}</span>
          </div>

          <div className={styles["body"]}>
            {issue.body?.slice(0, 150) || "No description."}
          </div>

          {issue.user && (
            <div className={styles["footer"]}>
              <a
                href={issue.user.html_url}
                target="_blank"
                className={styles["user"]}
              >
                <img
                  src={issue.user.avatar_url}
                  alt={issue.user.login}
                  className={styles["avatar"]}
                />
                {issue.user.login}
              </a>
              <span className={styles["date"]}>
                Created: {new Date(issue.created_at).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default IssuesContainer;
