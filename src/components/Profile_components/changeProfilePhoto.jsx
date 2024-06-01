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
import changeNamePicture from "../../Scripts/changeNamePicture";

function ChangeProfilePhoto({ setChangesProps, onOpenChange }) {
  const photo = localStorage.getItem("photo");
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
      let newNAme = "profilePicture_0_"
      if(photo!==null && photo!==""){
        let number = photo.split("_");
        console.log(number[3])
        let sum = isNaN(parseInt(number[3]))? 0 : parseInt(number[3]) + 1;
        newNAme = `profilePicture_${sum}_`
      }
      const modifiedFile = changeNamePicture(selectedFile,newNAme);
      let formData = new FormData();
      formData.append("photo", modifiedFile);
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
            onOpenChange();
            setChangesProps(true);
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
