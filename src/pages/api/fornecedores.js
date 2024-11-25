import axios from 'axios';

const BACKEND_URL = 'https://seu-backend-no-postman.com/api/fornecedores';////// troca aqui corno 

export default async function handler(req, res) {
  const { method, body } = req;

  try {
    if (method === 'GET') {
      const response = await axios.get(BACKEND_URL);//substitui a url 
      return res.status(200).json(response.data);
    } else if (method === 'POST') {
      const response = await axios.post(BACKEND_URL, body);//substitui a url 
      return res.status(201).json(response.data);
    } else if (method === 'PUT') {
      const { id, ...data } = body;
      const response = await axios.put(`${BACKEND_URL}/${id}`, data);//substitui a url 
      return res.status(200).json(response.data);
    } else if (method === 'DELETE') {
      const { id } = body;
      await axios.delete(`${BACKEND_URL}/${id}`);//substitui a url 
      return res.status(204).end();
    } else {
      return res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']).status(405).end();
    }
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
}
