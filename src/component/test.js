import React, { Component } from 'react'
import { MultiSelect } from "react-selectize"

class Form extends Component {
    render(){
  let fruits = ["apple", "mango", "grapes", "melon", "strawberry", "cherry", "banana", "kiwi"]
  let options = fruits.map(function(fruit){
                return {label: fruit, value: fruit}
            });



        return (
            <div style = {{border: '1px solid black', height: 100, overflow: "auto", padding: 20}}>

                <div style = {{padding: 20}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </div>

                <MultiSelect tether = {true} options = {options} placeholder = "Select fruits"></MultiSelect>

                <div style = {{padding: 20}}>
                    Fusce aliquet dui tortor, imperdiet viverra augue pretium nec
                </div>

            </div>
        )
    }
}

export default Form