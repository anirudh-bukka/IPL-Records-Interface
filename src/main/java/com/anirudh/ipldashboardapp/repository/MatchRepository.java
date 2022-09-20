package com.anirudh.ipldashboardapp.repository;

import com.anirudh.ipldashboardapp.entity.Match;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface MatchRepository extends CrudRepository<Match, Long> {
//    List<Match> getByTeam1(String teamName); // Gives all the Match instances where the value of Team1 is the teamName we are passing
    // OR:
    List<Match> getByTeam1OrTeam2OrderByDateDesc(String teamName1, String teamName2, Pageable pageable); // Telling JPA to get all the matches where Team1 = teamName1 or Team2 = teamName2

//    List<Match> getByTeam1OrTeam2AndDateBetweenOrderByDateDesc(String teamName1, String teamName2, LocalDate date1, LocalDate date2); // <--- shows even 2020 even if request param is 2018 because Team1 OR Team2AndOrderbyDate is happening.

//    List<Match> getByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(String teamName1, LocalDate date1, LocalDate date2, String teamName2, LocalDate date3, LocalDate date4);
    @Query("select m from Match m where (m.team1 =:teamName or m.team2 =:teamName) and (m.date between :dateStart and :dateEnd) order by date desc")
    List<Match> getMatchesByTeamBetweenDates(@Param("teamName") String teamName, @Param("dateStart") LocalDate dateStart, @Param("dateEnd") LocalDate dateEnd);

    // alternative to creating a DAO
    default List<Match> findLatestMatchesByTeam(String teamName, int count) {
        return getByTeam1OrTeam2OrderByDateDesc(teamName, teamName, PageRequest.of(0, count));
        // but now we want all matches of a team by year.

    }
}
