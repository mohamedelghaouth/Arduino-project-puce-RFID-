package fr.univlyon1.tiw8.rfid.resource;

import fr.univlyon1.tiw8.rfid.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class PersonResource {

    @Autowired
    private PersonService personService;

    @GetMapping("/person/check/{id}")
    public ResponseEntity<?> personExists(@PathVariable String id){
        boolean hasAccess=personService.personExists(id);
        String fullname=personService.getNameById(id);
        HashMap<String, Object> responseMap = new HashMap<>();
        responseMap.put("hasAccess",hasAccess);
        responseMap.put("fullName",fullname);
        return new ResponseEntity(responseMap, HttpStatus.OK);
    }
}
