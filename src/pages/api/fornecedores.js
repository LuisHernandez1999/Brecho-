import api from "../../utils/api";


export const getFornecedoras = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar fornecedoras:", error);
    throw error;
  }
};

export const updateFornecedora = async (id, fornecedora) => {
  try {
    const response = await api.put(`/${id}`, fornecedora); 
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar fornecedora:", error);
    throw error;
  }
};

export const createFornecedora = async (fornecedora) => {
  try {
    const response = await api.post("/", fornecedora);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar fornecedora:", error);
    throw error;
  }
};


export const deleteFornecedora = async (id) => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error("Erro ao excluir fornecedora:", error);
    throw error;
  }
};