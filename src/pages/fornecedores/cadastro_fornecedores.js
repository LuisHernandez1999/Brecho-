import { useState } from 'react';
import { Box, Button, Card, CardContent, Divider, TextField, Typography, Grid } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Sidebar from '../../components/sidebar'; 

export default function SupplierRegistration() {
    const [newValues, setNewValues] = useState({});
   

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewValues((prev) => ({ ...prev, [name]: value }));
    };

    const toggleInfo = () => setShowInfo((prev) => !prev);
    const toggleAddress = () => setShowAddress((prev) => !prev);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Supplier Data:', newValues);
    };

    return (
        <Box sx={{ display: 'flex' }}>
         
            <Box sx={{ width: '250px' }}>
                <Sidebar />  
            </Box>

           
            <Box sx={{ flex: 1, p: 3 }}>
               
                <Box sx={{ mb: 4, textAlign: 'left', mt: 8 }}>
    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        Cadastro de Fornecedor
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

            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleInfo}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Informações Gerais
                </Typography>
               
            </Box>
         
                <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            label="Nome do Fornecedor"
                            name="supplierName"
                            onChange={handleChange}
                            required
                            value={newValues?.supplierName || ""}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            label="CNPJ/CPF"
                            name="supplierDocument"
                            onChange={handleChange}
                            required
                            value={newValues?.supplierDocument || ""}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            label="E-mail"
                            name="supplierEmail"
                            onChange={handleChange}
                            required
                            value={newValues?.supplierEmail || ""}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            label="Telefone"
                            name="supplierPhone"
                            onChange={handleChange}
                            value={newValues?.supplierPhone || ""}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

            <Divider sx={{ my: 3 }} />

    
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleAddress}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Endereço
                </Typography>
               
            </Box>
          
                <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            label="CEP"
                            name="addressZipCode"
                            onChange={handleChange}
                            required
                            value={newValues?.addressZipCode || ""}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            label="Logradouro"
                            name="addressStreet"
                            onChange={handleChange}
                            required
                            value={newValues?.addressStreet || ""}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            label="Cidade"
                            name="addressCity"
                            onChange={handleChange}
                            required
                            value={newValues?.addressCity || ""}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            label="Estado"
                            name="addressState"
                            onChange={handleChange}
                            required
                            value={newValues?.addressState || ""}
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
        }
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
