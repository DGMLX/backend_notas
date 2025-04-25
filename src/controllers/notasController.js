import { actualizarNotaSQL, agregarNotaSQL, eliminarNotaDefinitivoSQL, eliminarNotaSQL, obtenerCategoriasSQL, obtenerIdCategoriaSQL, obtenerNotasEliminadasSQL, obtenerNotasFiltradasSQL, obtenerNotasSQL, restaurarNotaSQL } from "../consultas/NotasConsultas.js";

// --------------------- PETICIONES GET -------------------------
export const obtenerNotas = async(req,res) =>{
    try {
        const data = await obtenerNotasSQL();
        res.json(data)
    } catch (error) {
        res.status(404).json({mensaje:"No se pudieron obtener las tareas"})
    }
}

export const obtenerNotasEliminadas = async(req,res) =>{
    try {
        const data = await obtenerNotasEliminadasSQL();
        res.json(data)
    } catch (error) {
        res.status(404).json({mensaje:"No se pudieron obtener las tareas eliminadas"})
    }
}

export const obtenerCategorias = async(req,res) =>{
    try {
        const data = await obtenerCategoriasSQL();
        res.json(data)
    } catch (error) {
        res.status(404).json({mensaje:"No se pudieron obtener las cateogrias"})
    }
}

export const obtenerNotasFiltradas = async(req,res)=>{
    try {
        const {categoria} = req.params
        console.log(categoria)
        const data = await obtenerNotasFiltradasSQL(categoria)
        res.json(data)
    } catch (error) {
        res.status(404).json({mensaje:"No se pudieron obtener las notas filtradas"})
    }
}

export const obtenerIdCategoria = async(req,res) =>{
    try {
        const {nombre} = req.params
        const data = await obtenerIdCategoriaSQL(nombre);
        res.json(data)
    } catch (error) {
        res.status(404).json({mensaje:"No se pudo obtener el Id de la categoria"})
    }
}

// --------------------- PETICIONES POST -------------------------
export const agregarNota = async(req,res) =>{
    try {
        const data = await agregarNotaSQL(req.body);
        // res.json(data)
        res.json({"estado":"ok"})
    } catch (error) {
        res.status(404).json({mensaje:"Error al agregar la nota"})
    }
}

// --------------------- PETICIONES PUT -------------------------
export const eliminarNota = async(req,res)=>{
    try {
        const {id} = req.params
        
        const data = await eliminarNotaSQL(id);
        res.json(data)
    } catch (error) {
        res.status(404).json({mensaje:"No se pudo cambiar el estado a eliminado de la nota"})
    }
}

export const restaurarNota = async(req,res)=>{
    try {
        const {id} = req.params
        const data = await restaurarNotaSQL(id);
        res.json(data)
    } catch (error) {
        res.status(404).json({mensaje:"No se pudo cambiar el estado a eliminado de la nota"})
    }
}

export const actualizarNota = async(req,res) =>{
    try {
        const data = req.body
        console.log(data)
        await actualizarNotaSQL(data)
        res.json({'mensaje':'ok'})
    } catch (error) {
        res.status(404).json({mensaje:"No se pudo actualizar la nota"})
    }
}

// --------------------- PETICIONES DELETE -------------------------
export const eliminarNotaDefinitivo = async(req,res) =>{
    try {
        const {id} = req.params
        const data = await eliminarNotaDefinitivoSQL(id);
        console.log(data)
        res.json(data)
    } catch (error) {
        res.status(404).json({mensaje:"No se pudo eliminar de forma definitiva la nota"})
    }
}

