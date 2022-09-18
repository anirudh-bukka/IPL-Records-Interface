package com.anirudh.ipldashboardapp.repository;

import com.anirudh.ipldashboardapp.entity.Match;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.CrudRepository;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface MatchRepository extends CrudRepository<Match, Long> {
//    List<Match> getByTeam1(String teamName); // Gives all the Match instances where the value of Team1 is the teamName we are passing
    // OR:
    List<Match> getByTeam1OrTeam2OrderByDateDesc(String teamName1, String teamName2, Pageable pageable); // Telling JPA to get all the matches where Team1 = teamName1 or Team2 = teamName2

    // alternative to creating a DAO
    default List<Match> findLatestMatchesByTeam(String teamName, int count) {
        return getByTeam1OrTeam2OrderByDateDesc(teamName, teamName, PageRequest.of(0, count));
    }
}
