import type { User } from "../../types";
import styles from "./UsersContainer.module.scss";

interface UsersContainerProps {
  users: User[];
}

function UsersContainer({ users }: UsersContainerProps) {
  return (
    <div className={styles["users-container"]}>
      {users.map((user) => (
        <div key={user.login} className={styles["user-card"]}>
          <a
            href={user.html_url}
            target="_blank"
            className={styles["profile-header"]}
          >
            <img
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              className={styles["avatar"]}
            />
            <div className={styles["username"]}>
              <strong>{user.login}</strong>
            </div>
          </a>
          <ul className={styles["user-details"]}>
            <li>
              <strong>Type:</strong> {user.type}
            </li>
            <li>
              <strong>Score:</strong> {user.score}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default UsersContainer;
