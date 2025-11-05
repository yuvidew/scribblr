

// const base_url  = process.env.EXPO_BASE_URL!;
// const api_version = process.env.VERSION!;

const base_url  = "http://192.168.1.4:2000";
const api_version = "v1";

export const api_end_points = {
    create_profile_api : `${base_url}/${api_version}/profile/create-profile`,
    signup_api : `${base_url}/${api_version}/auth/sign-up`,
    sign_in_api : `${base_url}/${api_version}/auth/sign-in`,
    select_interest_topic_api : `${base_url}/${api_version}/user/add-interested-topics`,
    get_all_user_api : `${base_url}/${api_version}/user/get-all-users`,
    follow_user_api : `${base_url}/${api_version}/user/follow-unfollow`,
    verify_email : `${base_url}/${api_version}/auth/verify-email`,
    verify_otp : `${base_url}/${api_version}/auth/verify-code`,
    reset_password : `${base_url}/${api_version}/auth/reset-password`,
    upload_to_app_writer : `${base_url}/${api_version}/upload-to-app-writer`,

    // article api end points

    create_article_api :  `${base_url}/${api_version}/user/generate-article-content`,
    get_article_by_id : `${base_url}/${api_version}/user/get-article-by-id`,
    publish_article : `${base_url}/${api_version}/user/set-publish-article`,
}