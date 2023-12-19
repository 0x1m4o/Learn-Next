import { client } from "@/app/services/core/network/api_client";
import { useMutation } from "@tanstack/react-query";

const loginUserDataClient = async (body: any) =>
  client.post("/api/login", body).then((response) => {
    console.log(response);
    return response.data;
  });

export const LoginUserData = ({ onSuccess, onError }: any) => {
  return useMutation({
    mutationFn: (body) => loginUserDataClient(body),
    mutationKey: ["loginUserData"],
    onSuccess: onSuccess,
    onError: onError,
  });
};
