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
import getCookie from "../../Scripts/getCookies";
import { useSelector } from "react-redux"
function ChangeProfilePhoto({ user, setChangesProps, id, onOpenChange }) {
  const photo = useSelector((state) => state.data_aldia.photo);
  console.log(photo)
  const url = process.env.REACT_APP_URL_HOST;
  const [selectedFile, setSelectedFile] = useState(null);

  //Al hacer click al botón, se abre un input de tipo file
  //Y se carga la imagen en el estado selectedFile
  const handleIconClick = () => {
    document.getElementById("fileInput").click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  useEffect(() => {
    if (selectedFile) {
      const partes = selectedFile["name"].split(".");
      const extension = partes[partes.length - 1];
      const newName = `profilePicture.${extension}`;
      const modifiedFile = new File([selectedFile], newName, {
        type: selectedFile.type,
      });
      console.log(newName);
      let formData = new FormData();
      formData.append("id", id);
      formData.append("photo", modifiedFile);
      formData.append("user", user);
      formData.append("chageProfilePhoto", true);
      fetch(url, {
        method: "POST",
        mode: "cors",
        body: formData,
        headers: {
          Authorization: "Token " + getCookie("token"),
          Module: "user",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data["status"] === 200) {
            setChangesProps(true);
            onOpenChange();
          }
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  const deltePhoto = () => {
    fetch(url, {
      method: "DELETE",
      mode: "cors",
      body: JSON.stringify({
        "id":id,
        "delete_picture_profile":true
      }),
      headers: {
        Authorization: "Token " + getCookie("token"),
        Module: "user",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["status"] === 200) {
          setChangesProps(true);
          onOpenChange();
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
