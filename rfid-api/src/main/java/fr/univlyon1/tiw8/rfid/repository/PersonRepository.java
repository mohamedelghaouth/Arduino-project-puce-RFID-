package fr.univlyon1.tiw8.rfid.repository;

import fr.univlyon1.tiw8.rfid.domain.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<Person,String> {
}
