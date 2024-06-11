import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import fetchDataPut from "../../api/fetchDataPut";
import fetchDataDelete from "../../api/fetchDataDelete";
import convertToBase64 from "../../Scripts/converToBase64";
import { toast } from "react-hot-toast";
import { useProfilePictureContext } from "../../context/profilePicture";

function ChangeProfilePhoto({ setChangesProps, onOpenChange }) {

  const { dispatchPicturProfile } = useProfilePictureContext();
  const photo = localStorage.getItem("photo");
  const [selectedFile, setSelectedFile] = useState(null);


  const handleIconClick = () => {
    document.getElementById("fileInput").click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };


  useEffect(() => {
    const sendPicture = async ()=>{
      try {
        let base64 = null;
        if (selectedFile) {
          try {
            base64 = await convertToBase64(selectedFile);
        } catch (error) {
            console.error('Error al convertir el archivo a base64:', error);
        }
        const response = await fetchDataPut("/api/v1/users/profile/edit/picture",base64);
            if (parseInt(response.status) === 200) {
              localStorage.setItem("photo",response.url);
              onOpenChange();
              setChangesProps(true);
              toast.success(response.message)
              dispatchPicturProfile({ type: 'ISCHANGE' });
            }else{
              toast.error(response.message)
              onOpenChange();
            }
        }
      } catch (error) {
        toast.error('Ocurrió un error, intentelo de nuevo')
      }

    }
    sendPicture();

  }, [onOpenChange, selectedFile, setChangesProps,dispatchPicturProfile]);

  const deltePhoto = () => {
    fetchDataDelete()
      .then((data) => {
        if (data["status"] === 200) {
          onOpenChange();
          setChangesProps(true);
        }
      });
  };
  return (
    <>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Foto de perfil
            </ModalHeader>
            <ModalBody>
              <form className="change_picture_container">
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  capture="camera"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <Button
                  radius="full"
                  onClick={handleIconClick}
                  isIconOnly
                  color="warning"
                  variant="faded"
                  aria-label="Take a photo"
                >
                  <FaCamera />
                </Button>
                {photo !== null&&
                    <Button
                    radius="full"
                    onClick={deltePhoto}
                    isIconOnly
                    color="warning"
                    variant="faded"
                    aria-label="Delete photo"
                  >
                    <MdDelete />
                  </Button>
                }
              </form>
            </ModalBody>
            <ModalFooter>
              <br />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </>
  );
}
export default ChangeProfilePhoto;
