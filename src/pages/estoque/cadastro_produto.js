import { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Grid, CircularProgress } from '@mui/material';
import Sidebar from '../../components/sidebar';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/produtos'; // url da api 

export default function ProdutosCadastro() {
    const [newValues, setNewValues] = useState({
        nome: '',
        quantidade: '',
        precoUnidade: '',
        valorTotal: '',
    });
    const [imagem, setImagem] = useState(null);
    const [loading, setLoading] = useState(false);

    // atualiza o estado com os valores dos campos
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewValues((prev) => ({ ...prev, [name]: value }));
    };

   
    const handleImageChange = (event) => {
        setImagem(event.target.files[0]);
    };

    // função para criar um produto na API
    const createProduto = async (values, imagemFile) => {
        try {
            const formData = new FormData();
            formData.append('imagem', imagemFile); 
            formData.append('nome', values.nome);
            formData.append('quantidade', values.quantidade);
            formData.append('precoUnidade', values.precoUnidade);
            formData.append('valorTotal', values.valorTotal);

            const response = await axios.post(BASE_URL, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            throw error;
        }
    };

    // envia os dados para a API
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const data = await createProduto(newValues, imagem); 
            console.log('Produto criado com sucesso:', data);
            alert('Produto criado com sucesso!');
            setNewValues({
                nome: '',
                quantidade: '',
                precoUnidade: '',
                valorTotal: '',
            });
            setImagem(null);
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            alert('Erro ao criar produto.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex',backgroundColor: '#F0E1D2',minHeight: '100vh' }}>
            <Box sx={{ width: '250px' }}>
                <Sidebar />
            </Box>

            <Box sx={{ flex: 1, p: 3 }}>
                <Box sx={{ mb: 4, textAlign: 'left', mt: 8 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Cadastrar Produto
                    </Typography>
                </Box>

                <form autoComplete="off" onSubmit={handleSubmit}>
                    <Card
                        sx={{
                            borderRadius: 4,
                            boxShadow: 3,
                            p: 3,
                            maxWidth: '100%',
                            mx: 'auto',
                            mt: 8,
                            height: 'auto',
                            
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                                Informações do Produto
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        fullWidth
                                        sx={{ textAlign: 'left',color: '#00509E' }}
                                    >
                                        Upload de Imagem
                                        <input
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={handleImageChange}
                                        />
                                    </Button>
                                    {imagem && (
                                        <Typography variant="body2" sx={{ mt: 1 ,color: '#00509E'}}>
                                            Imagem selecionada: {imagem.name}
                                        </Typography>
                                    )}
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Nome do Produto"
                                        name="nome"
                                        onChange={handleChange}
                                        required
                                        value={newValues?.nome || ''}
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 4,
                                                backgroundColor: '#FFFFFF',
                                            },
                                            '& .MuiOutlinedInput-root.Mui-focused': {
                                                backgroundColor: '#FFFFFF',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Quantidade"
                                        name="quantidade"
                                        onChange={handleChange}
                                        required
                                        value={newValues?.quantidade || ''}
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 4,
                                                backgroundColor: '#FFFFFF',
                                            },
                                            '& .MuiOutlinedInput-root.Mui-focused': {
                                                backgroundColor: '#FFFFFF',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Preço/Unidade"
                                        name="precoUnidade"
                                        onChange={handleChange}
                                        required
                                        value={newValues?.precoUnidade || ''}
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 4,
                                                backgroundColor: '#FFFFFF',
                                            },
                                            '& .MuiOutlinedInput-root.Mui-focused': {
                                                backgroundColor: '#FFFFFF',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Valor Total"
                                        name="valorTotal"
                                        onChange={handleChange}
                                        required
                                        value={newValues?.valorTotal || ''}
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 4,
                                                backgroundColor: '#FFFFFF',
                                            },
                                            '& .MuiOutlinedInput-root.Mui-focused': {
                                                backgroundColor: '#FFFFFF',
                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>

                        <Box  sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 2,
                                mt: 2,
                            }}>
                            <Button
                                type="submit"
                                disabled={loading}
                                sx={{
                                    color: 'white',
                                    backgroundColor: '#50abe4',
                                    textTransform: 'none',
                                    fontSize: '15px',
                                    borderRadius: '50px',
                                    padding: '10px 30px',
                                    '&:hover': {
                                        backgroundColor: '#003B6F',
                                    },
                                    '&:disabled': {
                                        backgroundColor: '#cccccc',
                                        color: '#666666',
                                    },
                                }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} sx={{ marginRight: 2 }} />
                                ) : (
                                    'Salvar produto'
                                )}
                            </Button>
                        </Box>
                    </Card>
                </form>
            </Box>
        </Box>
    );
}
