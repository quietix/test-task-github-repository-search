export type SearchType = "users" | "repositories" | "issues";

export type User = {
  login: string;
  html_url: string;
  avatar_url: string;
  type: string;
  score: number;
  url: string;
};

export type Repository = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
};

export interface Issue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  body: string;
  state: string;
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}
