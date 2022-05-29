import { Availability } from "./availability";
import { Interval } from "./interval";
import { Lady } from "./lady";
import { LangLevel } from "./langLevel";
import { Topic } from "./topic";
import { Adjacency } from "./adjacency";

/* mocking data */

// topics
let topic1: Topic = {id: 1n, name: "Art"};
let topic2: Topic = {id: 2n, name: "Science"};
let topic3: Topic = {id: 3n, name: "Hiking"};
let topic4: Topic = {id: 3n, name: "Music"};
let topic5: Topic = {id: 3n, name: "History"};

// intervals
let interval1: Interval = {from: 10, to: 17};
let interval2: Interval = {from: 12, to: 15};
let interval3: Interval = {from: 8, to: 12};

// availabilities
let availability1: Availability = {weekdays: interval1, weekends: interval2};
let availability2: Availability = {weekdays: interval2, weekends: interval3};
let availability3: Availability = {weekdays: interval3, weekends: interval1};

// ladies matrix
let ladies:Array<Lady> = [
    {id: 1n, name: "Olivia", langLevel: LangLevel.B1, availability: availability1, topics: [topic1, topic2, topic5]},
    {id: 2n, name: "Emma", langLevel: LangLevel.Fluent, availability: availability3, topics: [topic3, topic2, topic4]},
    {id: 3n, name: "Zoey", langLevel: LangLevel.C2, availability: availability2, topics: [topic5, topic2, topic3]}
];

// adjacency matrix
let adjacencyMatrix:Array<Adjacency> = [];

// the method that populates adjacency matrix and calculates the weight f (follow coefficient from design document)
// in real application, should be saved to DB and fetched from it
function populateAdjacencyMatrix():void{
    // loop through each lady
    // this is done here for an example, but as suggested in design, there should be more performant way to do so
    ladies.forEach((lady:Lady) => {
        // loop through array of other ladies
        ladies.filter( (ladyTemp:Lady) => { return lady.id !== ladyTemp.id } )
        .forEach((adjacentLady:Lady) => {
            adjacencyMatrix.push({
                l1: lady,
                l2: adjacentLady,
                f: mutualInterests(lady.topics, adjacentLady.topics).length,
                t: 0, // mock to 0
                w: 0 // mock to 0
            });
        });
    });
}

// the method that returns of an array of mutual interests for two ladies
function mutualInterests(topicsLady1:Array<Topic>, topicsLady2: Array<Topic>):Array<Topic>{
    return topicsLady1.filter( (topic:Topic) => {
        return topicsLady2.includes(topic);
    });
}

// the method that returns all the adjacent nodes of a given node
function adjacentNodes(currentUser: Lady):Array<Adjacency>{
    return adjacencyMatrix.filter( (adjacentNode: Adjacency) => {
        return adjacentNode.l1 === currentUser;
    });
}

// the function that implements simple matching algorithm and returns 5 follow suggestions by default
function suggestedFollows(currentUser: Lady, followsCount: number = 5):Array<Lady> {

    // DESC sort adjacencies of other members to current lady 
    let adjacentNodesSorted:Array<Adjacency> = adjacentNodes(currentUser).sort( (a:Adjacency, b: Adjacency) => {
        return b.f - a.f; 
    });
    
    // map adjacencies to adjacent ladies and return the array
    return adjacentNodesSorted.slice(0, followsCount).map( (a:Adjacency) => {
        return a.l2;
    });
}

// test the solution
populateAdjacencyMatrix();
console.log(suggestedFollows(ladies[0], 1));