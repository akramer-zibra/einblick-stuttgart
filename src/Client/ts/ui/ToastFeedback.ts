import { toast } from "bulma-toast";

export class ToastFeedback {

    /**
     * Methode blendet eine Error "Toast" ein 
     * @param message 
     */
    static showErrorToast(message: string) {

        // Erzeuge bulma Toast-Anzeige mit einer Fehlernachricht
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
     * Methode blendet eine Warning "Toast" ein
     * @param message 
     */
    static showWarningToast(message: string) {

        // Erzeuge eine bulma Toast-Anzeige mit einer Warnnachricht
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