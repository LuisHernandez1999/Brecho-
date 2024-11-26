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
  Checkbox,
  FormControlLabel,
  Button,
  TablePagination,
} from '@mui/material';
import Sidebar from '../../components/sidebar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useRouter } from 'next/router';

const BASE_URL = 'http://localhost:8080/api/fornecedoras';

const FornecedoresPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    nome: true,
    contato: true,
    email: true,
    chavePix: true,
  });
  const [fornecedores, setFornecedores] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  // Fetch fornecedores da API
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

  // Excluir fornecedor
  const handleDeleteFornecedor = async (id) => {
    try {
      await axios.delete(`${BASE_URL}?id=${id}`);
      setFornecedores((prev) => prev.filter((fornecedor) => fornecedor.id !== id));
    } catch (error) {
      console.error('Erro ao excluir fornecedor:', error.message);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  };

  const filteredFornecedores = fornecedores.filter((fornecedora) => {
    return (
      (filters.nome && fornecedora.nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (filters.contato && fornecedora.contato.includes(searchTerm)) ||
      (filters.endereco && fornecedora.endereco.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (filters.chavePix && fornecedora.chavePix.includes(searchTerm))
    );
  });

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
                  <TableCell><strong>Contato</strong></TableCell>
                  <TableCell><strong>Endereço</strong></TableCell>
                  <TableCell><strong>Chave Pix </strong></TableCell>
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
                          onClick={() => handleDeleteFornecedor(fornecedora.id)}
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
