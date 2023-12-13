import { axiosCache } from "@/app/services/core/network/ApiClient";
import { Users } from "@/app/services/features/users/types/UsersInterface";
import { useQuery } from "@tanstack/react-query";

const clientGetUsers = () =>
  axiosCache.get("/users").then((response) => response.data);

export const getAllUsers = () => {
  return useQuery<Users[]>({
    queryKey: ["users"],
    queryFn: clientGetUsers,
  });
};
