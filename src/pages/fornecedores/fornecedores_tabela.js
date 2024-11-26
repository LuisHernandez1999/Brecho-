import React, { useState, useEffect } from 'react'; 
import { Box, Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, Checkbox, FormControlLabel, Button, TablePagination } from '@mui/material';
import Sidebar from '../../components/sidebar'; 
import VisibilityIcon from '@mui/icons-material/Visibility'; 
import DeleteIcon from '@mui/icons-material/Delete'; 
import EditIcon from '@mui/icons-material/Edit'; 
import SearchIcon from '@mui/icons-material/Search'; 
import { useRouter } from 'next/router';
import { getFornecedoras, deleteFornecedora } from '../api/fornecedores';

const FornecedoresPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    nome: true,
    cnpjCpf: true,
    email: true,
    telefone: true,
  });
  const [fornecedores, setFornecedores] = useState([]);
  const [page, setPage] = useState(0);  // Estado para controlar a página atual
  const [rowsPerPage, setRowsPerPage] = useState(5);  // Quantidade de itens por página
  const router = useRouter();

  // Função para buscar fornecedores da API
  const fetchFornecedores = async () => {
    try {
      const data = await getFornecedoras();
      setFornecedores(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Função para excluir fornecedor
  const handleDeleteFornecedor = async (id) => {
    try {
      await deleteFornecedora(id);
      setFornecedores((prev) => prev.filter((fornecedor) => fornecedor.id !== id));
    } catch (error) {
      console.error('Erro ao excluir fornecedor:', error.message);
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
      (filters.cnpjCpf && fornecedor.cnpj.includes(searchTerm)) ||
      (filters.email && fornecedor.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (filters.telefone && fornecedor.telefone.includes(searchTerm))
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

  // Funções para controle de paginação
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);  // Resetar para a primeira página
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
                          onClick={() => handleEditNavigation(fornecedor.id)}
                          sx={{ marginRight: 1, color: '#00509E' }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleDeleteFornecedor(fornecedor.id)} 
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

          {/* Adicionando a Paginação */}
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
