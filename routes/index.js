var express        = require('express');
var Route          = express.Router();
var eachAsync 	   = require('each-async');

var db = require('../db');
var async = require('async');

var groupQuery = "select c.clubId, (select teamName from team t where t.teamId = c.teamId)clubName, sum(case when ((c.clubId = m.homeClubId) and m.homeScore > if(isnull(m.awayScore), 0, m.awayScore)) then 3 when ((c.clubId = m.awayClubId) and m.awayScore > if(isnull(m.homeScore), 0, m.homeScore)) then 3 when (not(isnull(m.awayScore) and isnull(m.homeScore)) and m.homeScore = m.awayScore) then 1 when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end) points, sum(if(isnull(m.homeScore) and isnull(m.awayScore), 0, 1)) played, sum(if((((c.clubId = m.homeClubId) and m.homeScore > if(isnull(m.awayScore), 0, m.awayScore)) or ((c.clubId = m.awayClubId) and m.awayScore > if(isnull(m.homeScore), 0, m.homeScore))), 1, 0)) won, sum(case when (not(isnull(m.awayScore) and isnull(m.homeScore)) and m.homeScore = m.awayScore) then 1 when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end) drawn, sum(case when ((c.clubId = m.homeClubId) and if(isnull(m.homeScore), 0, m.homeScore) < if(isnull(m.awayScore), 0, m.awayScore)) then 1 when ((c.clubId = m.awayClubId) and if(isnull(m.awayScore), 0, m.awayScore) < if(isnull(m.homeScore), 0, m.homeScore)) then 1 when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end) lost, sum(case when ((c.clubId = m.homeClubId) and m.homeScore > if(isnull(m.awayScore), 0, m.awayScore)) then m.homeScore when ((c.clubId = m.homeClubId) and m.homeScore < if(isnull(m.awayScore), 0, m.awayScore)) then m.homeScore when ((c.clubId = m.awayClubId) and m.awayScore > if(isnull(m.homeScore), 0, m.homeScore)) then m.awayScore when ((c.clubId = m.awayClubId) and m.awayScore < if(isnull(m.homeScore), 0, m.homeScore)) then m.awayScore when (not(isnull(m.awayScore) and isnull(m.homeScore)) and m.homeScore = m.awayScore) then m.homeScore when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end) `for`, sum(case when ((c.clubId = m.homeClubId) and if(isnull(m.homeScore), 0, m.homeScore) < if(isnull(m.awayScore), 0, m.awayScore)) then if(isnull(m.awayScore), 0, m.awayScore) when ((c.clubId = m.homeClubId) and if(isnull(m.homeScore), 0, m.homeScore) > if(isnull(m.awayScore), 0, m.awayScore)) then if(isnull(m.awayScore), 0, m.awayScore) when ((c.clubId = m.awayClubId) and if(isnull(m.awayScore), 0, m.awayScore) < if(isnull(m.homeScore), 0, m.homeScore)) then if(isnull(m.homeScore), 0, m.homeScore) when ((c.clubId = m.awayClubId) and if(isnull(m.awayScore), 0, m.awayScore) > if(isnull(m.homeScore), 0, m.homeScore)) then if(isnull(m.homeScore), 0, m.homeScore) when (not(isnull(m.awayScore) and isnull(m.homeScore)) and m.homeScore = m.awayScore) then m.homeScore when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end) `against`,sum(((case when ((c.clubId = m.homeClubId) and m.homeScore > if(isnull(m.awayScore), 0, m.awayScore)) then m.homeScore when ((c.clubId = m.homeClubId) and m.homeScore < if(isnull(m.awayScore), 0, m.awayScore)) then m.homeScore when ((c.clubId = m.awayClubId) and m.awayScore > if(isnull(m.homeScore), 0, m.homeScore)) then m.awayScore when ((c.clubId = m.awayClubId) and m.awayScore < if(isnull(m.homeScore), 0, m.homeScore)) then m.awayScore when (not(isnull(m.awayScore) and isnull(m.homeScore)) and m.homeScore = m.awayScore) then m.homeScore when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end)-(case when ((c.clubId = m.homeClubId) and if(isnull(m.homeScore), 0, m.homeScore) < if(isnull(m.awayScore), 0, m.awayScore)) then if(isnull(m.awayScore), 0, m.awayScore) when ((c.clubId = m.homeClubId) and if(isnull(m.homeScore), 0, m.homeScore) > if(isnull(m.awayScore), 0, m.awayScore)) then if(isnull(m.awayScore), 0, m.awayScore) when ((c.clubId = m.awayClubId) and if(isnull(m.awayScore), 0, m.awayScore) < if(isnull(m.homeScore), 0, m.homeScore)) then if(isnull(m.homeScore), 0, m.homeScore) when ((c.clubId = m.awayClubId) and if(isnull(m.awayScore), 0, m.awayScore) > if(isnull(m.homeScore), 0, m.homeScore)) then if(isnull(m.homeScore), 0, m.homeScore) when (not(isnull(m.awayScore) and isnull(m.homeScore)) and m.homeScore = m.awayScore) then m.homeScore when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end))) different from `match` m, club c where (((m.homeClubId = ? or m.awayClubId = ?) and c.clubId = ?) or ((m.homeClubId = ? or m.awayClubId = ?) and c.clubId = ?) or ((m.homeClubId = ? or m.awayClubId = ?) and c.clubId = ?) or ((m.homeClubId = ? or m.awayClubId = ?) and c.clubId = ?) or ((m.homeClubId = ? or m.awayClubId = ?) and c.clubId = ?)) and m.leagueId = 1  group by c.clubId order by points desc, different desc"

