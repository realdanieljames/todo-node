//require the fs module
// creat an array to hold  the todos once we've loaded them in from csv
// -put in global scope 
//  load in our todos from our csv
// create function called loadTodos
//  const file = fs.readFileSync('./owid-covid-usa-data.csv', 'utf8')

// save return value    into new variable
// split new -lines in variable created
// looop through each, splitting it at evry comma
// push newly created array into todos array
// call node main.js
const fs = require('fs')


toDosArray = []

const loadTodos = function () {
    let file = fs.readFileSync('./todos.csv', 'utf8')
    file = file.split('\n')


    for (const commas of file) {
        toDosArray.push(commas.split(','))
    }
    // console.log(toDosArray)
}

loadTodos()
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//



//  create a new function called displayTodos
// loop through each todo in list and log it to terminal
//  build a nicely-formatted string
// put a '-' in between each todo and completeness 
// add an emoji to represent completeness 
//  ✅ - complete
//  ✖ - uncomplete
// call loadTodos
// call displayTodos
// run node main.js
// expect a nice little list

const displayTodos = function () {
    for (const toDo of toDosArray) {

        if (toDo[1] === 'uncomplete') {
            toDo[1] = '✖'
        }
        if (toDo[1] === 'complete') {
            toDo[1] = '✅'
        }
        const result = toDo[0] + ' - ' + toDo[1]
        console.log(result)
    }

}

displayTodos()
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//


//  require readline
//  const interface = readline.createInterface({input: process.stdin, output: process.stdout})
// use interface's object question -- interface.question
// 2 parameters
// interface.question('a string to print-question the user, function)
//  give the *menu string in readme* to interface question first parameter
// 2nd parameter = handleMenu

const readline = require('readline');
const interface = readline.createInterface({ input: process.stdin, output: process.stdout })
const menu = `
Your options are:

1. Add a todo.
2. Remove a todo.
3. Mark a todo completed.
4. Mark a todo uncompleted.
5. Quit.

`;
// console.log(menu)
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//




// handleMenu function, one parameter
// parameter is equal to whatever the user types in as a response to the MENU options
// check if parameter passed iss equal to string 1, for now
// if it is not a '1' inform the user that they are quitting
// tell node not to listen once they've done their task - interface.close()
//  use interface.close() method to do so 
// call it at the end of the function
// run app - answer menu using '1'
// try another string besides '1' and see if it begins quitting
const handleMenu = function (menuResponse) {
    // menuResponse = process.argv[2]
    if (menuResponse === '1') {
        // console.log(menuResponse)
        interface.question(menuOption1FollowUpQuestion, add);
        // interface.close() // only works with interface close in first if statement, i want it to work for both if and else
    }
    else if ( menuResponse !== '1'){
        console.log('Quitting.....')
    }
    // interface.close() // having this line of code turned on- makes code stuck after inputting anything after menu response
}

// loadTodos()
// displayTodos()
handleMenu()
interface.question(menu , handleMenu);
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//


//  make another function - add
//  will add the todo that the user types in
//  when user types in '1' run question method again  - interface.question()
//  this time asking a follow up question, when answered, node calls add function
//  follow-up question : okay, what todo do you want to add/remove/mark?
// interface.question()
// first parameter > a string asking what toDo does the user want to add to their toDo list> 
//  second parameter > add function

//   add function 
// after users types in their new ToDo
// add that text to the first element of a new array
// also concatenating 'uncomplete' as the second element
//   push this new array into toDosArray
//  run displayTodos
// run app and asnwer follow up question, check to see if it prints it


const menuOption1FollowUpQuestion = 'okay, what todo do you want to add? '
const add = function (addToDo){
    newArray = []
    newArray.unshift(addToDo)
    newArray[1] = 'uncomplete'
    toDosArray.push(newArray)
    saveTodos()
    displayTodos()
}
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//

// need a way to save updated array to our CSV file
// create function - call it saveTodos
// prepare mapping operation
// make a new empty array of comma-separated strings
//  So instead of each todo being ['take out the trash', 'uncomplete'],
//   it will be 'take out the trash,uncomplete' 
// loop through our 'toDosArray' 

//  for each to toDo in 'toDosArray', push a string
// in the format  'take out the trash,uncomplete'
// this creates our array of CSV rows
// .join() our array of CSV rows
//  console.log() our array of CSV rows
// expect a long CSV string

const saveTodos = function(){
    let commaSeparatedStrings = []
    for (const string of toDosArray){
    

        commaSeparatedStrings.push(string)
    }
    commaSeparatedStrings = commaSeparatedStrings.join()
    console.log(commaSeparatedStrings)
}

saveTodos()
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//


//  call fs method writeFileSync
// expects two arguments
// first, argument => the file path that we are writing to - toDos.csv
//  second argumetn => the new contents - the CSV string - commaSeparatedStrings
// DONE
//   CHECK
//  in 'add' function, after changing todos, call 'saveTodos'
//  it will look at the contents of my todo Array
// and write to the file based on that

// console.log(commaSeparatedStrings)
fs.writeFileSync( './toDos.csv', commaSeparatedStrings )
