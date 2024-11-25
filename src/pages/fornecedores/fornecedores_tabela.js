import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import Sidebar from '../../components/sidebar'; 
import VisibilityIcon from '@mui/icons-material/Visibility'; 
import DeleteIcon from '@mui/icons-material/Delete'; 
import EditIcon from '@mui/icons-material/Edit'; 
import SearchIcon from '@mui/icons-material/Search'; 
import { useRouter } from 'next/router';

const FornecedoresPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    nome: true,
    cnpjCpf: true,
    email: true,
    telefone: true,
  });
  const [fornecedores, setFornecedores] = useState([]);
  const router = useRouter();

  // função para buscar fornecedores do backend
  const fetchFornecedores = async () => {
    try {
      const response = await fetch('/api/fornecedores'); 
      if (!response.ok) {
        throw new Error('Erro ao buscar fornecedores');
      }
      const data = await response.json();
      setFornecedores(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Função para excluir fornecedor
  const deleteFornecedor = async (id) => {
    try {
      const response = await fetch(`/api/fornecedores/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setFornecedores((prev) => prev.filter((fornecedor) => fornecedor.id !== id));
      } else {
        throw new Error('Erro ao excluir fornecedor');
      }
    } catch (error) {
      console.error(error.message);
    }
  };


  useEffect(() => {
    fetchFornecedores();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  };

  const filteredFornecedores = fornecedores.filter((fornecedor) => {
    return (
      (filters.nome && fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (filters.cnpjCpf && fornecedor.cnpjCpf.includes(searchTerm)) ||
      (filters.email && fornecedor.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (filters.telefone && fornecedor.telefone.includes(searchTerm))
    );
  });

  const handleNavigateToRegister = () => {
    if (router) {
      router.push('./cadastro_fornecedores');
    }
  };

  const handleNavigation = () => {
    router.push('./visualizar_fornecedor'); 
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          marginLeft: '250px', 
          padding: '20px',
          height: '100vh',
          overflow: 'auto',
          marginTop: '60px', 
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ marginBottom: '60px', fontWeight: 'bold' }}>
            Fornecedores
          </Typography>
          <Button
            sx={{
              backgroundColor: '#00509E',
              color: 'white',
              borderRadius: '30px',
              padding: '8px 20px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#003b6e',
              },
            }}
            onClick={handleNavigateToRegister} 
          >
            Adicionar
          </Button>
        </Box>

        <TextField
          value={searchTerm}
          onChange={handleSearch}
          label="Pesquisar Fornecedor"
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: '20px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '25px', 
              borderColor: '#00509E',
              '&:hover fieldset': {
                borderColor: '#003b6e', 
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00509E', 
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <IconButton sx={{ position: 'absolute', right: '10px' }}>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />

        <Box sx={{ marginBottom: '20px' }}>
          {Object.keys(filters).map((key) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={filters[key]}
                  onChange={handleFilterChange}
                  name={key}
                />
              }
              label={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </Box>

        <Card sx={{ padding: '20px', bgcolor: 'white', boxShadow: 3, marginTop: '60px' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Nome</strong></TableCell>
                  <TableCell><strong>CNPJ/CPF</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Telefone</strong></TableCell>
                  <TableCell><strong>Ações</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredFornecedores.map((fornecedor) => (
                  <TableRow key={fornecedor.id}>
                    <TableCell>{fornecedor.nome}</TableCell>
                    <TableCell>{fornecedor.cnpjCpf}</TableCell>
                    <TableCell>{fornecedor.email}</TableCell>
                    <TableCell>{fornecedor.telefone}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={handleNavigation}
                        sx={{ marginRight: 1, color: '#00509E' }} 
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => alert(`Editando: ${fornecedor.nome}`)} 
                        sx={{ marginRight: 1, color: '#00509E' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => deleteFornecedor(fornecedor.id)} 
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
        </Card>
      </Box>
    </Box>
  );
};

export default FornecedoresPage;
