import { useState, useEffect } from 'react';
import { Box, Card, CardContent, Divider, Typography, Grid, CircularProgress } from '@mui/material';
import Sidebar from '../../components/sidebar'; 
import { useRouter } from 'next/router';

export default function SupplierRegistration() {
    const [newValues, setNewValues] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 
    const router = useRouter();
    const { id } = router.query; // id do fornecedor obtido pela URL

    useEffect(() => {
        if (id) {
            fetch(`/api/fornecedores/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setNewValues(data); // atualiza com os dados do backend
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Erro ao buscar fornecedor:", error);
                    setIsLoading(false);
                });
        }
    }, [id]);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!newValues) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6">Fornecedor não encontrado</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '250px' }}>
                <Sidebar />
            </Box>

            <Box sx={{ flex: 1, p: 3 }}>
                <Box sx={{ mb: 4, textAlign: 'left', mt: 8 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Visualizar Fornecedor
                    </Typography>
                </Box>

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
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    Nome do Fornecedor
                                </Typography>
                                <Typography variant="body2">{newValues.nome}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    CNPJ/CPF
                                </Typography>
                                <Typography variant="body2">{newValues.cnpjCpf}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    E-mail
                                </Typography>
                                <Typography variant="body2">{newValues.email}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    Telefone
                                </Typography>
                                <Typography variant="body2">{newValues.telefone}</Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 3 }} />

                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    CEP
                                </Typography>
                                <Typography variant="body2">{newValues.cep}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    Logradouro
                                </Typography>
                                <Typography variant="body2">{newValues.logradouro}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    Cidade
                                </Typography>
                                <Typography variant="body2">{newValues.cidade}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    Estado
                                </Typography>
                                <Typography variant="body2">{newValues.estado}</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}