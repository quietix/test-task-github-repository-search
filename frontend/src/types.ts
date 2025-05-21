export type SearchType = "users" | "repositories" | "issues";

type BaseUser = {
  readonly login: string;
  readonly html_url: string;
  readonly avatar_url: string;
};

export type User = BaseUser & {
  readonly type: string;
  readonly score: number;
  readonly url: string;
};

export type Repository = {
  readonly id: number;
  readonly name: string;
  readonly full_name: string;
  readonly html_url: string;
  readonly owner: BaseUser;
  readonly stargazers_count: number;
  readonly forks_count: number;
  readonly open_issues_count: number;
  readonly language: string | null;
};

export interface Issue {
  readonly id: number;
  readonly number: number;
  readonly title: string;
  readonly html_url: string;
  readonly body: string;
  readonly state: string;
  readonly created_at: string;
  readonly updated_at: string;
  readonly user: BaseUser;
}
