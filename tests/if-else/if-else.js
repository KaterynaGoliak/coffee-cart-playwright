// voting.js
export function getVotingMessage(age) {
  if (age >= 18) {
    return "Ви можете голосувати.";
  } else {
    return "Ви ще не можете голосувати.";
  }
}
//  console.log(getVotingMessage(17));
//  console.log(getVotingMessage(18));