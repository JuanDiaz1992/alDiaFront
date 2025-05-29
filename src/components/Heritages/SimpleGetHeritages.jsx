import { useEffect, useState } from "react";
import fetchGetData from "../../api/fetchDataGet";
import fetchDataPut from "../../api/fetchDataPut";
import fetchDataDelete from "../../api/fetchDataDelete";
import formatearPesos from "../../Scripts/formatearPesos";
import { Button, Modal, ModalBody, ModalContent, ModalHeader, Input, Select, SelectItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function GetHeritages() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editHeritage, setEditHeritage] = useState(null);
  const [typesHeritages, setTypesHeritages] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [heritageToDelete, setHeritageToDelete] = useState(null);
  const navigate = useNavigate();

  // Fetch tipos de patrimonio
  const fetchTypesHeritages = async () => {
    try {
      const res = await fetchGetData("/api/v1/users/heritages/types-heritages");
      setTypesHeritages(res.data || []);
    } catch {
      setTypesHeritages([]);
    }
  };

  // Fetch patrimonios
  const getHeritagesData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchGetData(`/api/v1/users/heritages/gettotalheritages`);
      setData(response);
    } catch (err) {
      setError("No se pudieron cargar los patrimonios");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHeritagesData();
    fetchTypesHeritages();
  }, []);

  // Eliminar patrimonio
  const handleDeleteHeritage = async () => {
    if (!heritageToDelete) return;
    try {
      await fetchDataDelete(`/api/v1/users/heritages/deleteheritage/id/${heritageToDelete.id}`);
      toast.success("Patrimonio eliminado correctamente");
      setShowDeleteModal(false);
      setHeritageToDelete(null);
      getHeritagesData();
    } catch (err) {
      toast.error("Error al eliminar patrimonio");
    }
  };

  // Abrir modal de edición
  const openEditModal = (heritage) => {
    setEditHeritage({ ...heritage });
    setShowEditModal(true);
  };

  // Guardar cambios de edición
  const handleEditHeritage = async () => {
    try {
      await fetchDataPut(
        "/api/v1/users/heritages/editHeritage",
        editHeritage
      );
      toast.success("Patrimonio actualizado correctamente");
      setShowEditModal(false);
      setEditHeritage(null);
      getHeritagesData();
    } catch (err) {
      toast.error("Error al actualizar patrimonio");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-8 w-full">
        <span className="text-gray-400">Cargando patrimonios...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8 w-full">
        <p className="text-red-500 mb-4">{error}</p>
        <Button color="warning" onPress={getHeritagesData} className="font-bold">
          Reintentar
        </Button>
      </div>
    );
  }

  if (!data || data.status !== 200) {
    return (
      <div className="flex flex-col items-center justify-center py-8 w-full">
        <p className="text-red-500 mb-4">No se pudieron cargar los patrimonios</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-600">Valor total de tu patrimonio</h3>
        <p className="text-3xl font-bold text-[#043249]">
          {formatearPesos(data.total)}
        </p>
      </div>

      <div className="mb-4">
        <h4 className="text-md font-medium mb-2">Tus patrimonios</h4>
        {data.heritages && data.heritages.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-[#043249] text-white">DESCRIPCIÓN</th>
                  <th className="px-4 py-2 bg-[#043249] text-white">VALOR</th>
                  <th className="px-4 py-2 bg-[#043249] text-white">TIPO</th>
                  <th className="px-4 py-2 bg-[#043249] text-white">FECHA ADQ.</th>
                  <th className="px-4 py-2 bg-[#043249] text-white">PORCENTAJE</th>
                  <th className="px-4 py-2 bg-[#043249] text-white">UBICACIÓN</th>
                  <th className="px-4 py-2 bg-[#043249] text-white">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.heritages.map((patrimonio) => (
                  <tr key={patrimonio.id} className="border-b">
                    <td className="px-4 py-2">{patrimonio.description || "Sin descripción"}</td>
                    <td className="px-4 py-2">{formatearPesos(patrimonio.value)}</td>
                    <td className="px-4 py-2">{patrimonio.type || "Sin tipo"}</td>
                    <td className="px-4 py-2">{patrimonio.acquisitionDate || "-"}</td>
                    <td className="px-4 py-2">{patrimonio.percentage ? `${patrimonio.percentage}%` : "-"}</td>
                    <td className="px-4 py-2">{patrimonio.location || "-"}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <Button size="sm" color="primary" onPress={() => openEditModal(patrimonio)}>
                        Editar
                      </Button>
                      <Button size="sm" color="danger" onPress={() => { setHeritageToDelete(patrimonio); setShowDeleteModal(true); }}>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            No se encontraron patrimonios registrados
          </p>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <Button
          color="warning"
          onPress={() => navigate("/patrimonios")}
          className="font-bold"
        >
          Gestionar Patrimonios
        </Button>
      </div>

      {/* Modal de edición */}
      <Modal isOpen={showEditModal} onOpenChange={setShowEditModal}>
        <ModalContent>
          <ModalHeader>Editar patrimonio</ModalHeader>
          <ModalBody>
            <Input
              label="Descripción"
              value={editHeritage?.description || ""}
              onChange={(e) => setEditHeritage({ ...editHeritage, description: e.target.value })}
            />
            <Input
              label="Valor"
              type="number"
              value={editHeritage?.value || ""}
              onChange={(e) => setEditHeritage({ ...editHeritage, value: e.target.value })}
            />
            <Select
              label="Tipo"
              selectedKeys={editHeritage?.type ? [editHeritage.type] : []}
              onChange={(e) => setEditHeritage({ ...editHeritage, type: e.target.value })}
            >
              {typesHeritages.map((tipo) => (
                <SelectItem key={tipo.name} value={tipo.name}>
                  {tipo.name}
                </SelectItem>
              ))}
            </Select>
            <Input
              label="Fecha de adquisición"
              type="date"
              value={editHeritage?.acquisitionDate || ""}
              onChange={(e) => setEditHeritage({ ...editHeritage, acquisitionDate: e.target.value })}
            />
            <Input
              label="Porcentaje"
              type="number"
              value={editHeritage?.percentage || ""}
              onChange={(e) => setEditHeritage({ ...editHeritage, percentage: e.target.value })}
            />
            <Input
              label="Ubicación"
              value={editHeritage?.location || ""}
              onChange={(e) => setEditHeritage({ ...editHeritage, location: e.target.value })}
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button color="primary" onPress={handleEditHeritage}>
                Guardar
              </Button>
              <Button color="default" onPress={() => setShowEditModal(false)}>
                Cancelar
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <Modal isOpen={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <ModalContent>
          <ModalHeader>Eliminar patrimonio</ModalHeader>
          <ModalBody>
            <p>¿Estás seguro de que deseas eliminar este patrimonio?</p>
            <div className="flex justify-end gap-2 mt-4">
              <Button color="danger" onPress={handleDeleteHeritage}>
                Eliminar
              </Button>
              <Button color="default" onPress={() => setShowDeleteModal(false)}>
                Cancelar
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default GetHeritages;