var playersStat = 'select concat(u.lastName, u.firstName)playerName, p.position, p.squadNumber, count(distinct m.matchId)`played`, sum(if(r.recordName = "out", 1, 0))`out`, sum(if(r.recordName = "in", 1, 0))`in`, sum(if(r.recordName = "goalScored", 1, 0))`goalScored`, sum(if(r.recordName = "penaltyScored", 1, 0))`penaltyScored`, sum(if(r.recordName = "ownGoal", 1, 0))`ownGoal`, sum(if(r.recordName = "penaltyMissed", 1, 0))`penaltyMissed`, sum(if(r.recordName = "yellowCard", 1, 0))`yellowCard`, sum(if(r.recordName = "redCard", 1, 0))`redCard`, sum(if(r.recordName = "secondYellowCard", 1, 0))`secondYellowCard` from club c, player p left outer join lineup l on p.playerId = l.playerId left outer join `match` m on m.matchId = l.matchId left outer join record r on r.lineupId = l.lineupId left outer join user u on u.userId = p.userId where p.clubId = ? and p.clubId = c.clubId and c.leagueId = 1 group by p.playerId order by field(p.position, "GK", "DF", "MF", "FW"), p.squadNumber asc';


var aGroupId = [2, 3, 4, 7, 8];
var bGroupId = [1, 5, 6, 9, 10];


