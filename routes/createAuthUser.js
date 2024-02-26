
module.exports.createAuthUser = async function(supabase, email, password) {
    try {
        // const email = userData['email'];
        // const password = userData['password'];
        const {data, error} = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) throw error;
    
        return data;
    } catch (error) {
        console.log(error);
        throw(error);
    }
};

// module.exports = createAuthUser();
