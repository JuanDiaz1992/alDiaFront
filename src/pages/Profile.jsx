import "../styleheets/Profile.css";
import ProfileInfo from "../components/Profile_components/profileInfo";

function Profile(){

    return(
        <>
            <div className="profile_container">                   
                <ProfileInfo />
            </div>
        </>
    )
}
export default Profile;