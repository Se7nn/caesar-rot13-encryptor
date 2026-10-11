package com.unjfsc.cifrado.cesar.rot13.service;

import org.springframework.stereotype.Service;

@Service
public class Rot13Service {

    public String cifrarDescifrar(String texto) {
        if (texto == null) {
            return "";
        }

        StringBuilder resultado = new StringBuilder();

        for (int i = 0; i < texto.length(); i++) {
            char c = texto.charAt(i);

            // Letras minúsculas (a-z)
            if (c >= 'a' && c <= 'z') {
                c = (char) ('a' + (c - 'a' + 13) % 26);
            }
            // Letras mayúsculas (A-Z)
            else if (c >= 'A' && c <= 'Z') {
                c = (char) ('A' + (c - 'A' + 13) % 26);
            }
            // Los números, espacios y símbolos se quedan igual

            resultado.append(c);
        }

        return resultado.toString();
    }
}