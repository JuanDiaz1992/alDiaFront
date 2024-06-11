const convertToBase64 = (file) => {
    const converter = () => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    return converter(file)
        .then((base64Image) => {
            const partesImagen = base64Image.split(',');
            const tipoImagen = partesImagen[0].split(':')[1].split(';')[0];
            const datosImagen = partesImagen[1];
            const datos = {
                "photo": datosImagen,
                "tipoDeFoto": tipoImagen,
            };
            return datos;
        })
        .catch((error) => {
            console.error('Error al convertir a base64:', error);
            throw error;
        });
};

export default convertToBase64;
