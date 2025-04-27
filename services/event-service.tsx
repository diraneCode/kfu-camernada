import { supabase } from "@/lib/supabase";
import { eventFormSchema } from "@/schemas/eventSchema"
import { uploadFile } from "./upload-file";
import { z } from "zod";

const fetchEvent = async () => {
    const { data, error } = await supabase.from('events').select('*');
    if (error) throw new Error(error.message);
    return data;
}

async function createEvent(event: z.infer<typeof eventFormSchema>) {
    try {
        let imageUrl = "";

        if (event.image) {
            imageUrl = await uploadFile(event.image, "avatars", "event");
        }

        const { data, error } = await supabase.from("events").insert([
            {
                ...event,
                image: imageUrl
            },
        ]);

        if (error) {
            console.error("Erreur lors de la création de l'évènement :", error);
            throw new Error(error.message);
        }

        return data;
    } catch (err) {
        console.error("Erreur dans createEvent :", err);
        throw new Error("Impossible de créer l'évènement. Veuillez réessayer.");
    }
}


export {
    fetchEvent,
    createEvent
}