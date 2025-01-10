import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Button,
  TablePagination,
} from '@mui/material';
import Sidebar from '../../components/sidebar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useRouter } from 'next/router';

const BASE_URL = 'http://localhost:8080/api/fornecedoras';

const FornecedoresPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fornecedores, setFornecedores] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await axios.get(BASE_URL);
        setFornecedores(response.data);
      } catch (error) {
        console.error('Erro ao buscar fornecedores:', error.message);
      }
    };
    fetchFornecedores();
  }, []);

  const deleteFornecedora = async (id, values) => {
    try {
      const formData = new FormData();
      formData.append(
        "fornecedora",
        JSON.stringify({
          id,
          nome: values.nome,
          contato: values.contato,
          endereco: values.endereco,
          chavePix: values.chavePix,
        })
      );
      const response = await axios.post(`${BASE_URL}/delete`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('Fornecedor deletado com sucesso:', response.data);
      setFornecedores((prev) => prev.filter((fornecedora) => fornecedora.id !== id));
      alert('Fornecedor deletado com sucesso!');
    } catch (error) {
      console.error("Erro ao deletar fornecedor:", error);
      alert('Erro ao deletar fornecedor.');
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNavigateToRegister = () => {
    if (router) {
      router.push('./cadastro_fornecedores');
    }
  };

  const handleEditNavigation = (id) => {
    router.push(`./editar_fornecedores?id=${id}`);
  };

  const handleNavigation = () => {
    router.push('./visualizar_fornecedor');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredFornecedores = fornecedores.filter((fornecedora) => {
    return fornecedora.nome.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#blue', minHeight: '100vh' }}>
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          marginLeft: '250px',
          maxHeight: '1000px',
          overflow: 'auto',
          backgroundColor: 'white', 
          paddingTop: '3rem', 
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',  
            fontWeight: 'bold',
            marginBottom: '50px',
            marginRight:'1000px',  
          }}
        >
          Fornecedores
        </Typography>
        
       
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '30px',  
          }}
        >
          <TextField
            label="Pesquisar fornecedor"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              height:'50px',
              width: '500px', 
              marginRight: '300px',  
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                backgroundColor: '#FFFFFF', 
                color: '#000000', 
                '& fieldset': {
                  borderColor: '#CCCCCC', 
                },
                '&:hover fieldset': {
                  borderColor: '#00509E',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00509E', 
                },
              },
              '& .MuiInputBase-input': {
                color: '#000000', 
              },
              '& .MuiInputLabel-root': {
                color: '#000000', 
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#00509E', 
              },
            }}
          />
         <Button
  sx={{
    backgroundColor: '#50abe4',
    color: 'white',
    border: '2px solid #00509E', 
    fontWeight: 'tine',
    fontSize: '15px',
    borderRadius: '60px',
    padding: '10px 0',
    width: '200px', 
    height: '50px',
    textTransform: 'none',
  }}
  onClick={handleNavigateToRegister}
>
  Cadastrar fornecedor
</Button>
        </Box>

        <Card
          sx={{
            padding: '20px',
            bgcolor: 'white',
            boxShadow: 3,
            borderRadius: '25px',
            width: '80%',  
            margin: '0 auto', 
          }}
        >
          <TableContainer sx={{ maxHeight: '1000px', width: '100%', margin: '0 auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Nome</strong></TableCell>
                  <TableCell><strong>Contato</strong></TableCell>
                  <TableCell><strong>Endereço</strong></TableCell>
                  <TableCell><strong>Chave Pix</strong></TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredFornecedores
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((fornecedora) => (
                    <TableRow key={fornecedora.id}>
                      <TableCell>{fornecedora.nome}</TableCell>
                      <TableCell>{fornecedora.contato}</TableCell>
                      <TableCell>{fornecedora.endereco}</TableCell>
                      <TableCell>{fornecedora.chavePix}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={handleNavigation}
                          sx={{ marginRight: 1, color: '#00509E' }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleEditNavigation(fornecedora.id)}
                          sx={{ marginRight: 1, color: '#00509E' }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteFornecedora(fornecedora.id)}
                          sx={{ color: '#00509E' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredFornecedores.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>
      </Box>
    </Box>
  );
};

export default FornecedoresPage;
