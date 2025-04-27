import { TUser } from "@/types/user";
import {supabase} from "@/lib/supabase";
import { uploadFile } from "./upload-file";
import { RegistrationFormValues } from "@/schemas/userSchema";

const createUser = async (user: RegistrationFormValues) => {
    try {
        // Création de l'utilisateur via Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
        });

        if (authError) {
            console.error('Erreur lors de la création de l\'authentification :', authError.message);
            throw new Error(`Erreur Auth: ${authError.message}`);
        }

        if (!authData?.user) {
            throw new Error('Création utilisateur échouée sans erreur explicite.');
        }

        const avatar_name = "avatar_" +user.nom + "_" + Date.now().toString()
        console.log("Le nom du fichier est : " + avatar_name) 

        // Insertion de l'avatar
        let imageUrl = "";

        if (user.avatar_url) {
            imageUrl = await uploadFile(user.avatar_url, "avatars", "profiles");
        }

        // Insertion du profil seulement si l'auth a réussi
        const { error: insertError } = await supabase.from('profiles').insert([{
            ...user,
            nom: user.nom,
            prenom: user.prenom,
            telephone: user.telephone,
            email: user.email,
            pays: user.pays,
            ville: user.ville,
            facebookUrl: user.facebookUrl,
            instagramUrl: user.instagramUrl,
            snapchatUrl: user.snapchatUrl,
            job: user.job,
            description: user.description,
            password: user.password,
            avatar_url: imageUrl,
            user_id: authData.user.id, // Associer l'id auth au profil
        }]);


        if (insertError) {
            console.error('Erreur lors de l\'insertion dans "profiles" :', insertError.message);
            throw new Error(`Erreur Insertion: ${insertError.message}`);
        }

        return { success: true, userId: authData.user.id };
    } catch (err) {
        console.error('Erreur dans createUser:', err);
        return { success: false, error: (err as Error).message };
    }
};

const fecthUsers = async () => {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) throw new Error(error.message);
    return data;
}

const fecthUsersById = async (userId: string) => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (error) throw new Error(error.message);
    return data;
}


export {
    createUser,
    fecthUsers,
    fecthUsersById
}