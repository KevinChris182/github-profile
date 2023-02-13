export interface Project {
  name: string;
  html_url: string;
  description: string;
  default_branch: string;
  owner: {
    login: string;
  };
}