Route
	.get('/', function (req, res){

		async.parallel([
			function (callback) {
			    db.pool.acquire(function(err, conn){
			        if(err) console.error('err : ', err);
			        conn.query(groupQuery, [
			        	aGroupId[0], aGroupId[0], aGroupId[0],
			        	aGroupId[1], aGroupId[1], aGroupId[1],
			        	aGroupId[2], aGroupId[2], aGroupId[2],
			        	aGroupId[3], aGroupId[3], aGroupId[3],
			        	aGroupId[4], aGroupId[4], aGroupId[4] ], function (err, groupA) {

			            if (err) console.error('err : ', err);

						callback(null, groupA);
			        });
			        db.pool.release(conn);
			    });
			},
			function (callback) {
			    db.pool.acquire(function(err, conn){
			        if(err) console.error('err : ', err);
			        conn.query(groupQuery, [
			        	bGroupId[0], bGroupId[0], bGroupId[0],
			        	bGroupId[1], bGroupId[1], bGroupId[1],
			        	bGroupId[2], bGroupId[2], bGroupId[2],
			        	bGroupId[3], bGroupId[3], bGroupId[3],
			        	bGroupId[4], bGroupId[4], bGroupId[4] ], function (err, groupB) {

			            if (err) console.error('err : ', err);

						callback(null, groupB);
			        });
			        db.pool.release(conn);
			    });
			},
			function (callback) {
			    db.pool.acquire(function(err, conn){
			        if(err) console.error('err : ', err);
			        conn.query('select (select concat(lastName, firstName)playerName from user u where p.userId = u.userId)playerName, (select teamName from team t where t.teamId = c.teamId)clubName, count(distinct m.matchId)`played`, sum(if(r.recordName = "goalScored", 1, 0))`goalScored` from club c, player p left outer join lineup l on p.playerId = l.playerId left outer join `match` m on m.matchId = l.matchId left outer join record r on r.lineupId = l.lineupId where p.clubId = c.clubId and m.leagueId = 1 group by p.playerId order by goalScored desc, played asc limit 8', [], function (err, topScored) {
			            if (err) console.error('err : ', err);

						callback(null, topScored);
			        });
			        db.pool.release(conn);
			    });
			},
			function (callback) {
			    db.pool.acquire(function(err, conn){
			        if(err) console.error('err : ', err);
			        conn.query('select m.matchId, m.matchName, month(m.kickoffTime) month, DAY(m.kickoffTime) day, hour(m.kickoffTime) hour, m.homeClubId, (select (select teamName from team t where t.teamId = c.teamId)clubName from club c where m.homeClubId = c.clubId)homeClubName, m.awayClubId, (select (select teamName from team t where t.teamId = c.teamId)clubName from club c where m.awayClubId = c.clubId)awayClubName, if ( m.kickoffTime < now() and isnull(m.homeScore), 0, m.homeScore) homeScore, if ( m.kickoffTime < now() and isnull(m.awayScore), 0, m.awayScore) awayScore, m.leagueId, m.stadium, m.note, m.link from `match` m where m.leagueId = 1 order by kickoffTime', [], function (err, matches) {
			            if (err) console.error('err : ', err);
						callback(null, matches);
			        });
			        db.pool.release(conn);
			    });
			},
			function (callback) {
				var clubOrder = [2, 3, 6, 7, 5, 8, 9, 10, 1, 4];
				var clubs = [];
				eachAsync(clubOrder, function (clubId, index, done) {
				    db.pool.acquire(function(err, conn){
				        if(err) console.error('err : ', err);
				        conn.query(playersStat, [clubId], function (err, playersStat) {
				            if (err) console.error('err : ', err);
				            clubs.push([clubId, playersStat]);
						    done();
				        });
				        db.pool.release(conn);
				    });
				}, function (error) {
					callback(null, clubs);
				});

			}
		],function (err, results) {

			var index 	  	  = {};
			index.aGroup  	  = results[0];
			index.bGroup  	  = results[1];
			index.topScored   = results[2];
			index.matches 	  = results[3];
			index.playersStat = results[4];
			res.render('index', {index : index});

			console.log("matches    :  ", index.matches);


		});

	})
	.post('/contact', function (req, res){
		console.log('req.body   : ', req.body);
		var data = [
			req.body.contact_name,
			req.body.contact_email,
			req.body.contact_phone,
			req.body.contact_clubName,
			req.body.contact_message
		];

	    db.pool.acquire(function(err, conn){
	        if(err) console.error('err : ', err);
	        conn.query('insert into message(name, email, tel, clubName, message) values( ?, ?, ?, ?, ?)', data, function (err, result) {

	            if (err) {
	            	console.error('err : ', err);
	            	res.json(500, {message : "실패하였습니다."});
	            }

	            if (result.affectedRows > 0) {
	            	res.json(200, {message : "성공~"});
	            } else {
	            	res.json(500, {message : "실패여"});
	            }

	        });
	        db.pool.release(conn);
	    });

	});

module.exports = Route;




