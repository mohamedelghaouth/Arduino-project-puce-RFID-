package fr.univlyon1.tiw8.rfid.domain;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Archive {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;
    @OneToOne
    private Person person;
    private LocalDateTime time;
    private boolean access;

    public Archive(Person person, LocalDateTime time, boolean access) {
        this.person = person;
        this.time = time;
        this.access = access;
    }

    public Archive(){}

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public boolean isAccess() {
        return access;
    }

    public void setAccess(boolean access) {
        this.access = access;
    }

    public Archive(Person persons, LocalDateTime time) {
        this.person = persons;
        this.time = time;
    }

    public Person getPersons() {
        return person;
    }

    public void setPersons(Person persons) {
        this.person = persons;
    }
    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time= time;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}