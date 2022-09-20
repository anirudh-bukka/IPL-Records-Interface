package com.anirudh.ipldashboardapp.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Team {

    public Team() {}

    public Team(String teamName, long totalMatches) {
        this.teamName = teamName;
        this.totalMatches = totalMatches;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String teamName;
    private long totalMatches;
    private long totalWins;
    private String resultMargin;

    public void setId(long id) {
        this.id = id;
    }

    public String getResultMargin() {
        return resultMargin;
    }

    public void setResultMargin(String resultMargin) {
        this.resultMargin = resultMargin;
    }
// Getter and Setter methods

    public long getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public long getTotalMatches() {
        return totalMatches;
    }

    public void setTotalMatches(long totalMatches) {
        this.totalMatches = totalMatches;
    }

    public long getTotalWins() {
        return totalWins;
    }

    public void setTotalWins(long totalWins) {
        this.totalWins = totalWins;
    }

    @Override
    public String toString() {
        return "Team{" +
                "id=" + id +
                ", teamName='" + teamName + '\'' +
                ", totalMatches=" + totalMatches +
                ", totalWins=" + totalWins +
                ", resultMargin='" + resultMargin + '\'' +
                ", matches=" + matches +
                '}';
    }



    // member variable to help you get the latest 3-4 matches.
    @Transient // I want to add match data to the team that goes over the wire as the API response -- and this should not correspond to an extra mapping table in the database.
    private List<Match> matches;

    public List<Match> getMatches() {
        return matches;
    }
    public void setMatches(List<Match> matches) {
        this.matches = matches;
    }
        // --> Now go back to the TeamController class and populate those match values (get latest 4 matches from the match table, populate it and then send the team information)

}
