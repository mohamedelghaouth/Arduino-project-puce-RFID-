package fr.univlyon1.tiw8.rfid.domain;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Person {

    @Id
    private String id;
    private String firstName;

    public Person(String id, String firstName, String lastName, boolean hasAccess, String rfid) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.hasAccess = hasAccess;
        this.rfid = rfid;
    }

    private String lastName;
    private boolean hasAccess;
    private String rfid;

    public Person(){}
    public boolean isHasAccess() {
        return hasAccess;
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    public void setHasAccess(boolean hasAccess) {
        this.hasAccess = hasAccess;
    }
    public String getRfid() {
        return rfid;
    }
    public void setRfid(String rfid) {
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
