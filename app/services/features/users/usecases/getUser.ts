import { client } from "@/app/services/core/network/api_client";
import { Users } from "@/app/services/features/users/types/UsersInterface";
import { useQuery } from "@tanstack/react-query";

const clientGetUser = () =>
  client.get("/api/user").then((response) => response.data.data);

export const UseGetUser = () => {
  return useQuery<Users>({
    queryKey: ["userData"],
    queryFn: clientGetUser,
  });
};
