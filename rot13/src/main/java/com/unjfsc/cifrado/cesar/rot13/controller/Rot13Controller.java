package com.unjfsc.cifrado.cesar.rot13.controller;

import com.unjfsc.cifrado.cesar.rot13.services.Rot13Service;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/rot13")
public class Rot13Controller {

    private final Rot13Service rot13Service;

    // Inyección de dependencias por constructor
    public Rot13Controller(Rot13Service rot13Service) {
        this.rot13Service = rot13Service;
    }

    @PostMapping("/procesar")
    public Map<String, String> procesar(@RequestBody Map<String, String> request) {
        String textoOriginal = request.getOrDefault("texto", "");
        String textoProcesado = rot13Service.cifrarDescifrar(textoOriginal);

        // Retorna un JSON con la respuesta para el frontend
        return Map.of("resultado", textoProcesado);
    }
}