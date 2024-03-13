package com.ProjetoFinal.apispringcrud.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataDeNascimento;

    @Column(nullable = false, unique = true)
    private String CPF;

    @Column(nullable = false)
    private String estado;

    public Cliente() {
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == 0) ? 0 : Long.hashCode(id));
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;

        if (getClass() != obj.getClass())
            return false;
        Cliente other = (Cliente) obj;
        if (id == 0) {
            return other.id == 0;
        } else return id == other.id;
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", dataDeNascimento=" + dataDeNascimento +
                ", CPF='" + CPF + '\'' +
                ", estado='" + estado + '\'' +
                '}';
    }
}
