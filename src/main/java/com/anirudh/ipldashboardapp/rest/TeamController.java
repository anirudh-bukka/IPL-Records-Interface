package com.anirudh.ipldashboardapp.rest;

import com.anirudh.ipldashboardapp.entity.Team;
import com.anirudh.ipldashboardapp.repository.MatchRepository;
import com.anirudh.ipldashboardapp.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Pageable;

@RestController
@CrossOrigin
public class TeamController {

    private TeamRepository teamRepository;
    private MatchRepository matchRepository;

    public TeamController() {}

    // use dependency injection using constructor
    @Autowired
    public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName) {
    // get data from the database using JPA.
        Team team = teamRepository.findByTeamName(teamName);

        // ---> Not ideal to have this kind of request/method in a "Controller" class, this leads to hard coding the controller.
//        Pageable pageable = PageRequest.of(0, 4);
//        team.setMatches(matchRepository.getByTeam1OrTeam2OrderByDateDesc(teamName, teamName, pageable));

        team.setMatches(matchRepository.findLatestMatchesByTeam(teamName, 4));

        // populate the matches --> using "MatchRepository"
        return team;
    }



}
