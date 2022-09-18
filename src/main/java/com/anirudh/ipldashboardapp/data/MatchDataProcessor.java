package com.anirudh.ipldashboardapp.data;
import com.anirudh.ipldashboardapp.entity.Match;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.ItemProcessor;

import java.time.LocalDate;

public class MatchDataProcessor implements ItemProcessor<MatchInput, Match> {

    private static final Logger log = LoggerFactory.getLogger(MatchDataProcessor.class);

    @Override
    public Match process(final MatchInput matchInput) throws Exception {

        // take input from MatchInput and transform it into desired format, i.e., Match.
        Match match = new Match();

        // values that are going to be the same
        match.setId(Long.parseLong(matchInput.getId()));
        match.setCity(matchInput.getCity());
        match.setDate(LocalDate.parse(matchInput.getDate()));
        match.setPlayerOfMatch(matchInput.getPlayer_of_match());
        match.setVenue(match.getVenue());

            // now we want to assign team1 as the team that batted first.
            // if the toss winner decided to bat first, then the first innings is the toss winner - otherwise the toss winner becomes the 2nd team
        String firstInningsTeam, secondInningsTeam;
        // if the toss_decision is bat, then we assume and set the firstInningsTeam as the tossWinner else the secondInningsTeam is the tossWinner
        if("bat".equals(matchInput.getToss_decision())) {
            firstInningsTeam = matchInput.getToss_winner();
            secondInningsTeam = matchInput.getToss_winner().equals(matchInput.getTeam1()) ? matchInput.getTeam2() : matchInput.getTeam1();
        }
        else {
            secondInningsTeam = matchInput.getToss_winner();
            firstInningsTeam = matchInput.getToss_winner().equals(matchInput.getTeam2()) ? matchInput.getTeam1() : matchInput.getTeam2();
        }
        match.setTeam1(firstInningsTeam);
        match.setTeam2(secondInningsTeam);

        match.setTossWinner(matchInput.getToss_winner());
        match.setTossDecision(matchInput.getToss_decision());
        match.setMatchWinner(matchInput.getWinner());
        match.setResult(matchInput.getResult());
        match.setResultMargin(match.getResultMargin());
        match.setUmpire1(matchInput.getUmpire1());
        match.setUmpire2(matchInput.getUmpire2());

        return match;









//        final String firstName = person.getFirstName().toUpperCase();
//        final String lastName = person.getLastName().toUpperCase();
//
//        final Person transformedPerson = new Person(firstName, lastName);
//
//        log.info("Converting (" + person + ") into (" + transformedPerson + ")");
//
//        return transformedPerson;
    }
}