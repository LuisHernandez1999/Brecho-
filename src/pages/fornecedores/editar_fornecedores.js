import { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Divider, TextField, Typography, Grid } from '@mui/material';
import Sidebar from '../../components/sidebar';

export default function FornecedoresEdit({ fornecedorId }) { // recebe o `supplierId` como prop
    const [newValues, setNewValues] = useState({});
    const [loading, setLoading] = useState(true);

    // função para carregar os dados do fornecedor
    useEffect(() => {
        async function fetchFornecedorData() {
            try {
                const response = await fetch(`/api/fornecedores/${fornecedorId}`); // rota para buscar os dados
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
    }, [fornecedorId]);

    // atualiza o estado quando os campos são alterados
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewValues((prev) => ({ ...prev, [name]: value }));
    };

    // envia os dados atualizados
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/fornecedores/${supplierId}`, { // rota de atualização
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newValues),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar fornecedor');
            }

            const data = await response.json();
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
                                        label="CNPJ/CPF"
                                        name="documento"
                                        onChange={handleChange}
                                        required
                                        value={newValues?.documento || ''}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="E-mail"
                                        name="email"
                                        onChange={handleChange}
                                        required
                                        value={newValues?.email || ''}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Telefone"
                                        name="telefone"
                                        onChange={handleChange}
                                        value={newValues?.telefone || ''}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                                Endereço
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="CEP"
                                        name="cep"
                                        onChange={handleChange}
                                        required
                                        value={newValues?.cep || ''}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Logradouro"
                                        name="logradouro"
                                        onChange={handleChange}
                                        required
                                        value={newValues?.logradouro || ''}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Cidade"
                                        name="cidade"
                                        onChange={handleChange}
                                        required
                                        value={newValues?.cidade || ''}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Estado"
                                        name="estado"
                                        onChange={handleChange}
                                        required
                                        value={newValues?.estado || ''}
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
