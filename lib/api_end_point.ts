

// const base_url  = process.env.EXPO_BASE_URL!;
// const api_version = process.env.VERSION!;

const base_url  = "http://192.168.1.4:2000";
const api_version = "v1";

export const api_end_points = {
    create_profile_api : `${base_url}/${api_version}/profile/create-profile`,
    signup_api : `${base_url}/${api_version}/auth/sign-up`,
    select_interest_topic_api : `${base_url}/${api_version}/user/add-interested-topics`,
}