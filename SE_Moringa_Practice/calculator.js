let calc_history = []           //history storage empty array

function addition(num1, num2) {
    return num1 + num2
}

function subtraction(num1, num2) {
    return num1 - num2
}

function multiplication(num1, num2) {
    return num1 * num2
}

function division(num1, num2) {
    if(num2 === 0) {
        return 'Cannot divide by zero'
    }
    return num1 / num2
}

function add_to_history(calculations){
    calc_history.push(calculations) 

    return calc_history
}

function display_calc_history() {
    if(calc_history.length === 0) {
        return 'No stored calculations'
    } else {
        return calc_history
    }
}

function calc(calculations) {           //main function

    return calculations.map(item => {           //gets each item from the array to be worked on by a function
        let result

        if(item.operator === '+') {
            result = addition(item.num1, item.num2)
        } else if(item.operator === '-') {
            result = subtraction(item.num1, item.num2)
        } else if(item.operator === '*') {
            result = multiplication(item.num1, item.num2)
        } else if(item.operator === '/') {
            result = division(item.num1, item.num2)
        }

        return `${item.num1} ${item.operator} ${item.num2} = ${result}`  //calculation objects
    })
}

let calculations = [                    //array of objects
    {num1: 2, num2: 2, operator: '+'},
    {num1: 2, num2: 2, operator: '-'},
    {num1: 2, num2: 2, operator: '*'},
    {num1: 2, num2: 2, operator: '/'}
] 

result = calc(calculations)

console.log(add_to_history(result))
console.log(display_calc_history())



