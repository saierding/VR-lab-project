package vrbilby.importdata.service;

import org.springframework.stereotype.Component;

@Component
public class MessageReceiver {

  /**function for receice message*/
  public void receiveMessage(String message){
    System.out.println("receive a message："+message);
  }

}

