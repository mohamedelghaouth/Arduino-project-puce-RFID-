package fr.univlyon1.tiw8.rfid.domain;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Person {
    @Id
    private int rfid;
    private String firstName;
    private String lastName;

    public Person(){}

    public Person(String firstName, String lastName, int rfid) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.rfid = rfid;
    }
    public int getRfid() {
        return rfid;
    }
    public void setRfid(int rfid) {
        this.rfid = rfid;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
