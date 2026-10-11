package com.unjfsc.cifrado.cesar.rot13.controller;

import com.unjfsc.cifrado.cesar.rot13.services.Rot13Service;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class Rot13Controller {

    private final Rot13Service rot13Service;

    public Rot13Controller(Rot13Service rot13Service) {
        this.rot13Service = rot13Service;
    }

    // Renderiza la vista principal usando Thymeleaf (templates/index.html)
    @GetMapping("/")
    public String index() {
        return "index";
    }

    // API REST para procesar el texto (Cifrar / Descifrar)
    @PostMapping("/api/rot13/procesar")
    @ResponseBody
    public Map<String, String> procesar(@RequestBody Map<String, String> request) {
        String textoOriginal = request.getOrDefault("texto", "");
        String textoProcesado = rot13Service.cifrarDescifrar(textoOriginal);
        return Map.of("resultado", textoProcesado);
    }
}