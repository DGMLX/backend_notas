import {Router} from "express"
import { actualizarNota, agregarNota, eliminarNota, eliminarNotaDefinitivo, obtenerCategorias, obtenerIdCategoria, obtenerNotas, obtenerNotasEliminadas, obtenerNotasFiltradas, restaurarNota } from "../controllers/notasController.js"

const router = Router()

router.get("/notas",obtenerNotas);
router.get("/categorias",obtenerCategorias);
router.get("/notasEliminadas",obtenerNotasEliminadas);
router.get("/obtenerIdCategoria/:nombre",obtenerIdCategoria);
router.get("/obtenerNotasFiltradas/:categoria",obtenerNotasFiltradas)

router.post("/agregarNota",agregarNota);

router.put("/eliminarNota/:id",eliminarNota);
router.put("/restaurarNota/:id",restaurarNota);
router.put("/actualizarNota",actualizarNota);

router.delete("/eliminarNotaDefinitiva/:id",eliminarNotaDefinitivo);

export default router;