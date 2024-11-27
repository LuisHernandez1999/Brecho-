import { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Grid } from '@mui/material';
import Sidebar from '../../components/sidebar';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/fornecedoras'; 

export default function FornecedoresEdit({ fornecedoraid }) {
    const [newValues, setNewValues] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // carregar os dados do fornecedor
    useEffect(() => {
        async function fetchFornecedorData() {
            try {
                const response = await axios.get(`${BASE_URL}/${fornecedoraid}`);
                setNewValues(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao carregar fornecedor:', error);
                setError('Erro ao carregar os dados do fornecedor');
                setLoading(false);
            }
        }
        fetchFornecedorData();
    }, [fornecedoraid]);

    // Atualiza o estado quando os campos são alterados
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewValues((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null); 

        try {
            const response = await axios.put(`${BASE_URL}/${fornecedoraid}`, newValues); 
            console.log('Fornecedor atualizado com sucesso:', response.data);
            alert('Fornecedor atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar fornecedor:', error);
            setError('Erro ao atualizar fornecedor');
            alert('Erro ao atualizar fornecedor.');
        }
    };

    if (loading) {
        return <Typography>Carregando dados do fornecedor...</Typography>;
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '250px' }}>
                <Sidebar />
            </Box>

            <Box sx={{ flex: 1, p: 3 }}>
                <Box sx={{ mb: 4, textAlign: 'left', mt: 8 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Editar Fornecedor
                    </Typography>
                </Box>

                <form autoComplete="off" onSubmit={handleSubmit}>
                    <Card sx={{ borderRadius: 4, boxShadow: 3, p: 3, maxWidth: '100%', mx: 'auto', mt: 8, height: 'auto' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                                Informações Gerais
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Nome do Fornecedor"
                                        name="nome"
                                        onChange={handleChange}
                                        required
                                        value={newValues?.nome || ''}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Contato"
                                        name="contato"
                                        onChange={handleChange}
                                        required
                                        value={newValues?.contato || ''}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Endereço"
                                        name="endereco"
                                        onChange={handleChange}
                                        required
                                        value={newValues?.endereco || ''}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Chave Pix"
                                        name="chavePix"
                                        onChange={handleChange}
                                        value={newValues?.chavePix || ''}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="URL do Contrato"
                                        name="contratoUrl"
                                        onChange={handleChange}
                                        value={newValues?.contratoUrl || ''}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                            <Button
                                type="submit"
                                sx={{
                                    mt: 2,
                                    color: '#00509E',
                                    backgroundColor: 'transparent',
                                    textTransform: 'none',
                                    fontSize: '18px',
                                    '&:hover': {
                                        color: '#003B6F',
                                        backgroundColor: 'transparent',
                                    },
                                }}
                            >
                                Salvar
                            </Button>
                        </Box>
                    </Card>
                </form>
            </Box>
        </Box>
    );
}
