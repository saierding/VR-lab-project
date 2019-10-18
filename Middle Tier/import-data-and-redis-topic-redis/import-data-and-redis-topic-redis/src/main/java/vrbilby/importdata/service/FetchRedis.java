package vrbilby.importdata.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Fetch From redis demo
 * @author
 */
@EnableScheduling
@Component
public class FetchRedis {
    private final Logger log = LoggerFactory.getLogger(FetchRedis.class);
    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Scheduled(fixedRate = 1000)
    public void FetchFromRedis() {
        //key for read
        String key = "E4_Gsr";
        //read
        String value = stringRedisTemplate.opsForValue().get(key);
        //print log
        log.info("Data form redis : {} = {}", key,value);
    }

    @Scheduled(fixedRate = 1000)
    public void FetchFromRedis2() {
        //key for load
        String speedKey = "speed";
        //load
        String value = stringRedisTemplate.opsForValue().get(speedKey);
        //print log
        log.info("===Data form redis : {} = {}", speedKey,value);

        String distanceKey = "distance";
        //load
        String disValue = stringRedisTemplate.opsForValue().get(distanceKey);
        //print log
        log.info("===Data form redis : {} = {}", distanceKey,disValue);

        String spidersKey = "spiders";
        //load
        String spidersValue = stringRedisTemplate.opsForValue().get(spidersKey);
        //print log
        log.info("===Data form redis : {} = {}", spidersKey,spidersValue);
    }
}
