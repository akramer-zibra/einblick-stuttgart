import { toast } from "bulma-toast";

export class ErrorFeedback {

    /**
     * Method shows error toast
     * @param message 
     */
    static showErrorToast(message: string) {

        // Create bulma toast with error message
        toast({
            message: `${message}`,
            type: "is-warning",
            position: "center",
            closeOnClick: true,
            pauseOnHover: true,
            opacity: 0.8
          });
    }
}