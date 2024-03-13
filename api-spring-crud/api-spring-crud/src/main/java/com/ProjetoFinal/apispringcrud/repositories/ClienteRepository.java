package com.ProjetoFinal.apispringcrud.repositories;

import com.ProjetoFinal.apispringcrud.entities.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository <Cliente, Long> {

    Optional<Cliente> findByNome(String nome);
    Optional<Cliente> findByCPF(String CPF);
    Optional<Cliente> findByEstado(String estado);
    Optional<Cliente> findByEmail(String email);

}
