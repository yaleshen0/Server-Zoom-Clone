// import { supabaseCli } from "@/modules/supabase/init.js";
module.exports.createDbUser=async (supabase, userData) => {
    try {
        const { data, error } = await supabase
        .from('user_account')
        .insert(userData)

        if (error){
            throw error;
        }
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
