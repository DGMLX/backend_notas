import { pool } from "../../conexion.js"

// ------------------ CONSULTAS GET ---------------------------

export const obtenerNotasSQL =async () =>{
    const [resultado] = await pool.query("SELECT n.id_notas,n.titulo,n.descripcion,n.fecha_creacion,n.fecha_actualizacion,c.nombre_categoria FROM NOTAS n JOIN CATEGORIA c ON n.id_categoria = c.id_categoria WHERE n.estado = ?;",['valido'])
    return resultado
}

export const obtenerNotasEliminadasSQL =async () =>{
    const [resultado] = await pool.query("SELECT n.id_notas,n.titulo,n.descripcion,n.fecha_creacion,n.fecha_actualizacion,c.nombre_categoria FROM NOTAS n JOIN CATEGORIA c ON n.id_categoria = c.id_categoria WHERE n.estado = ?;",['eliminado'])
    return resultado
}

export const obtenerCategoriasSQL = async () =>{
    const [resultado] = await pool.query("SELECT * FROM categoria");
    return resultado
}

export const obtenerIdCategoriaSQL = async(nombre)=>{
    const [resultado] = await pool.query("SELECT id_categoria from categoria where nombre_categoria = ?;",[nombre])
    return resultado
}


// ------------------ CONSULTAS POST ---------------------------

export const agregarNotaSQL = async (data) =>{
    const {titulo,descripcion,categoria} = data

    const [hayCategoria] = await pool.query("SELECT nombre_categoria from categoria where id_categoria = ?;",[categoria])    
  
    if(hayCategoria.length == 0){
        const [resultado1] = await pool.query("INSERT INTO CATEGORIA (nombre_categoria) VALUES (?);",[categoria])
        const [resultado] = await pool.query("INSERT INTO NOTAS (titulo,descripcion,estado,fecha_creacion,id_categoria) VALUES(?,?,'valido',CURDATE(),?);",[titulo,descripcion,resultado1.insertId]);
        return resultado
    }else{
        const [resultado] = await pool.query("INSERT INTO NOTAS (titulo,descripcion,estado,fecha_creacion,id_categoria) VALUES(?,?,'valido',CURDATE(),?);",[titulo,descripcion,categoria]);
        return resultado
    }
    
    
}


// ------------------ CONSULTAS PUT ---------------------------

export const eliminarNotaSQL = async (id) =>{
    const [resultado] = await pool.query("update notas set estado = 'eliminado' where id_notas = ?;",[id]);
    return resultado
}

export const restaurarNotaSQL = async (id) =>{
    const [resultado] = await pool.query("update notas set estado = 'valido' where id_notas = ?;",[id]);
    return resultado
}

export const actualizarNotaSQL = async (nota) =>{
    const dato = await pool.query("SELECT nombre_categoria from categoria where id_categoria = ?",[nota.categoria])
    if(dato[0].length === 0){
        const [resultado1] = await pool.query("INSERT INTO CATEGORIA (nombre_categoria) VALUES (?);",[nota.categoria])
        console.log(resultado1)
        const [resultado] = await pool.query("update notas set titulo= ?,descripcion = ?,id_categoria= ?, fecha_actualizacion = CURDATE() where id_notas = ?;",[nota.titulo,nota.descripcion,resultado1.insertId,nota.id]);
        return resultado
    }else{
          const [resultado] = await pool.query("update notas set titulo = ?,descripcion = ?, id_categoria = ?,fecha_actualizacion =CURDATE()  where id_notas = ?;",[nota.titulo,nota.descripcion,nota.categoria,nota.id]);
        return resultado
     }
}


// ------------------ CONSULTAS DELETE ---------------------------

export const eliminarNotaDefinitivoSQL =async(id) =>{
    
    const [resultado] = await pool.query("delete from notas where id_notas=?;",[id]);
    return resultado
}