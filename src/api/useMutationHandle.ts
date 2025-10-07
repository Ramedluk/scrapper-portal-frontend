// import { useTranslations } from "next-intl";

import { useQueryClient } from "@tanstack/react-query";

import { updateAuthHeader } from "@/api/auth/utils";
import { useVolatileStore } from "@/store";

interface IUseHandleSuccessProps {
  invalidateQueryKeys?: string[];
  message?: string;
}

export const useMutationHandlers = () => {
  // const { t, getErrorMessage } = useTranslations();
  // const t = useTranslations();
  const setAccessToken = useVolatileStore.getState().setAccessToken;
  const queryClient = useQueryClient();

  // const handleError = (error: TError) => {
  // const message = getErrorMessage(error?.response?.data?.error);
  // notificationService.show({
  //   type: NOTIF_TYPES.ERROR,
  //   title: t("notifications.errorTitle"),
  //   message,
  // });
  // };

  const handleSuccess = ({ invalidateQueryKeys, message }: IUseHandleSuccessProps) => {
    if (invalidateQueryKeys) {
      invalidateQueryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      });
    }

    if (message) {
      // notificationService.show({
      //   type: NOTIF_TYPES.SUCCESS,
      //   title: t("notifications.successTitle"),
      //   message: t(message),
      // });
    }
  };

  const updateAccessToken = (accessToken: string) => {
    setAccessToken(accessToken);
    updateAuthHeader(accessToken);
  };

  return {
    //handleError,
    handleSuccess,
    updateAccessToken,
  };
};
