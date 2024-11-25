import axios from 'axios';

const BACKEND_URL = 'https://seu-backend-no-postman.com/api/fornecedores'; // substitui pela URL do  backend

async function handleGetRequest(res) {
  const response = await axios.get(BACKEND_URL);
  return res.status(200).json(response.data);
}

async function handlePostRequest(res, body) {
  const response = await axios.post(BACKEND_URL, body);
  return res.status(201).json(response.data);
}

async function handlePutRequest(res, body) {
  const { id, ...data } = body;
  if (!id) {
    return res.status(400).json({ message: 'ID é obrigatório para atualização.' });
  }

  const response = await axios.put(`${BACKEND_URL}/${id}`, data);
  return res.status(200).json(response.data);
}

async function handleDeleteRequest(res, query) {
  const { nome } = query;
  if (!nome) {
    return res.status(400).json({ message: 'Nome é obrigatório para exclusão.' });
  }

  await axios.delete(`${BACKEND_URL}?nome=${encodeURIComponent(nome)}`);
  return res.status(204).end();
}

export default async function handler(req, res) {
  const { method, query, body } = req;

  try {
    switch (method) {
      case 'GET':
        return await handleGetRequest(res);
      case 'POST':
        return await handlePostRequest(res, body);
      case 'PUT':
        return await handlePutRequest(res, body);
      case 'DELETE':
        return await handleDeleteRequest(res, query);
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(); 
    }
  } catch (error) {
    console.error('Erro na API:', error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({ message: error.message });
  }
}
