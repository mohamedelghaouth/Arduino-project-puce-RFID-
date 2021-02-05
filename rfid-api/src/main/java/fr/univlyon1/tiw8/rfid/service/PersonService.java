package fr.univlyon1.tiw8.rfid.service;

import fr.univlyon1.tiw8.rfid.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    public boolean personExists(String personId){
        return personRepository
                .findById(personId)
                .isPresent();
    }
}
