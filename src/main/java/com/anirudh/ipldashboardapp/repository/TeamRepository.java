package com.anirudh.ipldashboardapp.repository;

import com.anirudh.ipldashboardapp.entity.Team;
import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Team, Long> {
    // CrudRepository is a base classes which allows interface to actual magic happen in JPA (WHAT???)

    Team findByTeamName(String teamName);

}
