const express=require('express');
const app=express();
const PORT=3000
app.use(express.json())

app.use((req, res, next)=>{
    console.log(req.method, req.path);
    next();
});

app.get('/inicio',(req,res)=>{
    res.json({mensaje:"Hola, esta es mi API de solicitudes"})
});

app.get('/informacion', (req,res)=>{
    res.json({
        nombre: 'API de solicitudes',
        descripcion: 'Servicio para recibir solicitudes de personas interesadas',
        version: '1.0.0'
    });
});

app.post('/solicitudes',(req,res)=>{
    const{nombre,apellido,correo}=req.body;

    if (!nombre || !apellido || !correo) {
        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios'
        });
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo)) {
        return res.status(400).json({
            mensaje: 'el correo electrónico no tiene un formato válido'
        });
    }

    res.status(201).json({
        dato_nombre: nombre,
        dato_apellido: apellido,
        dato_correo: correo,
        mensaje: 'Solicitud recibida'
    });
});

/*puerto*/
app.listen(PORT,()=>{
    console.log("servidor ejecutandose correctamente"+PORT)
});