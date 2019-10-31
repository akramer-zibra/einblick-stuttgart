import { toast } from "bulma-toast";

export class ToastFeedback {

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

    /**
     * Message shows a warning toast
     * @param message 
     */
    static showWarningToast(message: string) {
        
        // Create bulma toast with error message
        toast({
            message: `${message}`,
            duration: 3000,
            type: "is-warning",
            position: "center",
            dismissible: true,
            closeOnClick: true,
            pauseOnHover: true,
            opacity: 0.9
          });
    } 
}