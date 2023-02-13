import { create } from "zustand";
import { Project } from "../interfaces";

interface MapState {
  username: string;
  projectList: Project[];
  setUsername: (username: string) => void;
  setProjectList: (list: Project[]) => void;
}

const useUsernameStore = create<MapState>()((set) => ({
  username: "",
  projectList: [],
  setUsername: (username) => set(() => ({ username })),
  setProjectList: (list) => set(() => ({ projectList: list })),
}));

export default useUsernameStore;
