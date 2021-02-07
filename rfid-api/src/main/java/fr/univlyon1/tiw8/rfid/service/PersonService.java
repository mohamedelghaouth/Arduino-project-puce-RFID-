package fr.univlyon1.tiw8.rfid.service;

import fr.univlyon1.tiw8.rfid.domain.Archive;
import fr.univlyon1.tiw8.rfid.domain.Person;
import fr.univlyon1.tiw8.rfid.repository.ArchiveRepository;
import fr.univlyon1.tiw8.rfid.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private ArchiveRepository archiveRepository;

    public boolean personExists(String personId){
        Optional<Person> person = personRepository.findById(personId);
        if(person.isPresent()){
            LocalDateTime currentTime = LocalDateTime.now();
            currentTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            Archive archive= new Archive(person.get(),currentTime,person.get().isHasAccess());
            archiveRepository.save(archive);
            return person.get().isHasAccess();
        }
        return false;
    }
}
