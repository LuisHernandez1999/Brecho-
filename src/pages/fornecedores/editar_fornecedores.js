import { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Divider, TextField, Typography, Grid } from '@mui/material';
import Sidebar from '../../components/sidebar';
import { updateFornecedora } from '../api/fornecedores'; 

export default function FornecedoresEdit({ fornecedoraid }) {
    const [newValues, setNewValues] = useState({});
    const [loading, setLoading] = useState(true);

    // função para carregar os dados do fornecedor
    useEffect(() => {
        async function fetchFornecedorData() {
            try {
                const response = await fetch(`/api/fornecedores/${fornecedoraid}`);
                if (!response.ok) throw new Error('Erro ao buscar dados do fornecedor');
                const data = await response.json();
                setNewValues(data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao carregar fornecedor:', error);
                setLoading(false);
            }
        }
        fetchFornecedorData();
    }, [fornecedoraid]);

    // atualiza o estado quando os campos são alterados
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewValues((prev) => ({ ...prev, [name]: value }));
    };

    // envia os dados atualizados
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await updateFornecedora(fornecedoraid, newValues); // usando a função da API
            console.log('Fornecedor atualizado com sucesso:', data);
            alert('Fornecedor atualizado com sucesso!');
        } catch (error) {
            console.error('Erro:', error);
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
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
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
