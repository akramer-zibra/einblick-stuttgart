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
            duration: 3000,
            type: "is-danger",
            position: "center",
            dismissible: true,
            closeOnClick: true,
            pauseOnHover: true,
            opacity: 0.9
          });
    }
}