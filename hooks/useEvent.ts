import { createEvent, fetchEvent } from "@/services/event-service";
import { IEvent } from "@/types/event";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useEvent = () => {
    return useQuery<IEvent[]>({
        queryKey: ['events'],
        queryFn: fetchEvent
    });
};

const useCreateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createEvent,
        onMutate: () => {
            const toastId = toast.loading("Enregistrement en cours...");
            return { toastId };
        },
        onSuccess: (_, __, context) => {
            toast.dismiss(context?.toastId);
            toast.success("Evenement créé avec succès 🎉");
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
        onError: (error, _, context) => {
            toast.dismiss(context?.toastId);
            toast.error("Erreur lors de la création de l'évènement: " + error.message);
        }
    });
};

export {
    useEvent,
    useCreateEvent
}