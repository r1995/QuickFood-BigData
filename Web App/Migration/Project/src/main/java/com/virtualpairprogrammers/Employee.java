package com.virtualpairprogrammers;
import java.io.Serializable;

public  class Employee implements Serializable{
	private String name;
    //private Integer age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    //public Integer getAge() {
    //    return age;
    //}

    //public void setAge(final Integer age) {
     //   this.age = age;
    //}
}