import { client } from "@/app/services/core/network/api_client";
import { useMutation } from "@tanstack/react-query";

const editUserDataClient = async (body: any, username: string) => {
  console.log(username);

  return client.put(`/api/user`, body).then((response) => {
    console.log(response);
    return response.data;
  });
};

export const EditUserData = ({ onSuccess, onError, username }: any) => {
  return useMutation({
    mutationFn: (body) => editUserDataClient(body, username),
    mutationKey: ["editUserData"],
    onSuccess: onSuccess,
    onError: onError,
  });
};
