import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  countAverageCorrectAnswers,
  countAverageCorrectRate,
  countCompletionRate,
} from "./helper";
import "./Profile.css";
const Profile = () => {
  const [userData, setUserData] = useState(null);

  const history = useHistory();

  const params = {
    google_id: `${localStorage.getItem("tokenId").slice(1, -1)}`,
  };
  const getUserData = async () => {
    if (!localStorage.getItem("tokenId")) {
      history.push("/");
      return;
    }

    const data = await axios.get(`http://liscrabble.com/users/userpuzzle`, {
      params,
    });
    setUserData(data.data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="ProfileSection">
      <div className="ProfileData">
        <div className="ProfileName">{userData?.first_name}'s Profile</div>
        <div className="ProfileStatistic">
          <div>
            Average Completion Rate: {countCompletionRate(userData?.puzzles)}%
          </div>
          <div>
            Average Correct Rate: {countAverageCorrectRate(userData?.puzzles)}%
          </div>
          <div>
            Average Correct Answers:{" "}
            {countAverageCorrectAnswers(userData?.puzzles)}
          </div>
        </div>
      </div>
      <div className="ProfilePuzzleHistory">
        <div className="ProfileHistoryHeaderContainer">
          <div className="ProfileHistoryHeader">Puzzle History</div>
          <div className="ProfileHistoryTableHead">
            <div className="LettersHead">Letters</div>
            <div className="CorrectAnswersHead">Correct Answers</div>
            <div className="PossibleAnswersHead">Possible Answers</div>
            <div className="ErrorsHead">Errors</div>
          </div>
        </div>
        <div className="ProfileHistoryTable">
          {userData?.puzzles.reverse().map((puzzle) => {
            return (
              <div className="ProfileHistoryTableRow">
                <div className="Letters">{puzzle.letters}</div>
                <div className="CorrectAnswers">{puzzle.correct_answers}</div>
                <div className="PossibleAnswers">{puzzle.possible_answers}</div>
                <div className="Errors">{puzzle.errors}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
