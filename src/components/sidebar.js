import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FaBox, FaUsers, FaCashRegister } from 'react-icons/fa'; 
import { useRouter } from 'next/router';

export default function Sidebar() {
    const router = useRouter();

    const handleNavigation = (path) => {
        router.push(path);
    };

    return (
        <Box
            sx={{
                width: '250px',
                height: '100vh',
                backgroundColor: '#FFDEEC',
                color: '#000000', 
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed', 
                padding: '1rem',
                paddingTop: '8rem', 
            }}
        >
           
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
             
            </Box>

            <h2 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '2rem', color: '#000000' }}>
            </h2>
            <List>
              
                <ListItem
                    button
                    sx={{
                        marginBottom: '1rem',
                    }}
                    onClick={() => handleNavigation('../../fornecedores/fornecedores_tabela')}
                >
                    <ListItemIcon>
                        <FaUsers color="#000000" size={24} /> 
                    </ListItemIcon>
                    <ListItemText primary="Fornecedores" />
                </ListItem>

               
                <ListItem
                    button
                    sx={{
                        marginBottom: '1rem',
                    }}
                    onClick={() => handleNavigation('../../estoque/estoque_tabela')}
                >
                    <ListItemIcon>
                        <FaBox color="#000000" size={24} /> 
                    </ListItemIcon>
                    <ListItemText primary="Estoque" />
                </ListItem>

       
                <ListItem
                    button
                    sx={{
                        marginBottom: '1rem',
                    }}
                    onClick={() => handleNavigation('/Caixa')}
                >
                    <ListItemIcon>
                        <FaCashRegister color="#000000" size={24} /> 
                    </ListItemIcon>
                    <ListItemText primary="Caixa" />
                </ListItem>
            </List>
        </Box>
    );
}
