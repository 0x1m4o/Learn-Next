import { axiosCache } from "@/app/clients/ApiClient";
import { Users } from "@/app/types/Users";
import { useQuery } from "@tanstack/react-query";

const clientGetUsers = () =>
axiosCache.get("/users").then((response) => response.data);

export const getAllUsers = () => {
  return useQuery<Users[]>({
    queryKey: ["users"],
    queryFn: clientGetUsers,
  });
};
