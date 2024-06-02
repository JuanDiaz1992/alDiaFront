

import { useEffect, useState } from "react";
import {
    Modal,
    Avatar,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import {
  AiFillCamera,
  AiFillEdit,
  AiFillHome,
  AiFillMail,
  AiFillPhone,
  AiFillIdcard,
} from "react-icons/ai";
import { FaBriefcase } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { MdChildFriendly, MdPassword } from "react-icons/md";
import ChangeProfilePhoto from "./changeProfilePhoto";
import fetchDataGet from "../../api/fetchDataGet";
import dafaultPhotoUser from "../../img/default_user.png";
import { useProfilePictureContext } from "../../context/profilePicture";
import getPhotoUrl from "../../Scripts/getPhoto";
function ProfileInfo() {
  const { isChague } = useProfilePictureContext();
  const [user,setUser]=useState([])
  const [viewMore, setViewMore] = useState(false);
  const [haveChanges,setChanges] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
  /*Manejadores modal*/
  const {isOpen, onOpen, onOpenChange} = useDisclosure();




  useEffect(() => {
    try {
      fetchDataGet("/api/v1/users/profile")
      .then(user=>{
        if (user) {
          setUser(user.profile);
        }
      })
    } catch (error) {}
    setChanges(false)
  },[haveChanges]);


  useEffect(() => {
    const url = localStorage.getItem("photo");
    if(url === null || url === ""){
      setProfilePhotoUrl(dafaultPhotoUser);
    }else{
      getPhotoUrl(url)
      .then(response=>{
        setProfilePhotoUrl(response);
      })
    }
  }, [isChague.isChanged]);

  return (
    <>
        <div className="data_container">
          <div className="avatar_container">
            <Avatar
              src={profilePhotoUrl ? profilePhotoUrl : dafaultPhotoUser}
              isBordered
              radius="full"
              className="w-20 h-20 text-large"
            />
            <div className="iconContainer" onClick={onOpen}>
              <AiFillCamera />
            </div>
          </div>
          <h3>
            {user.firstName}{" "}
            {user.middleName ? user.middleName : ""}{" "}
            {user.lastName}{" "}
            {user.surnamen ? user.surnamen : ""}
          </h3>
          <p>@{localStorage.getItem("username")}</p>
          <div className="data_container_buttons">
            <Button color="primary">
              <AiFillEdit /> Editar perfil
            </Button>
            <Button color="default">
              <MdPassword />
              Contraseña
            </Button>
          </div>
          <div>
            <h4>
              <strong>Detalles</strong>
            </h4>
            <div className="info_user_container">
              {user.address && (
                <div className="info_user">
                  <AiFillHome />
                  <p>
                    {" "}
                    Vive en{" "}
                    <strong>
                      {user.address} {user.town} {user.department}
                    </strong>
                  </p>
                </div>
              )}
              {user.email && (
                <div className="info_user">
                  <AiFillMail />
                  <p>
                    {" "}
                    Email <strong>{user.email}</strong>
                  </p>
                </div>
              )}
              {user.phone && (
                <div className="info_user">
                  <AiFillPhone />
                  <p>
                    {" "}
                    Teléfono <strong>{user.phone}</strong>
                  </p>
                </div>
              )}
              {user.occupation && (
                <div className="info_user">
                  <FaBriefcase />
                  <p>
                    {" "}
                    Ocupación <strong>{user.occupation}</strong>
                  </p>
                </div>
              )}

              <div
                onClick={
                  !viewMore ? () => setViewMore(true) : () => setViewMore(false)
                }
                className="info_user view_more"
              >
                <BsThreeDots />
                <p>Ver {!viewMore ? "más" : "menos"} información</p>
              </div>
              {viewMore && (
                <>
                  {user.document && (
                    <div className="info_user">
                      <AiFillIdcard />
                      <p>
                        {user.typeDocument}{" "}
                        <strong>{user.document}</strong>
                      </p>
                    </div>
                  )}
                  {user.birthDate && (
                    <div className="info_user">
                      <MdChildFriendly />
                      <p>
                        Fecha de nacimiento{" "}
                        <strong>{user.birthDate}</strong>
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <Modal
        isOpen={isOpen}
        placement="bottom-center"
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: -20,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: 0,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}
      >
        <ChangeProfilePhoto
          onOpenChange={onOpenChange}
          setChangesProps={setChanges}
          />
      </Modal>
    </>
  );
}
export default ProfileInfo;
