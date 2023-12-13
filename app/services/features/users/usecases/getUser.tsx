import { axiosCache } from "@/app/services/core/network/ApiClient";
import { Users } from "@/app/services/features/users/types/UsersInterface";
import { useQuery } from "@tanstack/react-query";

const clientGetSingleUser = async (params: string) =>
  axiosCache.get("/users/" + params).then((response) => response.data);

export const useGetSingleUser = (params: string) => {
  return useQuery<Users>({
    queryKey: ["userdetail", params],
    queryFn: () => clientGetSingleUser(params),
  });
};
