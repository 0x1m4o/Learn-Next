import { client } from "@/app/services/core/network/api_client";
import { useMutation } from "@tanstack/react-query";

const postUserDataClient = async (body: any) =>
  client.post("/api/register", body).then((response) => {
    console.log(response);
    return response.data;
  });

export const PostUserData = ({ onSuccess, onError }: any) => {
  return useMutation({
    mutationFn: (body) => postUserDataClient(body),
    mutationKey: ["postUserData"],
    onSuccess: onSuccess,
    onError: onError,
  });
};
