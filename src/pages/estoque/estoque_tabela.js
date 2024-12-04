import React, { useState } from 'react'; 
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
  TablePagination,
  TextField,
  Button,
} from '@mui/material';
import Sidebar from '../../components/sidebar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/router';

const EstoquePage = () => {
  const [produtos, setProdutos] = useState([
    { id: 1, imagem: '/camiseta.jpg', nome: 'Camiseta Infantil', quantidade: 10, preco: 25.0 },
    { id: 2, imagem: '/sapato.jpg', nome: 'Sapato Infantil', quantidade: 5, preco: 50.0 },
    { id: 3, imagem: '/calca.jpg', nome: 'Calça Infantil', quantidade: 8, preco: 35.0 },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const router = useRouter();
  

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleDeleteProduto = (id) => setProdutos((prev) => prev.filter((produto) => produto.id !== id));
  

  const handleNavigateToRegister = () => {
    if (router) {
      router.push('./cadastro_fornecedores');
    }
  };
  const quantidadeExibida = produtos.reduce((acc, p) => acc + p.quantidade, 0);
  const valorExibido = produtos.reduce((acc, p) => acc + p.quantidade * p.preco, 0);

  // Filtrar produtos pelo campo de pesquisa
  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(search.toLowerCase())
  );

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
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Controle de Estoque
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <Card
            sx={{
              flex: 1,
              height: '180px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: '10px' }}>
              Quantidade no Estoque
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {quantidadeExibida} unidades
            </Typography>
          </Card>

          <Card
            sx={{
              flex: 1,
              height: '180px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: '10px' }}>
              Valor Total do Estoque
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              R$ {valorExibido.toFixed(2)}
            </Typography>
          </Card>
        </Box>
        <Card sx={{ padding: '20px', bgcolor: 'white', boxShadow: 3, marginTop: '30px',  borderRadius: '25px',}}>
        <TableContainer sx={{ maxHeight: '1000px' }}>
  <Table stickyHeader>
    <TableHead>
      {/* Linha do campo de pesquisa */}
      <TableRow>
        <TableCell colSpan={6} align="left">
          <TextField
            label="Pesquisar produto"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              width: '800px', // Aumenta a largura
              height: '50px', // Aumenta a altura
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', // Arredonda as bordas
                '& fieldset': {
                  borderColor: '#00509E', // Cor das bordas
                  borderWidth: '2px', // Espessura das bordas
                },
                '&:hover fieldset': {
                  borderColor: '#00509E', // Cor ao passar o mouse
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00509E', // Cor ao focar
                },
              },
            }}
          />
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end',marginTop: '-50px'  }}>
    <Button
      sx={{
        backgroundColor: '#00509E',
        color: 'white',
        borderRadius: '30px',
        height: '50px',
        padding: '8px 20px',
         marginBottom: '50px',
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
        </TableCell>
      </TableRow>
      {/* Cabeçalho da tabela */}
      <TableRow>
        <TableCell><strong>Imagem</strong></TableCell>
        <TableCell><strong>Nome</strong></TableCell>
        <TableCell><strong>Quantidade</strong></TableCell>
        <TableCell><strong>Preço/Unidade</strong></TableCell>
        <TableCell><strong>Valor Total</strong></TableCell>
        <TableCell><strong>Ações</strong></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {produtosFiltrados
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((produto) => (
          <TableRow key={produto.id}>
            <TableCell>
              <img
                src={produto.imagem}
                alt={produto.nome}
                style={{ width: '50px', height: '50px', borderRadius: '5px' }}
              />
            </TableCell>
            <TableCell>{produto.nome}</TableCell>
            <TableCell>{produto.quantidade}</TableCell>
            <TableCell>R$ {produto.preco.toFixed(2)}</TableCell>
            <TableCell>R$ {(produto.quantidade * produto.preco).toFixed(2)}</TableCell>
            <TableCell>
              <IconButton sx={{ marginRight: 1, color: '#00509E' }}>
                <VisibilityIcon />
              </IconButton>
              <IconButton sx={{ marginRight: 1, color: '#00509E' }}>
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteProduto(produto.id)}
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
            count={produtosFiltrados.length}
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

export default EstoquePage;
