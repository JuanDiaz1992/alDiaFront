import { useSelector } from "react-redux";
import getCookie from "../../Scripts/getCookies";
import { useEffect, useState } from "react";
import defaultPhoto from "../../img/default_user.png";
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
import { useDispatch } from "react-redux";
import { changePhoto } from "../../redux/userSlice";
function ProfileInfo() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.data_aldia.id_user);
  const user = useSelector((state) => state.data_aldia.username);
  const url = process.env.REACT_APP_URL_HOST;
  const [allData, setAllData] = useState([]);
  const [viewMore, setViewMore] = useState(false);
  const [haveChanges,setChanges] = useState(false);
  /*Manejadores modal*/
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  /**/

  const getProfile = async () => {
    try {
      const response = await fetch(`${url}profile?linkTo=id&equalTo=${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Token " + getCookie("token"),
          Module: "user",
        },
      });
      const data = await response.json();
      if (data["status"] === 200) {
        setAllData(data["results"]);
        if(haveChanges){
          dispatch(changePhoto(data["results"][0]));
        }
      }
    } catch (error) {}
    setChanges(false)
  };
  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [haveChanges]);



  return (
    <>
      {allData.map((data, index) => (
        <div className="data_container" key={index}>
          <div className="avatar_container">
            <Avatar
              src={data.foto_perfil ? url + data.foto_perfil : defaultPhoto}
              isBordered
              radius="full"
              className="w-20 h-20 text-large"
            />
            <div className="iconContainer" onClick={onOpen}>
              <AiFillCamera />
            </div>
          </div>
          <h3>
            {data.primer_nombre}{" "}
            {data.segundo_nombre ? data.segundo_nombre : ""}{" "}
            {data.primer_apellido}{" "}
            {data.segundo_apellido ? data.segundo_apellido : ""}
          </h3>
          <p>@{data.user}</p>
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
              {data.direccion && (
                <div className="info_user">
                  <AiFillHome />
                  <p>
                    {" "}
                    Vive en{" "}
                    <strong>
                      {data.direccion} {data.municipio} {data.departamento}
                    </strong>
                  </p>
                </div>
              )}
              {data.correo && (
                <div className="info_user">
                  <AiFillMail />
                  <p>
                    {" "}
                    Email <strong>{data.correo}</strong>
                  </p>
                </div>
              )}
              {data.telefono && (
                <div className="info_user">
                  <AiFillPhone />
                  <p>
                    {" "}
                    Teléfono <strong>{data.telefono}</strong>
                  </p>
                </div>
              )}
              {data.ocupacion && (
                <div className="info_user">
                  <FaBriefcase />
                  <p>
                    {" "}
                    Ocupación <strong>{data.ocupacion}</strong>
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
                  {data.numero_documento && (
                    <div className="info_user">
                      <AiFillIdcard />
                      <p>
                        {data.tipo_documento}{" "}
                        <strong>{data.numero_documento}</strong>
                      </p>
                    </div>
                  )}
                  {data.fecha_nacimiento && (
                    <div className="info_user">
                      <MdChildFriendly />
                      <p>
                        Fecha de nacimiento{" "}
                        <strong>{data.fecha_nacimiento}</strong>
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ))}
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
          user={user} 
          setChangesProps={setChanges}
          id={id}
          />
      </Modal>
    </>
  );
}
export default ProfileInfo;
