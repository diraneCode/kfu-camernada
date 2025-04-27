import { createUser, fecthUsers, fecthUsersById } from "@/services/userService";
import { TUser } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useProfiles = () => {
    return useQuery<TUser[]>({
        queryKey: ['users'],
        queryFn: fecthUsers
    });
};

const useProfileByID = (userID: string) => {
    return useQuery<TUser>({
        queryKey: ['user', userID],
        queryFn: () => fecthUsersById(userID),
        enabled: !!userID
    });
};

const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createUser,
        onMutate: () => {
            const toastId = toast.loading("Enregistrement en cours...");
            return { toastId };
        },
        onSuccess: (_, __, context) => {
            toast.dismiss(context?.toastId);
            toast.success("Utilisateur créé avec succès 🎉");
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error, _, context) => {
            toast.dismiss(context?.toastId);
            toast.error("Erreur lors de l'inscription : " + error.message);
        }
    });
};


export {
    useCreateUser,
    useProfiles,
    useProfileByID
};
