package com.anirudh.ipldashboardapp.rest;

import com.anirudh.ipldashboardapp.entity.Match;
import com.anirudh.ipldashboardapp.entity.Team;
import com.anirudh.ipldashboardapp.repository.MatchRepository;
import com.anirudh.ipldashboardapp.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

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

    @GetMapping("/team")
    public Iterable<Team> getAllTeam() {
//    public List<Team> getAllTeam() {
//        Team team = this.teamRepository.findByTeamName(teamName);
//    }
        return this.teamRepository.findAll();
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

    // Group by any parameter, such as YEAR ---> Basically make this a query param instead of a path param.
    @GetMapping("/team/{teamName}/matches")
    public List<Match> getMatchesForTeam(@PathVariable String teamName, @RequestParam int year) {
        // We can get this information by calling the Repository (MatchRepository)
        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year + 1, 1, 1);

//        return matchRepository.getByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(teamName, startDate, endDate, teamName, startDate, endDate);
        return matchRepository.getMatchesByTeamBetweenDates(teamName, startDate, endDate);
    }

}
