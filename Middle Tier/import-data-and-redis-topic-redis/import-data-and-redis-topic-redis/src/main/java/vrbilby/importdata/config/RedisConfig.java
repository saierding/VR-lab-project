package vrbilby.importdata.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import vrbilby.importdata.service.MessageReceiver;

@Configuration //same to beans in xml
public class RedisConfig {

  /**
   * redis message listener container
   * You can add multiple redis listeners that listen to different topics. You only need to bind the message listener to the corresponding message subscription processor. The message listener invokes the message through reflection technology.
   * Subscribe to the processor's related methods for some business processing
   * @param connectionFactory
   * @param listenerAdapter
   * @return
   */
  @Bean //same to bean in xml
  RedisMessageListenerContainer container(RedisConnectionFactory connectionFactory,
      MessageListenerAdapter listenerAdapter) {

    RedisMessageListenerContainer container = new RedisMessageListenerContainer();
    container.setConnectionFactory(connectionFactory);
    //subscribe a channel called chat
////    container.addMessageListener(listenerAdapter, new PatternTopic("line"));
////    container.addMessageListener(listenerAdapter, new PatternTopic("total"));
////    container.addMessageListener(listenerAdapter, new PatternTopic("analyse"));
////    container.addMessageListener(listenerAdapter, new PatternTopic("historyValue"));
////    container.addMessageListener(listenerAdapter, new PatternTopic("chat"));

    //this container can add many messageListener
    return container;
  }

  /**
   * Message listener adapter, binding message handler, business method of calling message processor using reflection technology
   * @param receiver
   * @return
   */
  @Bean
  MessageListenerAdapter listenerAdapter(MessageReceiver receiver) {
    // This place is a processor that accepts a message to the messageListenerAdapter, using the reflection method to call "receiveMessage"
     // There are several overload methods, the default call to the processor method called handleMessage can see the source itself
    return new MessageListenerAdapter(receiver, "receiveMessage");
  }

  /**redis template used for read data*/
  @Bean
  StringRedisTemplate template(RedisConnectionFactory connectionFactory) {
    return new StringRedisTemplate(connectionFactory);
  }

}
