package com.ProjetoFinal.apispringcrud.controllers;

import com.ProjetoFinal.apispringcrud.entities.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.ProjetoFinal.apispringcrud.repositories.ClienteRepository;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/clientes")

public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;
    private String nome;

    @PostMapping("/cadastrar")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Cliente  cadastrar(@RequestBody Cliente cliente ){
        return clienteRepository.save(cliente);
//       System.out.println(cliente);
    }

    @GetMapping("/list")
    public List<Cliente> listar(){
        return clienteRepository.findAll();
    }

    @GetMapping("/{id}")
    public Cliente buscaPorId(@PathVariable Long id){
        var clienteOptional = clienteRepository.findById(id);
        if (clienteOptional.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return clienteOptional.get();
    }

    @GetMapping("/nome/{nome}")
    public Cliente buscaPorNome(@PathVariable String nome){
        this.nome = nome;
        var clienteOptional = clienteRepository.findByNome(nome);
        if (clienteOptional.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return clienteOptional.get();
    }

    @GetMapping("CPF/{cpf}")
    public Cliente buscaPorCpf(@PathVariable String CPF){
        var clienteOptional = clienteRepository.findByCPF(CPF);
        if (clienteOptional.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return clienteOptional.get();
    }

    @GetMapping("UF/{estado}")
    public Cliente buscaPorEstado(@PathVariable String estado){
        var clienteOptional = clienteRepository.findByEstado(estado);
        if (clienteOptional.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return clienteOptional.get();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id){
        var clienteOptional = clienteRepository.findById(id);
        if (clienteOptional.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        clienteRepository.delete(clienteOptional.get());
    }
    @PutMapping("/{id}")
    public  Cliente atualizarPorId(@PathVariable Long id,@RequestBody Cliente cliente){
        var clienteOptional = clienteRepository.findById(id);
        if (clienteOptional.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        cliente.setId(id);
        return clienteRepository.save(cliente);
    }

    @PutMapping("/nome/{nome}")
    public Cliente atualizarPorNome(@PathVariable String nome,@RequestBody Cliente cliente){
        var clienteOptional = clienteRepository.findByNome(nome);
        if (clienteOptional.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        cliente.setNome(nome);
        return  clienteRepository.save(cliente);
    }

    @PutMapping("/email/{email}")
    public Cliente atualizarPorEmail(@PathVariable String email,@RequestBody Cliente cliente){
        var clienteOptional = clienteRepository.findByEmail(email);
        if (clienteOptional.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        cliente.setEmail(email);
        return  clienteRepository.save(cliente);
    }
}