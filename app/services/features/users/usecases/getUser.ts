import { axiosCache } from "@/app/services/core/network/api_client";
import { Users } from "@/app/services/features/users/types/UsersInterface";
import { useQuery } from "@tanstack/react-query";

const clientGetSingleUser = async (params: string) =>
  axiosCache.get("/users/" + params).then((response) => response.data);

export const UseGetSingleUser = (params: string) => {
  return useQuery<Users>({
    queryKey: ["userdetail", params],
    queryFn: () => clientGetSingleUser(params),
  });
};
