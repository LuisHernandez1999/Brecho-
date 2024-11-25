import Head from 'next/head';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import Link from 'next/link';

const ResetPassword = () => {
    const [invalidEmail, setInvalidEmail] = useState('');

    const buildResetPasswordConfirmUrl = (email) => {
        return `/${CONST_NAME_PAGE.AUTH}/${CONST_NAME_PAGE.RESET_PASSWORD}/${encodeURIComponent(email)}`;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Email inválido')
                .required('Email é obrigatório')
                .matches(
                    /^[\w._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com)$/,
                    'O e-mail deve ser de um dos domínios permitidos: gmail.com, hotmail.com, yahoo.com, outlook.com'
                ),
            password: Yup.string()
                .required('Senha é obrigatória')
                .min(8, 'A senha deve ter pelo menos 8 caracteres'),
        }),
        onSubmit: async (values) => {
            setInvalidEmail('');
            try {
                const resetPasswordConfirmUrl = buildResetPasswordConfirmUrl(values.email);
                // substituir com a logica do back aqui corno 
                console.log('URL de confirmação:', resetPasswordConfirmUrl);
                alert('E-mail de redefinição de senha enviado com sucesso!');
            } catch (error) {
                console.error('Erro ao enviar o e-mail:', error);
                formik.setErrors({ submit: 'Ocorreu um erro ao enviar o e-mail. Tente novamente.' });
                setInvalidEmail(values.email);
            }
        },
        validateOnChange: false,
        validateOnBlur: true,
    });

    const handleBlur = (e) => {
        formik.handleBlur(e);
        if (formik.errors.email) {
            setInvalidEmail(formik.values.email);
        }
    };

    return (
        <>
            <Head>
                <title>login</title>
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap" rel="stylesheet" />
            </Head>
            <Box
    sx={{
        position: 'absolute', 
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, 
    }}
>
    <Box
        sx={{
            backgroundImage: 'url(/imagens/backinground.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            filter: 'blur(8px)', 
            zIndex: 0, 
        }}
    />

    <Box
        sx={{
            backgroundColor: 'transparent',
            padding: '2.5rem',
            borderRadius: '8px',
            boxShadow: 'none',
            maxWidth: '600px',
            width: '100%',
            textAlign: 'center',
            zIndex: 1, 
        }}
    >
        <Box sx={{ marginBottom: '1rem', marginTop: '-1rem' }}>
            <img src="/imagens/logodefiniti.png"  alt="Logo" style={{ width: '150px' }} />
        </Box>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '2rem',
                            marginBottom: '1.5rem',
                            color: '#000',
                            marginTop: '1.5rem',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 'bold',
                        }}
                    >
                        Brechó da Jujuba
                    </Typography>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '1rem',
                            marginBottom: '1.5rem',
                            color: '#000',
                            marginTop: '1.5rem',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 300,
                        }}
                    >
                        Entre suas credenciais 
                    </Typography>

                    <form onSubmit={formik.handleSubmit}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                fullWidth
                                id="email"
                                label="Email"
                                variant="outlined"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={handleBlur}
                                name="email"
                                sx={{
                                    maxWidth: '600px',
                                    marginBottom: '0.5rem',
                                    fontSize: '1.0625rem',
                                    borderRadius: '12px',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                    },
                                }}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <Typography
                                    color="error"
                                    sx={{
                                        mb: 1,
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {formik.errors.email}
                                </Typography>
                            )}
                            <TextField
                                fullWidth
                                id="password"
                                label="Senha"
                                type="password"
                                variant="outlined"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="password"
                                sx={{
                                    maxWidth: '600px',
                                    marginBottom: '0.5rem',
                                    fontSize: '1.0625rem',
                                    borderRadius: '12px',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                    },
                                }}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <Typography
                                    color="error"
                                    sx={{
                                        mb: 1,
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {formik.errors.password}
                                </Typography>
                            )}
                           <Button
  type="submit"
    sx={{
        width: '100%',
        maxWidth: '600px',
        padding: '1rem',
        backgroundColor:  '#00509E', 
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '0.9375rem',
        cursor: 'pointer',
        height: '3.5rem',
        marginBottom: '0.5rem',
        '&:hover': {
            backgroundColor: '', 
        },
    }}
>
    Entrar
</Button>
<Typography
    variant="h1"
    sx={{
        fontSize: '1rem',
        marginBottom: '1.5rem',
        color: '#00509E',
        marginTop: '1.5rem',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 600,
        cursor: 'pointer',
    }}
>
    <Link href="/pagina-destino"> 
        Esqueceu a senha?
    </Link>
</Typography>
                        </Box>
                        {formik.errors.submit && (
                            <Typography
                                color="error"
                                sx={{
                                    mt: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                                variant="body2"
                            >
                                {formik.errors.submit}
                            </Typography>
                        )}
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default ResetPassword;
