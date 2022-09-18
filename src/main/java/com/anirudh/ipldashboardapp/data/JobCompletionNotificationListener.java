package com.anirudh.ipldashboardapp.data;

import com.anirudh.ipldashboardapp.entity.Team;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.Entity;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.HashMap;
import java.util.List;
import java.util.*;
import java.lang.*;

@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

    private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

//    private final JdbcTemplate jdbcTemplate;
    private final EntityManager em; // ---> EntityManager is the JPA way of interacting with the database. <---

//    @Autowired
//    public JobCompletionNotificationListener(JdbcTemplate jdbcTemplate) {
//        this.jdbcTemplate = jdbcTemplate;
//    }

    // [part 2] later autowire the EntityManager instead of the JdbcTemplate
    @Autowired
    public JobCompletionNotificationListener(EntityManager em) {
        this.em = em;
    }

    @Override
    @Transactional // we picked the shared EntityManager and we wanted the dependency to inject the EntityManager - so we have to use @Transactional
    public void afterJob(JobExecution jobExecution) {
//        if(jobExecution.getStatus() == BatchStatus.COMPLETED) {
//            log.info("!!! JOB FINISHED! Time to verify the results");
//            jdbcTemplate.query("SELECT team1, team2, date FROM match",
//                    (rs, row) -> "Team 1 " + rs.getString(1) +
//                            "Team 2 " + rs.getString(2) +
//                            "Date " + rs.getString(3)
//            ).forEach(str -> System.out.println(str));


        // part 2
        if(jobExecution.getStatus() == BatchStatus.COMPLETED) {
            log.info("!!! JOB FINISHED! Time to verify the results");
            // Map of team names to team instances
            Map<String, Team> teamData = new HashMap<>();

                //The IDEA: ---> select distinct team1 from Match m union select distinct union team2 from Match m <---
            em.createQuery("select m.team1, count(*) from Match m group by m.team1", Object[].class).getResultList()
                    .stream()
                    .map(e -> new Team((String) e[0], (long) e[1]))
                    .forEach(team -> teamData.put(team.getTeamName(), team));

            em.createQuery("select m.team2, count(*) from Match m group by m.team2", Object[].class)
                    .getResultList()
                    .stream()
                    .forEach(e -> {
                        Team team = teamData.get((String) e[0]);
                        team.setTotalMatches(team.getTotalMatches() + (long)e[1]);
                    });

            // now we have to create a team for each row in the match table. Get each unique team and create a new record for each of the unique teams
                // use the EntityManager to get all the unique team

            // all the times a particular team shows up in the Match Winner column, and the count.

            em.createQuery("select m.matchWinner, count(*) from Match m group by m.matchWinner", Object[].class)
                    .getResultList()
                    .stream()
                    .forEach(e -> {
                        Team team = teamData.get((String) e[0]);
                        if(team != null)
                            team.setTotalWins((long)e[1]);
                    });

            teamData.values().forEach(team -> em.persist(team));

            teamData.values().forEach(team -> System.out.println(team)); // using the toString in Team.java

        }
    }
}